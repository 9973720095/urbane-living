import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';

export default function CallToActionButton() {
  const handleCall = () => {
    Linking.openURL('tel:+919973720095'); // Apna number yahan dalein
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handleCall}>
      <Text style={styles.btnText}>Want quick assistance? Just give us a call!</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#2e7d32', margin: 20, padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});