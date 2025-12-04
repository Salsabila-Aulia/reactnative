import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    RefreshControl,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { getApps, initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, remove } from 'firebase/database';

export default function LokasiScreen() {

    const router = useRouter();   // <<--- WAJIB TAMBAH
    
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const firebaseConfig = {
        apiKey: "AIzaSyAx9yAT6dstWNoRY6ZvIdXHlqfbX7CpGmM",
        authDomain: "reactnative-1d3a7.firebaseapp.com",
        databaseURL: "https://reactnative-1d3a7-default-rtdb.firebaseio.com",
        projectId: "reactnative-1d3a7",
        storageBucket: "reactnative-1d3a7.firebasestorage.app",
        messagingSenderId: "347284551705",
        appId: "1:347284551705:web:ff056d92a7b21ad4121288"
    };

    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const handlePress = (coordinates: string) => {
        const [latitude, longitude] = coordinates.split(',').map(coord => coord.trim());
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    const handleDelete = (id: string, name?: string) => {
        Alert.alert(
            'Hapus Lokasi',
            `Apakah Anda yakin ingin menghapus lokasi "${name || id}"?`,
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await remove(ref(db, `points/${id}`));
                        } catch (e) {
                            console.error('Remove error', e);
                            Alert.alert('Gagal', 'Tidak dapat menghapus data. Cek koneksi.');
                        }
                    }
                }
            ]
        );
    };

    // >>>>>>> WAJIB TAMBAH (HANDLE EDIT)
    const handleEdit = (item: any) => {
        router.push({
            pathname: "/formeditlocation",
            params: {
                id: item.id,
                name: item.name,
                coordinates: item.coordinates,
                accuration: item.accuration || ''
            }
        });
    };
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    useEffect(() => {
        const pointsRef = ref(db, 'points/');

        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pointsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                const formattedData = [{
                    title: 'Lokasi Tersimpan',
                    data: pointsArray
                }];
                setSections(formattedData);
            } else {
                setSections([]);
            }
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" />
            </ThemedView>
        );
    }

    return (
        <View style={styles.container}>
            {sections.length > 0 ? (
                <SectionList
                    sections={sections}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }: any) => (
                        <View style={styles.rowContainer}>
                            <TouchableOpacity style={styles.itemTouchable}
                                onPress={() => handlePress(item.coordinates)}>
                                <View style={styles.item}>
                                    <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                                    <ThemedText>{item.coordinates}</ThemedText>
                                </View>
                            </TouchableOpacity>

                            <View>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleEdit(item)}   // <<--- FIXED
                                >
                                    <FontAwesome5 name="pencil-alt" size={24} color="orange" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                    style={styles.deleteButton}
                                >
                                    <FontAwesome5 name="trash" size={24} color="red" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <ThemedText style={styles.header}>{title}</ThemedText>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            ) : (
                <ThemedView style={styles.container}>
                    <ThemedText>Tidak ada data lokasi tersimpan.</ThemedText>
                </ThemedView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#5defeddb',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    itemTouchable: {
        flex: 1,
    },
    item: {
        backgroundColor: '#73bcecff',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 12,
        borderRadius: 8,
    },
    itemName: {
        fontSize: 16,      // <<< diperkecil
        fontWeight: '600',
    },
    header: {
        fontSize: 20,      // <<< diperkecil
        fontWeight: 'bold',
        backgroundColor: '#000',
        color: '#fff',
        padding: 14,
        width: '100%',
    },
    deleteButton: {
        padding: 8,
        marginRight: 12,
    }
});

