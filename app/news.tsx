import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Bell, ChevronRight, X, Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import NewsCard from '@/components/NewsCard';
import apiService from '@/services/api';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

interface NewsArticle {
  id: number;
  title: string;
  summary?: string;
  fullContent?: string;
  imageUrl?: string;
  publishedDate?: string;
  publishedTime?: string;
  location: string;
  expectedAttendees?: string;
  category: string;
  author: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  viewCount: number;
  status: string;
}

const categories = ['All', 'Local', 'National', 'International', 'Sports', 'Entertainment', 'Technology', 'Business', 'Health', 'Education', 'Environment'];

export default function NewsScreen() {
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (resetData = true) => {
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        page: resetData ? 1 : page,
        pageSize: 10,
      };
      
      if (selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      
      const response: ApiResponse<NewsArticle[]> = await apiService.getNews(params);
      
      if (response.success && response.data) {
        if (resetData) {
          setNewsData(response.data);
          setPage(1);
        } else {
          setNewsData(prev => [...prev, ...response.data!]);
        }
        setHasMore(response.data.length === 10);
      } else {
        setError(response.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setPage(prev => prev + 1);
    await fetchNews(false);
  };

  useEffect(() => {
    fetchNews(true);
  }, [selectedCategory]);

  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === 'All' || news.category === selectedCategory;
    return matchesCategory;
  });

  const handleNewsPress = async (newsId: number) => {
    try {
      const response: ApiResponse<NewsArticle> = await apiService.getNewsById(newsId);
      if (response.success && response.data) {
        setSelectedNews(response.data);
        setModalVisible(true);
      }
    } catch (err) {
      console.error('Failed to fetch news detail:', err);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedNews(null);
  };

  const handleRefresh = () => {
    fetchNews(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>News & Events</Text>
          <Text style={styles.headerSubtitle}>Stay updated with Laoag City</Text>
        </View>
      </View>
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
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

          {loading && page === 1 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#DC2626" />
              <Text style={styles.loadingText}>Loading news...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load news: {error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : filteredNews.length > 0 ? (
            <>
              {filteredNews.map((news) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  summary={news.summary || ''}
                  date={news.publishedDate || ''}
                  time={news.publishedTime || ''}
                  image={news.imageUrl ? apiService.getImageUrl(news.imageUrl) : ''}
                  onPress={() => handleNewsPress(news.id)}
                />
              ))}
              
              {loading && page > 1 && (
                <View style={styles.loadingMoreContainer}>
                  <ActivityIndicator size="small" color="#DC2626" />
                  <Text style={styles.loadingMoreText}>Loading more...</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No news found for this category</Text>
              <Text style={styles.emptyStateSubtext}>Try selecting a different category</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* News Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {selectedNews && (
              <>
                {selectedNews.imageUrl && (
                  <Image
                    source={{ uri: apiService.getImageUrl(selectedNews.imageUrl) }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                )}
                
                <View style={styles.modalTextContent}>
                  <Text style={styles.modalTitle}>{selectedNews.title}</Text>
                  
                  <View style={styles.modalMeta}>
                    <View style={styles.modalMetaItem}>
                      <Calendar size={16} color="#6B7280" />
                      <Text style={styles.modalMetaText}>{selectedNews.publishedDate}</Text>
                    </View>
                    <View style={styles.modalMetaItem}>
                      <Clock size={16} color="#6B7280" />
                      <Text style={styles.modalMetaText}>{selectedNews.publishedTime}</Text>
                    </View>
                    <View style={styles.modalMetaItem}>
                      <MapPin size={16} color="#6B7280" />
                      <Text style={styles.modalMetaText}>{selectedNews.location}</Text>
                    </View>
                    {selectedNews.expectedAttendees && (
                      <View style={styles.modalMetaItem}>
                        <Users size={16} color="#6B7280" />
                        <Text style={styles.modalMetaText}>{selectedNews.expectedAttendees}</Text>
                      </View>
                    )}
                  </View>
                  
                  {selectedNews.summary && (
                    <Text style={styles.modalSummary}>{selectedNews.summary}</Text>
                  )}
                  
                  {selectedNews.fullContent && (
                    <Text style={styles.modalBodyText}>{selectedNews.fullContent}</Text>
                  )}
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#DC2626',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FCA5A5',
    marginTop: 2,
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
  modalContent: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalTextContent: {
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
  modalSummary: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  modalBodyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 5,
  },
});