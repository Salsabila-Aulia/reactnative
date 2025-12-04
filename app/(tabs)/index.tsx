import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      style={{ backgroundColor: '#E6F7FF' }}          // 👉 Tambahkan ini
      contentContainerStyle={styles.pageBackground}   
      headerBackgroundColor={{ light: '#23bef279', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/karimunjawa.jpeg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Selamat Datang di JEJAK</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Nama</ThemedText>
        <ThemedText>
          Salsabila Aulia Al 'Izzati
        </ThemedText>
        <ThemedText type="subtitle">NIM</ThemedText>
        <ThemedText>
          23/520763/SV/23294
        </ThemedText>
        <ThemedText type="subtitle">Kelas</ThemedText>
        <ThemedText>
          B
        </ThemedText>
        <ThemedText type="subtitle">Mata Kuliah</ThemedText>
        <ThemedText>
          Praktikum Pemrograman Geospasial Perangkat Bergerak Lanjut
        </ThemedText>
        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">JEJAK</ThemedText>
        <ThemedText>
          Aplikasi JEJAK ini berisi informasi mengenai berbagai pariwisata yang exotis dan menawan yang terdapat di pulau karimunjawa. selain pariwisata, terdapat informasi akomodasi untuk mempermudah para wisatawan, seperti bandara, pelabuhan, dan resort.
          </ThemedText>
        </ThemedView>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    backgroundColor: '#E6F7FF', 
    padding: 16,
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: '100%',
    height: 230,
    resizeMode: 'cover',
  },
});

