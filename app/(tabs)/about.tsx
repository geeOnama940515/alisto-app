import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { Heart, Users, Code, Mail, Github, Linkedin, MapPin, Phone, Newspaper, Calendar, LifeBuoy, Sun, Clock, LogOut, User } from 'lucide-react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

export default function AboutScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:g.amano.iii@example.com');
  };

  const handleGithubPress = () => {
    Linking.openURL('https://github.com/gamano-iii');
  };

  const handleLinkedinPress = () => {
    Linking.openURL('https://linkedin.com/in/g-amano-iii');
  };

  const handleCityHallPress = () => {
    Linking.openURL('tel:+63777701234');
  };

  const handleSignOut = async () => {
    try {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: async () => {
              console.log('Signing out user...');
              await signOut();
              console.log('Sign out successful, navigating to welcome...');
              // The useProtectedRoute hook in _layout.tsx will handle the navigation
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error during sign out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="About Alisto" subtitle="Connecting our community" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://i0.wp.com/laoagcity.gov.ph/wp-content/uploads/2020/10/cropped-rsz_lc_seal-4.png?fit=512%2C515&ssl=1' }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>Alisto</Text>
          <Text style={styles.tagline}>Your Digital Gateway to Laoag City</Text>
        </View>

        <View style={styles.storySection}>
          <View style={styles.sectionHeader}>
            <Heart size={24} color="#DC2626" />
            <Text style={styles.sectionTitle}>About Alisto App</Text>
          </View>
          <View style={styles.storyCard}>
            <Text style={styles.storyQuote}>
              "Alisto" is the <Text style={styles.highlight}>Ilocano and Filipino word</Text> for <Text style={styles.highlight}>alert, ready, and quick to act</Text> — the spirit behind this app.
            </Text>
            
            <Text style={styles.storyText}>
              Designed for the people of Laoag City, Alisto empowers every citizen to stay informed, take action, and access government services with ease. Whether you're reporting an issue, checking news, booking an appointment, or exploring local destinations — Alisto is your ready companion for daily civic life.
            </Text>
            
            <View style={styles.closingStatement}>
              <Text style={styles.closingText}>
                Be informed. Be empowered. Be <Text style={styles.highlight}>Alisto</Text>.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.historySection}>
          <View style={styles.sectionHeader}>
            <Sun size={24} color="#F59E0B" />
            <Text style={styles.sectionTitle}>A Glimpse into Laoag's History</Text>
          </View>
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View style={styles.historyIcon}>
                <Clock size={20} color="#F59E0B" />
              </View>
              <Text style={styles.historyTitle}>The Sunshine City</Text>
            </View>
            
            <Text style={styles.historyText}>
              Laoag City, known as the <Text style={styles.highlight}>"Sunshine City"</Text>, is the vibrant capital of Ilocos Norte. Its name comes from the Ilocano word <Text style={styles.highlight}>"lawag"</Text>, meaning light or brightness, reflecting both the sunny climate and the warmth of its people.
            </Text>
            
            <Text style={styles.historyText}>
              Founded in the <Text style={styles.highlight}>late 1500s</Text> during the Spanish colonial era, Laoag has grown from a small settlement into a progressive city rich in culture, heritage, and resilience. Today, it stands as a hub of tourism, governance, and innovation in Northern Luzon — proudly carrying the spirit of Ilocano pride and unity into the digital age.
            </Text>

            <View style={styles.heritageHighlight}>
              <Text style={styles.heritageText}>
                From historic settlement to digital innovation — Laoag continues to shine as the Queen City of the North
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What Alisto Offers</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#DBEAFE' }]}>
                <Newspaper size={20} color="#3B82F6" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Stay Informed</Text>
                <Text style={styles.featureDescription}>
                  Get the latest news, announcements, and updates from the city government
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#D1FAE5' }]}>
                <Calendar size={20} color="#10B981" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Access Services</Text>
                <Text style={styles.featureDescription}>
                  Book appointments and access city services from civil registry to business permits
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
                <LifeBuoy size={20} color="#F59E0B" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Report Issues</Text>
                <Text style={styles.featureDescription}>
                  Help improve our city by reporting problems and accessing emergency services
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#EDE9FE' }]}>
                <MapPin size={20} color="#8B5CF6" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Explore Laoag</Text>
                <Text style={styles.featureDescription}>
                  Discover tourist attractions and learn about government transparency initiatives
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.developerSection}>
          <View style={styles.sectionHeader}>
            <Code size={24} color="#6366F1" />
            <Text style={styles.sectionTitle}>Meet the Developer</Text>
          </View>
          <View style={styles.developerCard}>
            <View style={styles.developerAvatar}>
              <Text style={styles.developerInitials}>GA</Text>
            </View>
            <View style={styles.developerInfo}>
              <Text style={styles.developerName}>G. Amano III</Text>
              <Text style={styles.developerTitle}>Full-Stack Developer</Text>
              <Text style={styles.developerBio}>
                Passionate about creating digital solutions that bridge the gap between government 
                and citizens. With a focus on user experience and community impact, I believe 
                technology should serve to strengthen our local connections and make civic 
                engagement more accessible to everyone.
              </Text>
              <View style={styles.developerLinks}>
                <TouchableOpacity style={styles.linkButton} onPress={handleEmailPress}>
                  <Mail size={16} color="#6B7280" />
                  <Text style={styles.linkText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton} onPress={handleGithubPress}>
                  <Github size={16} color="#6B7280" />
                  <Text style={styles.linkText}>GitHub</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton} onPress={handleLinkedinPress}>
                  <Linkedin size={16} color="#6B7280" />
                  <Text style={styles.linkText}>LinkedIn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.visionSection}>
          <Text style={styles.visionTitle}>Our Vision</Text>
          <Text style={styles.visionText}>
            To create a digitally empowered Laoag City where every citizen has easy access to 
            government services, timely information, and opportunities to actively participate 
            in community development. Through Alisto, we envision a more connected, transparent, 
            and responsive local government that truly serves its people.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <View style={styles.contactInfo}>
            <TouchableOpacity style={styles.contactItem} onPress={handleCityHallPress}>
              <Phone size={20} color="#D97706" />
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Laoag City Hall</Text>
                <Text style={styles.contactDetails}>(077) 770-1234</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.contactItem}>
              <MapPin size={20} color="#D97706" />
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Address</Text>
                <Text style={styles.contactDetails}>
                  General Second Avenue, Laoag City{'\n'}Ilocos Norte 2900, Philippines
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Profile Section */}
        {user && (
          <View style={styles.userSection}>
            <View style={styles.sectionHeader}>
              <User size={24} color="#DC2626" />
              <Text style={styles.sectionTitle}>Your Account</Text>
            </View>
            <View style={styles.userCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.userEmail}>{user.primaryEmailAddress?.emailAddress}</Text>
                <Text style={styles.userJoined}>
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <LogOut size={20} color="#FFFFFF" />
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.footerSection}>
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>Made with </Text>
            <Heart size={16} color="#DC2626" />
            <Text style={styles.footerText}> for the people of Laoag City</Text>
          </View>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heroSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  storySection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyQuote: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 20,
    lineHeight: 26,
  },
  highlight: {
    color: '#D97706',
    fontFamily: 'Inter-Bold',
  },
  storyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 18,
  },
  closingStatement: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
  },
  closingText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  historySection: {
    marginBottom: 32,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#92400E',
  },
  historyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  heritageHighlight: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  heritageText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  developerSection: {
    marginBottom: 32,
  },
  developerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  developerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  developerInitials: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  developerInfo: {
    flex: 1,
  },
  developerName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  developerTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6366F1',
    marginBottom: 8,
  },
  developerBio: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  developerLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  visionSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  visionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  visionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E3A8A',
    lineHeight: 22,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contactContent: {
    marginLeft: 16,
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  userSection: {
    marginBottom: 32,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  userJoined: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  signOutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
});