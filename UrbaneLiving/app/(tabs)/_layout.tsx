import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#2e7d32',
      tabBarStyle: { 
        height: 70, 
        paddingBottom: 10,
        borderTopWidth: 0, // Border line hatayi
        elevation: 0, 
      },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} /> }} />
      <Tabs.Screen name="gallery" options={{ title: 'Gallery', headerShown: true, tabBarIcon: ({ focused }) => (
            <View style={[styles.centerIcon, focused && styles.centerIconActive]}>
              <Ionicons name="images" size={30} color={focused ? '#fff' : '#2e7d32'} />
            </View>
          ),
      }} />
      <Tabs.Screen name="explore" options={{ title: 'Profile', tabBarIcon: ({ color }) => <Ionicons name="person" size={26} color={color} /> }} />
      <Tabs.Screen name="about" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerIcon: { width: 60, height: 60, backgroundColor: '#fff', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 30, elevation: 5, borderWidth: 2, borderColor: '#2e7d32' },
  centerIconActive: { backgroundColor: '#2e7d32' }
});