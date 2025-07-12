import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { MapPin, Star, Clock, DollarSign, Navigation, Camera, Heart, Share, Eye, TrendingUp, Building, Users } from 'lucide-react-native';
import Header from '@/components/Header';
import apiService, { ApiResponse } from '@/services/api';

// Tourist Spot interface
interface TouristSpot {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  location: string;
  coordinates?: string;
  address: string;
  openingHours?: string;
  entryFee?: string;
  highlights: string[];
  travelTime?: string;
  isActive: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

const publicProjects = [
  {
    id: 1,
    title: 'Laoag River Beautification Project',
    description: 'Comprehensive river cleanup and beautification including walkways, lighting, and landscaping.',
    cost: 25000000,
    contractor: 'Ilocos Construction Corp.',
    status: 'Ongoing',
    progress: 75,
    startDate: '2023-06-01',
    expectedEndDate: '2024-03-31',
    location: 'Laoag River',
    projectType: 'Environmental',
    fundingSource: 'City Budget',
  },
  {
    id: 2,
    title: 'Digital City Hall Modernization',
    description: 'Upgrading city hall facilities with modern technology and digital services infrastructure.',
    cost: 15000000,
    contractor: 'TechBuild Solutions',
    status: 'Completed',
    progress: 100,
    startDate: '2023-01-15',
    expectedEndDate: '2023-12-15',
    actualEndDate: '2023-12-10',
    location: 'City Hall Complex',
    projectType: 'Technology',
    fundingSource: 'National Government',
  },
  {
    id: 3,
    title: 'Public Market Renovation Phase 2',
    description: 'Second phase of public market renovation including vendor stalls and parking facilities.',
    cost: 18000000,
    contractor: 'Northern Builders Inc.',
    status: 'Planned',
    progress: 0,
    startDate: '2024-04-01',
    expectedEndDate: '2024-12-31',
    location: 'Central Public Market',
    projectType: 'Infrastructure',
    fundingSource: 'Provincial Budget',
  },
  {
    id: 4,
    title: 'Street Lighting Enhancement Program',
    description: 'Installation of LED street lights throughout the city for improved safety and energy efficiency.',
    cost: 12000000,
    contractor: 'Bright City Solutions',
    status: 'Ongoing',
    progress: 45,
    startDate: '2023-09-01',
    expectedEndDate: '2024-06-30',
    location: 'City-wide',
    projectType: 'Infrastructure',
    fundingSource: 'City Budget',
  },
];

export default function ExploreScreen() {
  const [selectedTab, setSelectedTab] = useState<'tourism' | 'transparency'>('tourism');
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTouristSpots = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse<TouristSpot[]> = await apiService.getTouristSpots({
        page: 1,
        pageSize: 20,
        isActive: true
      });
      
      if (response.success && response.data) {
        setTouristSpots(response.data);
      } else {
        setError(response.message || 'Failed to fetch tourist spots');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTouristSpots();
  }, []);

  const handleSpotPress = (spotId: number) => {
    setSelectedSpot(selectedSpot === spotId ? null : spotId);
  };

