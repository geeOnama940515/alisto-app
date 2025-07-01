import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { useState } from 'react';
import { MapPin, Star, Clock, DollarSign, Navigation, Camera, Heart, Share, Eye, TrendingUp, Building, Users } from 'lucide-react-native';
import Header from '@/components/Header';

const touristSpots = [
  {
    id: 1,
    name: 'Sinking Bell Tower',
    description: 'Historic bell tower that appears to be sinking into the ground due to earthquakes and soil conditions.',
    image: 'https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    location: 'Laoag City Center',
    coordinates: '18.1967° N, 120.5929° E',
    address: 'General Luna Street, Laoag City',
    openingHours: '6:00 AM - 6:00 PM',
    entryFee: 'Free',
    highlights: ['Historic Architecture', 'Photography Spot', 'Cultural Heritage'],
    travelTime: '5 minutes from City Hall',
    viewCount: 1250,
  },
  {
    id: 2,
    name: 'Laoag Cathedral',
    description: 'Beautiful baroque-style cathedral built during the Spanish colonial period, featuring stunning architecture.',
    image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    location: 'Laoag City Center',
    coordinates: '18.1967° N, 120.5929° E',
    address: 'Cathedral Square, Laoag City',
    openingHours: '5:00 AM - 7:00 PM',
    entryFee: 'Free',
    highlights: ['Religious Site', 'Spanish Architecture', 'Wedding Venue'],
    travelTime: '3 minutes from City Hall',
    viewCount: 980,
  },
  {
    id: 3,
    name: 'Tobacco Monopoly Monument',
    description: 'Monument commemorating the tobacco industry that shaped the economic history of Ilocos Norte.',
    image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    location: 'Aurora Park',
    coordinates: '18.1975° N, 120.5935° E',
    address: 'Aurora Park, Laoag City',
    openingHours: '24 hours',
    entryFee: 'Free',
    highlights: ['Historical Monument', 'Night Lighting', 'Cultural Education'],
    travelTime: '10 minutes from City Hall',
    viewCount: 750,
  },
  {
    id: 4,
    name: 'Laoag River',
    description: 'Scenic river perfect for boat rides and enjoying the natural beauty of the area.',
    image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    location: 'Laoag River',
    coordinates: '18.1950° N, 120.5900° E',
    address: 'Laoag River, Laoag City',
    openingHours: '6:00 AM - 6:00 PM',
    entryFee: 'Boat rides: ₱50-100',
    highlights: ['Boat Rides', 'Nature Photography', 'Sunset Views'],
    travelTime: '15 minutes from City Hall',
    viewCount: 650,
  },
  {
    id: 5,
    name: 'Museo Ilocos Norte',
    description: 'Museum showcasing the rich history, culture, and heritage of Ilocos Norte province.',
    image: 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.4,
    location: 'Capitol Complex',
    coordinates: '18.2000° N, 120.5950° E',
    address: 'Capitol Complex, Laoag City',
    openingHours: '8:00 AM - 5:00 PM (Closed Sundays)',
    entryFee: '₱30 (Adults), ₱15 (Students)',
    highlights: ['Cultural Artifacts', 'Historical Exhibits', 'Educational Tours'],
    travelTime: '20 minutes from City Hall',
    viewCount: 520,
  },
  {
    id: 6,
    name: 'Laoag City Plaza',
    description: 'Central plaza perfect for relaxation, events, and experiencing local community life.',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    location: 'City Center',
    coordinates: '18.1965° N, 120.5925° E',
    address: 'City Plaza, Laoag City',
    openingHours: '24 hours',
    entryFee: 'Free',
    highlights: ['Community Events', 'Food Vendors', 'People Watching'],
    travelTime: '2 minutes from City Hall',
    viewCount: 890,
  },
];

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

  const handleSpotPress = (spotId: number) => {
    setSelectedSpot(selectedSpot === spotId ? null : spotId);
  };

  const handleGetDirections = (coordinates: string, name: string) => {
    const [lat, lng] = coordinates.split(', ').map(coord => coord.replace(/[°NSEW\s]/g, ''));
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
            Tourism
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
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Discover Laoag City</Text>
              <Text style={styles.welcomeText}>
                Explore the rich history, culture, and natural beauty of the Sunshine City. 
                From historic landmarks to scenic spots, there's something for everyone.
              </Text>
            </View>

            <View style={styles.statsSection}>
              <View style={styles.statCard}>
                <Eye size={20} color="#3B82F6" />
                <Text style={styles.statNumber}>6</Text>
                <Text style={styles.statLabel}>Tourist Spots</Text>
              </View>
              <View style={styles.statCard}>
                <Star size={20} color="#F59E0B" />
                <Text style={styles.statNumber}>4.4</Text>
                <Text style={styles.statLabel}>Avg Rating</Text>
              </View>
              <View style={styles.statCard}>
                <TrendingUp size={20} color="#10B981" />
                <Text style={styles.statNumber}>5K+</Text>
                <Text style={styles.statLabel}>Visitors</Text>
              </View>
            </View>

            <View style={styles.spotsSection}>
              <Text style={styles.sectionTitle}>Popular Attractions</Text>
              
              {touristSpots.map((spot) => (
                <View key={spot.id} style={styles.spotContainer}>
                  <TouchableOpacity
                    style={styles.spotCard}
                    onPress={() => handleSpotPress(spot.id)}
                  >
                    <Image source={{ uri: spot.image }} style={styles.spotImage} />
                    <View style={styles.spotContent}>
                      <View style={styles.spotHeader}>
                        <Text style={styles.spotName}>{spot.name}</Text>
                        <View style={styles.ratingContainer}>
                          <Star size={16} color="#F59E0B" fill="#F59E0B" />
                          <Text style={styles.rating}>{spot.rating}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.spotDescription} numberOfLines={2}>
                        {spot.description}
                      </Text>
                      
                      <View style={styles.spotDetails}>
                        <View style={styles.spotDetail}>
                          <MapPin size={14} color="#6B7280" />
                          <Text style={styles.spotDetailText}>{spot.location}</Text>
                        </View>
                        <View style={styles.spotDetail}>
                          <Eye size={14} color="#6B7280" />
                          <Text style={styles.spotDetailText}>{spot.viewCount} views</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {selectedSpot === spot.id && (
                    <View style={styles.expandedContent}>
                      <View style={styles.spotInfo}>
                        <View style={styles.infoRow}>
                          <Clock size={16} color="#6B7280" />
                          <Text style={styles.infoText}>{spot.openingHours}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <DollarSign size={16} color="#6B7280" />
                          <Text style={styles.infoText}>{spot.entryFee}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Navigation size={16} color="#6B7280" />
                          <Text style={styles.infoText}>{spot.travelTime}</Text>
                        </View>
                      </View>

                      <View style={styles.highlightsSection}>
                        <Text style={styles.highlightsTitle}>Highlights</Text>
                        <View style={styles.highlightsList}>
                          {spot.highlights.map((highlight, index) => (
                            <View key={index} style={styles.highlightChip}>
                              <Text style={styles.highlightText}>{highlight}</Text>
                            </View>
                          ))}
                        </View>
                      </View>

                      <View style={styles.spotActions}>
                        <TouchableOpacity 
                          style={styles.actionButton}
                          onPress={() => handleGetDirections(spot.coordinates, spot.name)}
                        >
                          <Navigation size={16} color="#FFFFFF" />
                          <Text style={styles.actionButtonText}>Get Directions</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.secondaryButton}>
                          <Heart size={16} color="#DC2626" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.secondaryButton}>
                          <Share size={16} color="#DC2626" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.transparencySection}>
            <View style={styles.transparencyInfo}>
              <Text style={styles.transparencyTitle}>Government Transparency</Text>
              <Text style={styles.transparencyText}>
                Track the progress of public projects and see how your tax money is being used 
                to improve our city. We believe in open and transparent governance.
              </Text>
            </View>

            <View style={styles.projectsStats}>
              <View style={styles.projectStatCard}>
                <Text style={styles.projectStatNumber}>4</Text>
                <Text style={styles.projectStatLabel}>Active Projects</Text>
              </View>
              <View style={styles.projectStatCard}>
                <Text style={styles.projectStatNumber}>₱70M</Text>
                <Text style={styles.projectStatLabel}>Total Investment</Text>
              </View>
              <View style={styles.projectStatCard}>
                <Text style={styles.projectStatNumber}>1</Text>
                <Text style={styles.projectStatLabel}>Completed</Text>
              </View>
            </View>

            <View style={styles.projectsSection}>
              <Text style={styles.sectionTitle}>Public Projects</Text>
              
              {publicProjects.map((project) => (
                <View key={project.id} style={styles.projectCard}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(project.status)}20` }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
                        {project.status}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  
                  <View style={styles.projectDetails}>
                    <View style={styles.projectDetailRow}>
                      <Text style={styles.projectDetailLabel}>Budget:</Text>
                      <Text style={styles.projectDetailValue}>{formatCurrency(project.cost)}</Text>
                    </View>
                    <View style={styles.projectDetailRow}>
                      <Text style={styles.projectDetailLabel}>Contractor:</Text>
                      <Text style={styles.projectDetailValue}>{project.contractor}</Text>
                    </View>
                    <View style={styles.projectDetailRow}>
                      <Text style={styles.projectDetailLabel}>Location:</Text>
                      <Text style={styles.projectDetailValue}>{project.location}</Text>
                    </View>
                    <View style={styles.projectDetailRow}>
                      <Text style={styles.projectDetailLabel}>Funding:</Text>
                      <Text style={styles.projectDetailValue}>{project.fundingSource}</Text>
                    </View>
                  </View>

                  {project.status !== 'Planned' && (
                    <View style={styles.progressSection}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>Progress</Text>
                        <Text style={styles.progressPercentage}>{project.progress}%</Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { 
                              width: `${project.progress}%`,
                              backgroundColor: getStatusColor(project.status)
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
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
  welcomeSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  spotsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  spotContainer: {
    marginBottom: 16,
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
  rating: {
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
  spotDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  spotDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotDetailText: {
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
  },
  spotInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginLeft: 8,
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
  highlightChip: {
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
  spotActions: {
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
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  transparencySection: {
    flex: 1,
  },
  transparencyInfo: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  transparencyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  transparencyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E3A8A',
    lineHeight: 20,
  },
  projectsStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  projectStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  projectStatNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  projectStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  projectsSection: {
    marginBottom: 24,
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
  projectDetails: {
    marginBottom: 16,
  },
  projectDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  projectDetailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  projectDetailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
    textAlign: 'right',
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
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