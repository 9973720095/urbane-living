import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Linking, FlatList, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AboutScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Dynamic State for Admin Dashboard Integration
  const [aboutBanners, setAboutBanners] = useState([
    { id: 'a1', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace' },
    { id: 'a2', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7' },
    { id: 'a3', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6' },
  ]);

  useEffect(() => {
    if (aboutBanners.length <= 1) return;
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= aboutBanners.length) nextIndex = 0;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, aboutBanners]);

  const openWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=919973720095&text=Hello Urbane Living, I am interested in your services.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Dynamic Hero Slider */}
      <View style={styles.heroSection}>
        <FlatList
          ref={flatListRef}
          data={aboutBanners}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={{ uri: item.image }} style={styles.heroImage} />
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>URBANE LIVING</Text>
          <Text style={styles.heroSubtitle}>Interior Design Company</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Premium English Content */}
        <ThemedText style={styles.mainHeading}>Excellence in Every Square Inch</ThemedText>
        <ThemedText style={styles.description}>
          At Urbane Living, we redefine luxury by blending architectural precision with contemporary aesthetics. While industry standards like Gyproc provide the foundation, we build the masterpiece. Our approach integrates sustainable materials, cutting-edge 3D visualization, and bespoke craftsmanship to transform your vision into a living reality.
        </ThemedText>

        <View style={styles.divider} />

        {/* Competitive Edge Section */}
        <ThemedText style={styles.subHeading}>Why Choose Urbane Living?</ThemedText>
        
        <View style={styles.featureCard}>
          <Ionicons name="shield-checkmark-outline" size={28} color="#2e7d32" />
          <View style={styles.featureTextContainer}>
            <ThemedText style={styles.featureTitle}>10-Year Structural Warranty</ThemedText>
            <ThemedText style={styles.featureDesc}>We stand by our work. Our commitment to quality ensures your peace of mind for a decade.</ThemedText>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Ionicons name="color-palette-outline" size={28} color="#2e7d32" />
          <View style={styles.featureTextContainer}>
            <ThemedText style={styles.featureTitle}>Bespoke Material Selection</ThemedText>
            <ThemedText style={styles.featureDesc}>From Italian marbles to premium acoustics, we source only the finest globally-certified materials.</ThemedText>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Ionicons name="timer-outline" size={28} color="#2e7d32" />
          <View style={styles.featureTextContainer}>
            <ThemedText style={styles.featureTitle}>On-Time Project Delivery</ThemedText>
            <ThemedText style={styles.featureDesc}>Our streamlined project management ensures that your space is ready within the promised 45-day timeline.</ThemedText>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Social & Contact */}
        <ThemedText style={styles.subHeading}>Connect With Us</ThemedText>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/urbaneliving')}>
            <Ionicons name="logo-instagram" size={32} color="#E1306C" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 40 }} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/urbaneliving')}>
            <Ionicons name="logo-facebook" size={32} color="#1877F2" />
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.footerText}>© 2026 Urbane Living Interiors. Delhi NCR.</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroSection: { height: 280, position: 'relative' },
  slide: { width: width, height: 280 },
  heroImage: { width: '100%', height: '100%', opacity: 0.7 },
  heroOverlay: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    padding: 25, 
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 10 
  },
  heroTitle: { color: '#fff', fontSize: 30, fontWeight: '900', letterSpacing: 2 },
  heroSubtitle: { color: '#4caf50', fontSize: 16, fontWeight: 'bold' },
  content: { padding: 25 },
  mainHeading: { fontSize: 24, fontWeight: '900', color: '#1a1a1a', marginBottom: 12 },
  description: { fontSize: 15, color: '#555', lineHeight: 24, textAlign: 'justify' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 30 },
  subHeading: { fontSize: 18, fontWeight: '800', color: '#333', marginBottom: 20 },
  featureCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fafafa', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#2e7d32' 
  },
  featureTextContainer: { marginLeft: 15, flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#2e7d32' },
  featureDesc: { fontSize: 13, color: '#666', marginTop: 4, lineHeight: 18 },
  socialIcons: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 30 },
  footerText: { textAlign: 'center', color: '#ccc', fontSize: 11, letterSpacing: 1 },
});