import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useState } from 'react';
import { Phone, MessageCircle, TriangleAlert as AlertTriangle, MapPin, Clock, Users, FileText, Camera, Send, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const emergencyHotlines = [
  {
    id: 1,
    title: 'Emergency Response Team',
    number: '911',
    description: 'For life-threatening emergencies and immediate assistance',
    isEmergency: true,
    department: 'Emergency Services',
    hours: '24/7',
  },
  {
    id: 2,
    title: 'Fire Department',
    number: '(077) 770-2345',
    description: 'Fire emergencies, rescue operations, and fire safety',
    isEmergency: true,
    department: 'Fire Department',
    hours: '24/7',
  },
  {
    id: 3,
    title: 'Police Station',
    number: '(077) 770-3456',
    description: 'Crime reporting, public safety, and law enforcement',
    isEmergency: true,
    department: 'Police Department',
    hours: '24/7',
  },
  {
    id: 4,
    title: 'Medical Emergency',
    number: '(077) 770-4567',
    description: 'Medical emergencies and ambulance services',
    isEmergency: true,
    department: 'Health Department',
    hours: '24/7',
  },
  {
    id: 5,
    title: 'City Hall Main Line',
    number: '(077) 770-1234',
    description: 'General inquiries and city government services',
    isEmergency: false,
    department: 'City Government',
    hours: 'Mon-Fri 8AM-5PM',
  },
  {
    id: 6,
    title: 'Public Works Department',
    number: '(077) 770-5678',
    description: 'Road issues, infrastructure problems, and public utilities',
    isEmergency: false,
    department: 'Public Works',
    hours: 'Mon-Fri 8AM-5PM',
  },
  {
    id: 7,
    title: 'Social Services',
    number: '(077) 770-6789',
    description: 'Social assistance, welfare programs, and community support',
    isEmergency: false,
    department: 'Social Services',
    hours: 'Mon-Fri 8AM-5PM',
  },
  {
    id: 8,
    title: 'Tourism Office',
    number: '(077) 770-7890',
    description: 'Tourist assistance, information, and travel support',
    isEmergency: false,
    department: 'Tourism',
    hours: 'Mon-Sat 8AM-6PM',
  },
];

const issueCategories = [
  {
    id: 'flooding',
    name: 'Flooding',
    icon: AlertTriangle,
    color: '#3B82F6',
    description: 'Report flooding in your area',
  },
  {
    id: 'road-issues',
    name: 'Road Issues',
    icon: MapPin,
    color: '#F59E0B',
    description: 'Potholes, damaged roads, traffic issues',
  },
  {
    id: 'fire-hazard',
    name: 'Fire Hazard',
    icon: AlertTriangle,
    color: '#EF4444',
    description: 'Fire safety concerns and hazards',
  },
  {
    id: 'power-outage',
    name: 'Power Outage',
    icon: AlertTriangle,
    color: '#8B5CF6',
    description: 'Electrical issues and power outages',
  },
  {
    id: 'environmental',
    name: 'Environmental',
    icon: AlertTriangle,
    color: '#10B981',
    description: 'Pollution, waste management, environmental concerns',
  },
  {
    id: 'public-safety',
    name: 'Public Safety',
    icon: AlertTriangle,
    color: '#DC2626',
    description: 'Safety concerns and security issues',
  },
];

export default function AssistanceScreen() {
  const [selectedTab, setSelectedTab] = useState<'hotlines' | 'report'>('hotlines');

  const handleCall = (phoneNumber: string, title: string) => {
    Alert.alert(
      'Make Call',
      `Call ${title} at ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => {
            const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
            Linking.openURL(`tel:${cleanNumber}`);
          }
        },
      ]
    );
  };

  const handleReportIssue = (categoryId: string) => {
    // In a real app, this would navigate to the issue reporting form
    Alert.alert(
      'Report Issue',
      `You selected: ${issueCategories.find(cat => cat.id === categoryId)?.name}\n\nThis would open the issue reporting form.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Assistance</Text>
          <Text style={styles.headerSubtitle}>Get help and report issues</Text>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'hotlines' && styles.activeTab]}
          onPress={() => setSelectedTab('hotlines')}
        >
          <Phone size={20} color={selectedTab === 'hotlines' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.tabText, selectedTab === 'hotlines' && styles.activeTabText]}>
            Emergency Hotlines
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'report' && styles.activeTab]}
          onPress={() => setSelectedTab('report')}
        >
          <FileText size={20} color={selectedTab === 'report' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.tabText, selectedTab === 'report' && styles.activeTabText]}>
            Report Issues
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'hotlines' ? (
          <View style={styles.hotlinesSection}>
            <View style={styles.emergencyBanner}>
              <AlertTriangle size={20} color="#DC2626" />
              <Text style={styles.emergencyText}>
                For life-threatening emergencies, call 911 immediately
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Emergency Hotlines</Text>
              {emergencyHotlines
                .filter(hotline => hotline.isEmergency)
                .map((hotline) => (
                  <TouchableOpacity
                    key={hotline.id}
                    style={[styles.hotlineCard, styles.emergencyCard]}
                    onPress={() => handleCall(hotline.number, hotline.title)}
                  >
                    <View style={styles.hotlineHeader}>
                      <View style={styles.emergencyIndicator}>
                        <AlertTriangle size={16} color="#FFFFFF" />
                      </View>
                      <View style={styles.hotlineInfo}>
                        <Text style={styles.hotlineTitle}>{hotline.title}</Text>
                        <Text style={styles.hotlineNumber}>{hotline.number}</Text>
                      </View>
                      <Phone size={20} color="#DC2626" />
                    </View>
                    <Text style={styles.hotlineDescription}>{hotline.description}</Text>
                    <View style={styles.hotlineDetails}>
                      <View style={styles.hotlineDetail}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.hotlineDetailText}>{hotline.department}</Text>
                      </View>
                      <View style={styles.hotlineDetail}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.hotlineDetailText}>{hotline.hours}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>General Services</Text>
              {emergencyHotlines
                .filter(hotline => !hotline.isEmergency)
                .map((hotline) => (
                  <TouchableOpacity
                    key={hotline.id}
                    style={styles.hotlineCard}
                    onPress={() => handleCall(hotline.number, hotline.title)}
                  >
                    <View style={styles.hotlineHeader}>
                      <View style={styles.serviceIndicator}>
                        <Phone size={16} color="#3B82F6" />
                      </View>
                      <View style={styles.hotlineInfo}>
                        <Text style={styles.hotlineTitle}>{hotline.title}</Text>
                        <Text style={styles.hotlineNumber}>{hotline.number}</Text>
                      </View>
                      <Phone size={20} color="#3B82F6" />
                    </View>
                    <Text style={styles.hotlineDescription}>{hotline.description}</Text>
                    <View style={styles.hotlineDetails}>
                      <View style={styles.hotlineDetail}>
                        <Users size={14} color="#6B7280" />
                        <Text style={styles.hotlineDetailText}>{hotline.department}</Text>
                      </View>
                      <View style={styles.hotlineDetail}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.hotlineDetailText}>{hotline.hours}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        ) : (
          <View style={styles.reportSection}>
            <View style={styles.reportInfo}>
              <Text style={styles.reportInfoTitle}>Report Community Issues</Text>
              <Text style={styles.reportInfoText}>
                Help improve our city by reporting issues in your community. Your reports help us 
                prioritize and address problems more effectively.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Issue Category</Text>
              <View style={styles.categoriesGrid}>
                {issueCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <TouchableOpacity
                      key={category.id}
                      style={styles.categoryCard}
                      onPress={() => handleReportIssue(category.id)}
                    >
                      <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                        <IconComponent size={24} color={category.color} />
                      </View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryDescription}>{category.description}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.reportSteps}>
              <Text style={styles.sectionTitle}>How to Report</Text>
              <View style={styles.stepsList}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Select Category</Text>
                    <Text style={styles.stepDescription}>Choose the type of issue you want to report</Text>
                  </View>
                </View>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Provide Details</Text>
                    <Text style={styles.stepDescription}>Describe the issue and provide location information</Text>
                  </View>
                </View>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Add Photos</Text>
                    <Text style={styles.stepDescription}>Take photos to help us understand the problem better</Text>
                  </View>
                </View>
                
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Submit Report</Text>
                    <Text style={styles.stepDescription}>Submit your report and track its progress</Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.quickReportButton}>
              <Camera size={20} color="#FFFFFF" />
              <Text style={styles.quickReportText}>Quick Report with Camera</Text>
            </TouchableOpacity>
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
  hotlinesSection: {
    flex: 1,
  },
  emergencyBanner: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  emergencyText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#991B1B',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  hotlineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  emergencyCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  hotlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hotlineInfo: {
    flex: 1,
  },
  hotlineTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  hotlineNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#DC2626',
  },
  hotlineDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  hotlineDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  hotlineDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotlineDetailText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  reportSection: {
    flex: 1,
  },
  reportInfo: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  reportInfoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  reportInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E3A8A',
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  reportSteps: {
    marginBottom: 24,
  },
  stepsList: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  quickReportButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quickReportText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});