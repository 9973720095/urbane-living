import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OFFERINGS = [
  {
    id: '1',
    title: 'Precision Engineering',
    desc: 'We use heavy-duty galvanized frames for zero sagging.',
    icon: 'checkmark-circle'
  },
  {
    id: '2',
    title: '7-Day Quick Install',
    desc: 'Advance planning and pre-cut materials for lightning fast completion.',
    icon: 'flash'
  },
  {
    id: '3',
    title: 'Seamless Finish',
    desc: 'High-grade jointing compounds for a glass-like smooth surface.',
    icon: 'star'
  }
];

export default function MarketOfferings() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>WHY CHOOSE US</Text>
      <Text style={styles.mainTitle}>Advanced Market Offerings</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {OFFERINGS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon as any} size={30} color="#fff" />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 30, backgroundColor: '#f9f9f9' },
  sectionLabel: { textAlign: 'center', color: '#2e7d32', fontWeight: 'bold', letterSpacing: 1 },
  mainTitle: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1a1a1a' },
  scroll: { paddingLeft: 20 },
  card: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#2e7d32'
  },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2e7d32', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardDesc: { color: '#666', lineHeight: 22 }
});