import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';

// 1. Components Import
import Navbar from '@/components/home/Navbar';
import HeroSlider from '@/components/home/HeroSlider';
import MarketOfferings from '@/components/home/MarketOfferings'; 
import PremiumSolutions from '@/components/home/PremiumSolutions';
import CallToActionButton from '@/components/home/CallToActionButton';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Fixed Navbar - Brand Identity */}
      <Navbar /> 
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Step 1: Eye Catching Banner */}
        <HeroSlider />

        {/* Step 2: Value Proposition */}
        <MarketOfferings />
        
        {/* Step 3: Service Categories */}
        <PremiumSolutions />
        
        {/* Final Step: Direct Contact */}
        <CallToActionButton />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
});