  const handleGetDirections = (coordinates: string, name: string) => {
    if (!coordinates) return;
    
    // Parse coordinates - handle different formats
    let lat, lng;
    if (coordinates.includes(',')) {
      [lat, lng] = coordinates.split(',').map(coord => coord.replace(/[°NSEW\s]/g, ''));
    } else {
      // Handle other coordinate formats if needed
      lat = coordinates;
      lng = coordinates;
    }
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    Linking.openURL(url);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return '#10B981';
      case 'ongoing': return '#F59E0B';
      case 'planned': return '#6366F1';
      case 'suspended': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Explore Laoag" subtitle="Discover attractions and track city projects" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'tourism' && styles.activeTab]}
          onPress={() => setSelectedTab('tourism')}
        >
          <Camera size={20} color={selectedTab === 'tourism' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.tabText, selectedTab === 'tourism' && styles.activeTabText]}>
            Tourist Spots
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'transparency' && styles.activeTab]}
          onPress={() => setSelectedTab('transparency')}
        >
          <Building size={20} color={selectedTab === 'transparency' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.tabText, selectedTab === 'transparency' && styles.activeTabText]}>
            Transparency
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'tourism' ? (
          <View style={styles.tourismSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Tourist Spots</Text>
              <Text style={styles.sectionSubtitle}>Discover the beauty of Laoag City</Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#DC2626" />
                <Text style={styles.loadingText}>Loading tourist spots...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load tourist spots: {error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchTouristSpots}>
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : touristSpots.length > 0 ? (
              touristSpots.map((spot) => (
                <View key={spot.id} style={styles.spotCard}>
                  <Image
                    source={{ uri: apiService.getImageUrl(spot.imageUrl) }}
                    style={styles.spotImage}
                    resizeMode="cover"
                  />
                  
                  <View style={styles.spotContent}>
                    <View style={styles.spotHeader}>
                      <Text style={styles.spotName}>{spot.name}</Text>
                      <View style={styles.ratingContainer}>
                        <Star size={16} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.ratingText}>{spot.rating}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.spotDescription}>{spot.description}</Text>
                    
                    <View style={styles.spotMeta}>
                      <View style={styles.metaItem}>
                        <MapPin size={14} color="#6B7280" />
                        <Text style={styles.metaText}>{spot.location}</Text>
                      </View>
                      
                      {spot.openingHours && (
                        <View style={styles.metaItem}>
                          <Clock size={14} color="#6B7280" />
                          <Text style={styles.metaText}>{spot.openingHours}</Text>
                        </View>
                      )}
                      
                      {spot.entryFee && (
                        <View style={styles.metaItem}>
                          <DollarSign size={14} color="#6B7280" />
                          <Text style={styles.metaText}>{spot.entryFee}</Text>
                        </View>
                      )}
                    </View>

                    {selectedSpot === spot.id && (
                      <View style={styles.expandedContent}>
                        <View style={styles.highlightsSection}>
                          <Text style={styles.highlightsTitle}>Highlights</Text>
                          <View style={styles.highlightsList}>
                            {spot.highlights.map((highlight, index) => (
                              <View key={index} style={styles.highlightItem}>
                                <Text style={styles.highlightText}>• {highlight}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                        
                        {spot.travelTime && (
                          <View style={styles.travelInfo}>
                            <Text style={styles.travelText}>{spot.travelTime}</Text>
                          </View>
                        )}
                        
                        <View style={styles.actionButtons}>
                          {spot.coordinates && (
                            <TouchableOpacity
                              style={styles.actionButton}
                              onPress={() => handleGetDirections(spot.coordinates!, spot.name)}
                            >
                              <Navigation size={16} color="#FFFFFF" />
                              <Text style={styles.actionButtonText}>Get Directions</Text>
                            </TouchableOpacity>
                          )}
                          
                          <TouchableOpacity style={styles.actionButton}>
                            <Share size={16} color="#FFFFFF" />
                            <Text style={styles.actionButtonText}>Share</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    
                    <TouchableOpacity
                      style={styles.expandButton}
                      onPress={() => handleSpotPress(spot.id)}
                    >
                      <Text style={styles.expandButtonText}>
                        {selectedSpot === spot.id ? 'Show Less' : 'Show More'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tourist spots available</Text>
                <Text style={styles.emptySubtext}>Check back later for updates</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.transparencySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Public Projects</Text>
              <Text style={styles.sectionSubtitle}>Track government projects and spending</Text>
            </View>

            {publicProjects.map((project) => (
              <View key={project.id} style={styles.projectCard}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                    <Text style={styles.statusText}>{project.status}</Text>
                  </View>
                </View>
                
                <Text style={styles.projectDescription}>{project.description}</Text>
                
                <View style={styles.projectMeta}>
                  <View style={styles.metaItem}>
                    <DollarSign size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{formatCurrency(project.cost)}</Text>
                  </View>
                  
                  <View style={styles.metaItem}>
                    <Building size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{project.contractor}</Text>
                  </View>
                  
                  <View style={styles.metaItem}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{project.location}</Text>
                  </View>
                </View>
                
                {project.progress !== undefined && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressText}>Progress</Text>
                      <Text style={styles.progressPercentage}>{project.progress}%</Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${project.progress}%`, backgroundColor: getStatusColor(project.status) }
                        ]} 
                      />
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#DC2626',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tourismSection: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  spotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  spotImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  spotContent: {
    padding: 16,
  },
  spotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spotName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
    marginLeft: 4,
  },
  spotDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  spotMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  expandedContent: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 12,
  },
  highlightsSection: {
    marginBottom: 16,
  },
  highlightsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  highlightsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  highlightItem: {
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  highlightText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1E40AF',
  },
  travelInfo: {
    marginTop: 12,
    marginBottom: 16,
  },
  travelText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  expandButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
  expandButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#DC2626',
    textDecorationLine: 'underline',
  },
  transparencySection: {
    flex: 1,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  projectDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  projectMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});