import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ChevronRight, Clock, MapPin, Phone, FileText, Users, Heart, GraduationCap, Building, Calculator, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const serviceCategories = [
  {
    id: 1,
    name: 'Civil Registry',
    description: 'Birth certificates, marriage certificates, and other civil documents',
    icon: FileText,
    color: '#3B82F6',
    backgroundColor: '#DBEAFE',
    services: [
      {
        id: 1,
        name: 'Birth Certificate',
        fee: 155.00,
        processingTime: '3-5 working days',
        requirements: ['Valid ID', 'Affidavit if needed', 'Payment receipt'],
      },
      {
        id: 2,
        name: 'Marriage Certificate',
        fee: 155.00,
        processingTime: '3-5 working days',
        requirements: ['Valid ID', 'Marriage contract copy', 'Payment receipt'],
      },
      {
        id: 3,
        name: 'Death Certificate',
        fee: 155.00,
        processingTime: '3-5 working days',
        requirements: ['Valid ID', 'Death certificate copy', 'Payment receipt'],
      },
    ],
  },
  {
    id: 2,
    name: 'Business Permits',
    description: 'Business registration, permits, and licensing services',
    icon: Building,
    color: '#10B981',
    backgroundColor: '#D1FAE5',
    services: [
      {
        id: 4,
        name: 'New Business Permit',
        fee: 2500.00,
        processingTime: '7-10 working days',
        requirements: ['Business registration', 'Barangay clearance', 'Fire safety permit'],
      },
      {
        id: 5,
        name: 'Business Permit Renewal',
        fee: 1800.00,
        processingTime: '3-5 working days',
        requirements: ['Previous permit', 'Updated documents', 'Payment receipt'],
      },
    ],
  },
  {
    id: 3,
    name: 'Health Services',
    description: 'Medical certificates, health clearances, and wellness programs',
    icon: Heart,
    color: '#EF4444',
    backgroundColor: '#FEE2E2',
    services: [
      {
        id: 6,
        name: 'Health Certificate',
        fee: 200.00,
        processingTime: '1-2 working days',
        requirements: ['Valid ID', 'Medical examination', 'Payment receipt'],
      },
      {
        id: 7,
        name: 'Medical Clearance',
        fee: 150.00,
        processingTime: '1-2 working days',
        requirements: ['Valid ID', 'Medical records', 'Payment receipt'],
      },
    ],
  },
  {
    id: 4,
    name: 'Education Services',
    description: 'School enrollment, scholarships, and educational assistance',
    icon: GraduationCap,
    color: '#8B5CF6',
    backgroundColor: '#EDE9FE',
    services: [
      {
        id: 8,
        name: 'Scholarship Application',
        fee: 0.00,
        processingTime: '2-3 weeks',
        requirements: ['Academic records', 'Income certificate', 'Application form'],
      },
      {
        id: 9,
        name: 'Educational Assistance',
        fee: 0.00,
        processingTime: '1-2 weeks',
        requirements: ['School enrollment', 'Financial documents', 'Application form'],
      },
    ],
  },
  {
    id: 5,
    name: 'Social Services',
    description: 'Senior citizen ID, PWD ID, and social assistance programs',
    icon: Users,
    color: '#F59E0B',
    backgroundColor: '#FEF3C7',
    services: [
      {
        id: 10,
        name: 'Senior Citizen ID',
        fee: 0.00,
        processingTime: '1-2 working days',
        requirements: ['Birth certificate', 'Valid ID', 'Application form'],
      },
      {
        id: 11,
        name: 'PWD ID',
        fee: 0.00,
        processingTime: '3-5 working days',
        requirements: ['Medical certificate', 'Valid ID', 'Application form'],
      },
    ],
  },
  {
    id: 6,
    name: 'Tax Services',
    description: 'Real property tax, business tax, and tax clearances',
    icon: Calculator,
    color: '#6366F1',
    backgroundColor: '#E0E7FF',
    services: [
      {
        id: 12,
        name: 'Real Property Tax Payment',
        fee: 'Variable',
        processingTime: 'Same day',
        requirements: ['Tax declaration', 'Previous receipts', 'Valid ID'],
      },
      {
        id: 13,
        name: 'Tax Clearance',
        fee: 100.00,
        processingTime: '1-2 working days',
        requirements: ['Updated tax payments', 'Valid ID', 'Application form'],
      },
    ],
  },
];

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryPress = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleServicePress = (serviceId: number) => {
    // In a real app, this would navigate to appointment booking
    console.log('Book appointment for service:', serviceId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>City Services</Text>
          <Text style={styles.headerSubtitle}>Book appointments and access services</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to Book an Appointment</Text>
          <Text style={styles.infoText}>
            Select a service category below, choose your desired service, and follow the booking process. 
            Make sure to have all required documents ready before your appointment.
          </Text>
        </View>

        <View style={styles.officeHours}>
          <View style={styles.officeHoursHeader}>
            <Clock size={20} color="#DC2626" />
            <Text style={styles.officeHoursTitle}>Office Hours</Text>
          </View>
          <Text style={styles.officeHoursText}>Monday - Friday: 8:00 AM - 5:00 PM</Text>
          <Text style={styles.officeHoursText}>Saturday: 8:00 AM - 12:00 PM</Text>
          <Text style={styles.officeHoursText}>Sunday: Closed</Text>
        </View>

        <View style={styles.contactInfo}>
          <View style={styles.contactHeader}>
            <Phone size={20} color="#DC2626" />
            <Text style={styles.contactTitle}>Contact Information</Text>
          </View>
          <View style={styles.contactItem}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.contactText}>Laoag City Hall, General Second Avenue</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone size={16} color="#6B7280" />
            <Text style={styles.contactText}>(077) 770-1234</Text>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Service Categories</Text>
          
          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            const isExpanded = selectedCategory === category.id;
            
            return (
              <View key={category.id} style={styles.categoryContainer}>
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View style={styles.categoryHeader}>
                    <View style={[styles.categoryIcon, { backgroundColor: category.backgroundColor }]}>
                      <IconComponent size={24} color={category.color} />
                    </View>
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryDescription}>{category.description}</Text>
                    </View>
                    <ChevronRight 
                      size={20} 
                      color="#6B7280" 
                      style={[
                        styles.chevron,
                        isExpanded && styles.chevronExpanded
                      ]} 
                    />
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.servicesContainer}>
                    {category.services.map((service) => (
                      <TouchableOpacity
                        key={service.id}
                        style={styles.serviceCard}
                        onPress={() => handleServicePress(service.id)}
                      >
                        <View style={styles.serviceHeader}>
                          <Text style={styles.serviceName}>{service.name}</Text>
                          <Text style={styles.serviceFee}>
                            {typeof service.fee === 'number' 
                              ? `₱${service.fee.toFixed(2)}`
                              : service.fee
                            }
                          </Text>
                        </View>
                        
                        <View style={styles.serviceDetails}>
                          <View style={styles.serviceDetailItem}>
                            <Clock size={14} color="#6B7280" />
                            <Text style={styles.serviceDetailText}>{service.processingTime}</Text>
                          </View>
                        </View>

                        <View style={styles.requirementsSection}>
                          <Text style={styles.requirementsTitle}>Required Documents:</Text>
                          {service.requirements.map((requirement, index) => (
                            <Text key={index} style={styles.requirementItem}>
                              • {requirement}
                            </Text>
                          ))}
                        </View>

                        <View style={styles.serviceActions}>
                          <TouchableOpacity style={styles.bookButton}>
                            <Text style={styles.bookButtonText}>Book Appointment</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need Help?</Text>
          <Text style={styles.helpText}>
            If you have questions about any service or need assistance with your application, 
            please contact our customer service team or visit the City Hall information desk.
          </Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Contact Support</Text>
          </TouchableOpacity>
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
  infoSection: {
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
  infoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  officeHours: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  officeHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  officeHoursTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#991B1B',
    marginLeft: 8,
  },
  officeHoursText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#991B1B',
    marginBottom: 4,
  },
  contactInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 8,
  },
  servicesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  servicesContainer: {
    marginTop: 16,
    paddingLeft: 16,
  },
  serviceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#DC2626',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  serviceFee: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#DC2626',
  },
  serviceDetails: {
    marginBottom: 12,
  },
  serviceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  requirementsSection: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 8,
  },
  requirementItem: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
    marginLeft: 8,
  },
  serviceActions: {
    alignItems: 'flex-end',
  },
  bookButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bookButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  helpSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1E40AF',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E3A8A',
    lineHeight: 20,
    marginBottom: 16,
  },
  helpButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});