import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SOLUTIONS = [
  { id: '1', title: 'Modular Kitchen', icon: 'countertop' },
  { id: '2', title: 'Wardrobe', icon: 'wardrobe' },
  { id: '3', title: 'False Ceiling', icon: 'ceiling-light' },
  { id: '4', title: 'Wall Decor', icon: 'format-paint' },
];

export default function PremiumSolutions() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Premium Interior Solutions</Text>
      <View style={styles.grid}>
        {SOLUTIONS.map((item) => (
          <View key={item.id} style={styles.item}>
            <MaterialCommunityIcons name={item.icon as any} size={40} color="#2e7d32" />
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  item: { width: '48%', backgroundColor: '#f5f5f5', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  itemText: { marginTop: 10, fontWeight: '500' }
});