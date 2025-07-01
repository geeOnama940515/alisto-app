import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { useState } from 'react';
import { Bell, ChevronRight, X, Calendar, Clock, MapPin, Users, Newspaper, LifeBuoy, Building, Phone, TriangleAlert as AlertTriangle, Camera } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';

const newsData = [
  {
    id: 1,
    title: 'Laoag City Celebrates Longganisa Festival 2024',
    summary: 'The annual Longganisa Festival showcases the best of Laoag\'s culinary heritage with street dancing, food contests, and cultural performances.',
    date: 'Jan 15, 2024',
    time: '9:00 AM',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'The Longganisa Festival returns to Laoag City with a spectacular celebration of our local culinary heritage. This year\'s festival features traditional street dancing competitions, cooking contests showcasing the best longganisa recipes, and cultural performances by local artists.\n\nThe festival will be held at the Laoag City Plaza and surrounding streets, with food stalls, live music, and family-friendly activities. Local restaurants and vendors will offer special longganisa dishes and traditional Ilocano delicacies.\n\nMayor Michael Keon encourages all residents and visitors to join this celebration of our rich cultural heritage and support our local food industry.',
    location: 'Laoag City Plaza',
    attendees: '5,000+ expected',
    category: 'Festival',
  },
  {
    id: 2,
    title: 'New Public Market Opens in Barangay San Lorenzo',
    summary: 'Mayor Michael Keon inaugurated the new public market facility that will serve over 5,000 residents in the area.',
    date: 'Jan 12, 2024',
    time: '2:30 PM',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'A new state-of-the-art public market has officially opened in Barangay San Lorenzo, providing modern facilities for vendors and improved shopping experience for residents.\n\nThe ₱8.5 million facility features 120 vendor stalls, modern drainage systems, adequate parking space, and improved security measures. The market is designed to accommodate wet and dry goods vendors, with separate sections for meat, fish, vegetables, and general merchandise.\n\nThis development is part of the city\'s ongoing infrastructure improvement program aimed at enhancing the quality of life for residents and supporting local businesses.',
    location: 'Barangay San Lorenzo',
    attendees: '200+ vendors',
    category: 'Infrastructure',
  },
  {
    id: 3,
    title: 'Free Medical Mission for Senior Citizens',
    summary: 'The City Health Office announces a free medical mission specifically for senior citizens aged 60 and above.',
    date: 'Jan 8, 2024',
    time: '8:00 AM',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'The Laoag City Health Office, in partnership with local medical professionals, will conduct a comprehensive free medical mission for senior citizens.\n\nServices include general check-ups, blood pressure monitoring, diabetes screening, eye examinations, and free medications for common ailments. The mission also features health education sessions on nutrition, exercise, and preventive care for seniors.\n\nSenior citizens are encouraged to bring their senior citizen IDs and any existing medical records. The event is part of the city\'s commitment to providing accessible healthcare for all residents.',
    location: 'City Health Office',
    attendees: '300+ seniors expected',
    category: 'Health',
  },
];

const quickAccessItems = [
  {
    id: 'news',
    title: 'News & Events',
    description: 'Latest updates and announcements',
    icon: Newspaper,
    color: '#3B82F6',
    backgroundColor: '#DBEAFE',
    route: '/news',
  },
  {
    id: 'services',
    title: 'City Services',
    description: 'Book appointments and access services',
    icon: Building,
    color: '#10B981',
    backgroundColor: '#D1FAE5',
    route: '/services',
  },
  {
    id: 'assistance',
    title: 'Get Assistance',
    description: 'Emergency hotlines and report issues',
    icon: LifeBuoy,
    color: '#F59E0B',
    backgroundColor: '#FEF3C7',
    route: '/assistance',
  },
  {
    id: 'emergency',
    title: 'Emergency',
    description: 'Call 911 for immediate help',
    icon: AlertTriangle,
    color: '#EF4444',
    backgroundColor: '#FEE2E2',
    action: 'emergency',
  },
];

const upcomingEvents = [
  {
    id: 6,
    title: 'City Council Public Hearing',
    date: 'Jan 20, 2024',
    time: '3:00 PM',
    location: 'City Hall Session Hall',
  },
  {
    id: 7,
    title: 'Environmental Clean-up Drive',
    date: 'Jan 22, 2024',
    time: '6:00 AM',
    location: 'Laoag River',
  },
  {
    id: 8,
    title: 'Business Permit Renewal Deadline',
    date: 'Jan 31, 2024',
    time: 'All Day',
    location: 'Business Permits Office',
  },
];

