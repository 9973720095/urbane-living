import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  // 'any' use karne se TypeScript error dena band kar dega
  const handleNavigation = (path: any) => {
    setMenuVisible(false);
    router.push(path);
  };

  return (
    <View style={styles.navContainer}>
      <ThemedText style={styles.brandName}>URBANE LIVING</ThemedText>

      <TouchableOpacity onPress={() => setMenuVisible(true)} activeOpacity={0.7}>
        <Ionicons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownMenu}>
              
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => handleNavigation('/about')} 
              >
                <Ionicons name="information-circle-outline" size={20} color="#333" />
                <ThemedText style={styles.menuText}>About Us</ThemedText>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 1.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdownMenu: {
    marginTop: 100,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: 160,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
});