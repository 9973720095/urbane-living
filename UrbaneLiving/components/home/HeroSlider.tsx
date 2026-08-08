import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, Text, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Admin Dashboard/API se aane waali images ke liye state
  const [homeBanners, setHomeBanners] = useState([
    { id: 'h1', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6' },
    { id: 'h2', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace' },
  ]);

  // Future: Yahan aap Admin Dashboard ki API call kar sakte hain
  /*
  useEffect(() => {
    fetch('YOUR_ADMIN_API_URL/home-banners')
      .then(res => res.json())
      .then(data => setHomeBanners(data));
  }, []);
  */

  useEffect(() => {
    if (homeBanners.length <= 1) return;

    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= homeBanners.length) nextIndex = 0;
      
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3500);

    return () => clearInterval(timer);
  }, [currentIndex, homeBanners]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={homeBanners}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      <View style={styles.overlay}>
        <Text style={styles.title}>URBANE LIVING</Text>
        <Text style={styles.subtitle}>Interior Design Company</Text>
      </View>

      <View style={styles.pagination}>
        {homeBanners.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex ? styles.activeDot : null]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 250, backgroundColor: '#000' },
  slide: { width: width, height: 250 },
  image: { width: '100%', height: '100%', opacity: 0.65 },
  overlay: { position: 'absolute', bottom: 50, left: 20, zIndex: 10 },
  title: { color: '#fff', fontSize: 30, fontWeight: '900', letterSpacing: 1.5 },
  subtitle: { color: '#4caf50', fontSize: 16, fontWeight: 'bold' },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: 15, alignSelf: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 3 },
  activeDot: { backgroundColor: '#fff', width: 15 },
});