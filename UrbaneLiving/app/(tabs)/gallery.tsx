import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, RefreshControl, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ENDPOINTS } from '@/constants/apiConfig';

const { width, height } = Dimensions.get('window');

export default function GalleryScreen() {
  const [allGalleryItems, setAllGalleryItems] = useState<any[]>([]);
  const [displayDesigns, setDisplayDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // SABAN: Yahan '?platform=app' add kiya hai taaki Backend AppGallery ka data bhej sake
      const response = await axios.get(`${ENDPOINTS.DESIGNS}?platform=app`);
      
      // Backend ab khud filter karke dega, isliye yahan hum direct data set kar rahe hain
      const data = response.data;
      setAllGalleryItems(data);
      setDisplayDesigns(data.slice(0, itemsPerPage));
    } catch (err) {
      console.log("Gallery Fetch Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleImagePress = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    setModalVisible(true);
  };

  const loadMore = () => {
    if (displayDesigns.length < allGalleryItems.length) {
      const nextPage = page + 1;
      const nextItems = allGalleryItems.slice(0, nextPage * itemsPerPage);
      setDisplayDesigns(nextItems);
      setPage(nextPage);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData();
  };

  const renderFooter = () => {
    if (displayDesigns.length >= allGalleryItems.length) return null;
    return <ActivityIndicator size="small" color="#2e7d32" style={{ marginVertical: 20 }} />;
  };

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#2e7d32" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayDesigns}
        numColumns={2}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => handleImagePress(item.image)}
            style={[styles.card, { height: index % 3 === 0 ? 280 : 200 }]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.overlay}>
              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>{item.title || 'Urbane Design'}</ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2e7d32" />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable 
             style={styles.closeButton} 
             onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={50} color="#fff" />
          </Pressable>
          
          {selectedImage && (
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.fullImage} 
              resizeMode="contain" 
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  list: { padding: 8, paddingBottom: 100 },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { color: '#1a1a1a', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 999,
    padding: 10,
  },
  fullImage: {
    width: width,
    height: height * 0.85,
  }
});