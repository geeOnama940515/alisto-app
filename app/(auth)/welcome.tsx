import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, MapPin, Users, Calendar, Heart } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['#DC2626', '#B91C1C', '#991B1B']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://i0.wp.com/laoagcity.gov.ph/wp-content/uploads/2020/10/cropped-rsz_lc_seal-4.png?fit=512%2C515&ssl=1' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Alisto</Text>
            <Text style={styles.subtitle}>Your Digital Gateway to Laoag City</Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Calendar size={24} color="#DC2626" />
              </View>
              <Text style={styles.featureText}>Book city services</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <MapPin size={24} color="#DC2626" />
              </View>
              <Text style={styles.featureText}>Report city issues</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Users size={24} color="#DC2626" />
              </View>
              <Text style={styles.featureText}>Stay informed</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Heart size={24} color="#DC2626" />
              </View>
              <Text style={styles.featureText}>Explore Laoag</Text>
            </View>
          </View>

          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Connect with your city government, access services, and stay updated with the latest news and events in Laoag City.
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <ArrowRight size={20} color="#FFFFFF" style={styles.buttonIcon} />
              </TouchableOpacity>
            </Link>

            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>I already have an account</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Made with ❤️ for the people of Laoag City
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#FCA5A5',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: height * 0.04,
  },
  feature: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  description: {
    marginBottom: height * 0.04,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FCA5A5',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    marginBottom: height * 0.02,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FCA5A5',
    textAlign: 'center',
  },
});