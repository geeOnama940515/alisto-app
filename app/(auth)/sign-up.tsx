import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react-native';
import { TextInput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const router = useRouter();
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError('');

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.errors?.[0]?.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError('');

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        console.log('Sign up verification successful, navigating to tabs...');
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.errors?.[0]?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Starting Google OAuth flow...');

      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      console.log('OAuth flow result:', { createdSessionId, signIn, signUp });

      if (createdSessionId) {
        console.log('Setting active session:', createdSessionId);
        await setActive!({ session: createdSessionId });
        console.log('Google sign up successful, navigating to tabs...');
        router.replace('/(tabs)');
      } else if (signUp && signUp.status === 'missing_requirements') {
        console.log('SignUp missing requirements:', signUp.missingFields);
        
        // Handle missing username requirement
        if (signUp.missingFields.includes('username')) {
          // Generate a username from the email
          const emailPrefix = signUp.emailAddress?.split('@')[0] || 'user';
          const randomSuffix = Math.floor(Math.random() * 10000);
          const generatedUsername = `${emailPrefix}${randomSuffix}`;
          
          console.log('Updating signup with username:', generatedUsername);
          
          try {
            const updatedSignUp = await signUp.update({
              username: generatedUsername,
            });
            
            console.log('Updated signup status:', updatedSignUp.status);
            
            if (updatedSignUp.status === 'complete') {
              await setActive!({ session: updatedSignUp.createdSessionId });
              console.log('Google sign up completed, navigating to tabs...');
              router.replace('/(tabs)');
            } else if (updatedSignUp.createdSessionId) {
              await setActive!({ session: updatedSignUp.createdSessionId });
              console.log('Google sign up session created, navigating to tabs...');
              router.replace('/(tabs)');
            }
          } catch (updateError: any) {
            console.error('Error updating signup:', updateError);
            setError('Failed to complete Google sign-up. Please try again.');
          }
        }
      } else if (signIn && signIn.status === 'needs_identifier') {
        console.log('SignIn needs identifier, redirecting to sign in');
        setError('Account already exists. Please use the sign in page.');
      } else {
        console.log('No session created from OAuth flow');
        setError('Google sign-up was cancelled or failed');
      }
    } catch (err: any) {
      console.error('Google sign up error:', err);
      setError(err.errors?.[0]?.message || 'Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.verificationContainer}>
          <Image 
            source={require('@/assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to {emailAddress}
          </Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Verification Code</Text>
            <TextInput
              style={styles.codeInput}
              placeholder="Enter 6-digit code"
              placeholderTextColor="#9CA3AF"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              textAlign="center"
            />
          </View>

          <TouchableOpacity 
            style={[styles.verifyButton, loading && styles.verifyButtonDisabled]}
            onPress={onPressVerify}
            disabled={loading || code.length !== 6}
          >
            <Text style={styles.verifyButtonText}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resendButton}
            onPress={() => signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })}
          >
            <Text style={styles.resendButtonText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Link href="/(auth)/welcome" asChild>
            <TouchableOpacity style={styles.backButton}>
              <ArrowLeft size={24} color="#DC2626" />
            </TouchableOpacity>
          </Link>
          
          <Image 
            source={require('@/assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the Alisto community</Text>
        </View>

        <View style={styles.form}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Google Sign-Up Button */}
          <TouchableOpacity 
            style={[styles.googleButton, loading && styles.googleButtonDisabled]}
            onPress={onGoogleSignUp}
            disabled={loading}
          >
            <Image 
              source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>
              {loading ? 'Signing up with Google...' : 'Continue with Google'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or create account with email</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>First Name</Text>
              <View style={styles.inputContainer}>
                <User size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="First name"
                  placeholderTextColor="#9CA3AF"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <View style={styles.inputContainer}>
                <User size={20} color="#6B7280" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Last name"
                  placeholderTextColor="#9CA3AF"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="09XX XXX XXXX"
                placeholderTextColor="#9CA3AF"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
            onPress={onSignUpPress}
            disabled={loading || !emailAddress || !password || !firstName || !lastName}
          >
            <Text style={styles.signUpButtonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Already have an account?</Text>
            <View style={styles.dividerLine} />
          </View>

          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 20,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#991B1B',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  bottomDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  eyeButton: {
    padding: 4,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  signUpButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  signUpButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  signUpButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  signInButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
  verificationContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 20,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    letterSpacing: 8,
  },
  verifyButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  verifyButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  verifyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  resendButton: {
    marginTop: 16,
    paddingVertical: 12,
  },
  resendButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
    textDecorationLine: 'underline',
  },
});