export default function HomeScreen() {
  const [selectedNews, setSelectedNews] = useState<typeof newsData[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNewsPress = (newsId: number) => {
    const news = newsData.find(item => item.id === newsId);
    if (news) {
      setSelectedNews(news);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedNews(null);
  };

  const handleQuickAccessPress = (item: typeof quickAccessItems[0]) => {
    if (item.action === 'emergency') {
      // Handle emergency call
      console.log('Emergency call initiated');
      return;
    }
    
    if (item.route) {
      router.push(item.route as any);
    }
  };

  const handleEventPress = (eventId: number) => {
    console.log('Event pressed:', eventId);
  };

  return (
    <View style={styles.container}>
      <Header title="Alisto" subtitle="Your Digital Gateway to Laoag City" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Laoag City</Text>
          <Text style={styles.welcomeText}>
            Stay connected with your community through Alisto. Access city services, stay updated 
            with the latest news, and explore what our beautiful city has to offer.
          </Text>
        </View>

        <View style={styles.announcementBanner}>
          <Bell size={20} color="#DC2626" />
          <Text style={styles.announcementText}>
            City Hall offices will be closed on January 20 for the Longganisa Festival
          </Text>
        </View>

        {/* Quick Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.quickAccessCard}
                  onPress={() => handleQuickAccessPress(item)}
                >
                  <View style={[styles.quickAccessIcon, { backgroundColor: item.backgroundColor }]}>
                    <IconComponent size={24} color={item.color} />
                  </View>
                  <Text style={styles.quickAccessTitle}>{item.title}</Text>
                  <Text style={styles.quickAccessDescription}>{item.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Latest News Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity 
              style={styles.seeAllButton} 
              onPress={() => router.push('/news')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color="#DC2626" />
            </TouchableOpacity>
          </View>

          {newsData.slice(0, 2).map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              summary={news.summary}
              date={news.date}
              time={news.time}
              image={news.image}
              onPress={() => handleNewsPress(news.id)}
            />
          ))}
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.slice(0, 2).map((event) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.eventCard}
              onPress={() => handleEventPress(event.id)}
            >
              <View style={styles.eventDate}>
                <Text style={styles.eventDateText}>{event.date.split(',')[0]}</Text>
                <Text style={styles.eventTimeText}>{event.time}</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventLocation}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.eventLocationText}>{event.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={styles.viewMoreEvents}
            onPress={() => router.push('/news')}
          >
            <Text style={styles.viewMoreText}>View All Events</Text>
            <ChevronRight size={16} color="#DC2626" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <Text style={styles.sectionTitle}>City at a Glance</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Active Projects</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1,247</Text>
              <Text style={styles.statLabel}>Reports Resolved</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Service Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Emergency Response</Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencySection}>
          <View style={styles.emergencyHeader}>
            <AlertTriangle size={20} color="#DC2626" />
            <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          </View>
          <Text style={styles.emergencyText}>
            For life-threatening emergencies, call 911 immediately
          </Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>Call 911</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* News Detail Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        {selectedNews && (
          <SafeAreaView style={styles.modalContainer} edges={['top', 'bottom']}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <X size={24} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.modalCategory}>{selectedNews.category}</Text>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Image source={{ uri: selectedNews.image }} style={styles.modalImage} />
              
              <View style={styles.modalBody}>
                <Text style={styles.modalTitle}>{selectedNews.title}</Text>
                
                <View style={styles.modalMeta}>
                  <View style={styles.modalMetaItem}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.modalMetaText}>{selectedNews.date}</Text>
                  </View>
                  <View style={styles.modalMetaItem}>
                    <Clock size={16} color="#6B7280" />
                    <Text style={styles.modalMetaText}>{selectedNews.time}</Text>
                  </View>
                </View>

                <View style={styles.modalInfo}>
                  <View style={styles.modalInfoItem}>
                    <MapPin size={16} color="#DC2626" />
                    <Text style={styles.modalInfoText}>{selectedNews.location}</Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Users size={16} color="#DC2626" />
                    <Text style={styles.modalInfoText}>{selectedNews.attendees}</Text>
                  </View>
                </View>

                <Text style={styles.modalText}>{selectedNews.fullContent}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
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
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  announcementBanner: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  announcementText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#991B1B',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
    marginRight: 4,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAccessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAccessIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickAccessDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  eventDate: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 16,
    minWidth: 80,
  },
  eventDateText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#991B1B',
  },
  eventTimeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
    marginTop: 2,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  viewMoreEvents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  viewMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
    marginRight: 4,
  },
  quickStats: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  emergencySection: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#991B1B',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  emergencyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 8,
  },
  modalCategory: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalContent: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalBody: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
    lineHeight: 32,
  },
  modalMeta: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 20,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalMetaText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  modalInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginLeft: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
});