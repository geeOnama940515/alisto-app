import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { useState } from 'react';
import { Bell, ChevronRight, X, Calendar, Clock, MapPin, Users } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    title: 'Road Improvement Project Completed',
    summary: 'The 2.5-kilometer road improvement project along Rizal Street has been completed, improving traffic flow in the city center.',
    date: 'Jan 10, 2024',
    time: '11:15 AM',
    image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'The major road improvement project along Rizal Street has been successfully completed, marking a significant milestone in the city\'s infrastructure development.\n\nThe project included complete road resurfacing, installation of new drainage systems, improved street lighting, and the addition of designated bike lanes. The 2.5-kilometer stretch now features wider lanes and better traffic management systems.\n\nThe improved road is expected to reduce travel time by 30% and enhance safety for both motorists and pedestrians. The project was completed on schedule and within budget, demonstrating the city\'s commitment to efficient public works management.',
    location: 'Rizal Street',
    attendees: 'City-wide impact',
    category: 'Infrastructure',
  },
  {
    id: 4,
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
  {
    id: 5,
    title: 'Youth Skills Training Program Launch',
    summary: 'A new skills training program for out-of-school youth will begin next week, offering courses in digital literacy and entrepreneurship.',
    date: 'Jan 5, 2024',
    time: '1:00 PM',
    image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'The city government launches an innovative skills training program designed to empower out-of-school youth with practical skills for the modern economy.\n\nThe program offers courses in digital literacy, basic computer skills, social media marketing, and entrepreneurship fundamentals. Participants will also receive mentorship from successful local business owners and access to microfinance opportunities.\n\nThe 6-week program is completely free and includes certificates upon completion. Priority will be given to youth from low-income families, with the goal of reducing unemployment and promoting economic empowerment.',
    location: 'City Training Center',
    attendees: '50 participants',
    category: 'Education',
  },
  {
    id: 6,
    title: 'Environmental Clean-up Drive Success',
    summary: 'Over 500 volunteers participated in the city-wide environmental clean-up drive, collecting 2 tons of waste.',
    date: 'Jan 3, 2024',
    time: '6:00 AM',
    image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'The monthly environmental clean-up drive exceeded expectations with overwhelming community participation and remarkable results.\n\nVolunteers from various barangays, schools, and organizations worked together to clean major waterways, parks, and public spaces throughout the city. The initiative collected over 2 tons of waste, including plastic bottles, food packaging, and other recyclable materials.\n\nThe city government provided transportation, cleaning equipment, and refreshments for all participants. Special recognition was given to Barangay Nangalisan for having the highest volunteer turnout.',
    location: 'City-wide',
    attendees: '500+ volunteers',
    category: 'Environment',
  },
  {
    id: 7,
    title: 'Digital Government Services Portal Launch',
    summary: 'Citizens can now access government services online through the new digital portal, reducing processing time by 60%.',
    date: 'Dec 28, 2023',
    time: '10:00 AM',
    image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'Laoag City takes a major step towards digital transformation with the launch of its comprehensive online government services portal.\n\nThe platform allows citizens to apply for various documents, pay taxes, schedule appointments, and track application status from the comfort of their homes. Initial services include business permit applications, civil registry requests, and tax payments.\n\nThe system has already processed over 200 applications in its first week, with an average processing time reduction of 60%. The portal is accessible 24/7 and includes multilingual support for better accessibility.',
    location: 'Online Platform',
    attendees: 'All citizens',
    category: 'Technology',
  },
  {
    id: 8,
    title: 'Scholarship Program for Indigenous Students',
    summary: 'The city announces a special scholarship program for indigenous students, covering full tuition and living allowances.',
    date: 'Dec 25, 2023',
    time: '3:00 PM',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullContent: 'In recognition of the important role of indigenous communities in Laoag\'s cultural heritage, the city government launches a comprehensive scholarship program.\n\nThe program provides full tuition coverage, monthly living allowances, and academic support for indigenous students pursuing higher education. Priority is given to students from remote barangays with limited access to educational opportunities.\n\nApplications are now open for the 2024 academic year, with 50 scholarships available. The program also includes mentorship opportunities and cultural preservation initiatives to help students maintain their connection to their heritage.',
    location: 'City Scholarship Office',
    attendees: '50 scholarships available',
    category: 'Education',
  },
];

const categories = ['All', 'Festival', 'Infrastructure', 'Health', 'Education', 'Environment', 'Technology'];

export default function NewsScreen() {
  const [selectedNews, setSelectedNews] = useState<typeof newsData[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  return (
    <View style={styles.container}>
      <Header title="News & Events" subtitle="Stay updated with the latest from Laoag City" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.announcementBanner}>
          <Bell size={20} color="#DC2626" />
          <Text style={styles.announcementText}>
            Breaking: New digital services portal now live - Apply for permits online!
          </Text>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.newsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'Latest News' : `${selectedCategory} News`}
            </Text>
            <Text style={styles.newsCount}>{filteredNews.length} articles</Text>
          </View>

          {filteredNews.map((news) => (
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

          {filteredNews.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No news found for this category</Text>
              <Text style={styles.emptyStateSubtext}>Try selecting a different category</Text>
            </View>
          )}
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
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  newsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newsCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
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