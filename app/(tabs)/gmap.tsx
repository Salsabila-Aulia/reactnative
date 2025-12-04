import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getApps, initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Your firebase config (sama seperti file lainnya)
const firebaseConfig = {
    apiKey: "AIzaSyAx9yAT6dstWNoRY6ZvIdXHlqfbX7CpGmM",
    authDomain: "reactnative-1d3a7.firebaseapp.com",
    databaseURL: "https://reactnative-1d3a7-default-rtdb.firebaseio.com",
    projectId: "reactnative-1d3a7",
    storageBucket: "reactnative-1d3a7.firebasestorage.app",
    messagingSenderId: "347284551705",
    appId: "1:347284551705:web:ff056d92a7b21ad4121288"
};

// Safe init
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function MapScreen() {
    const [markers, setMarkers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pointsRef = ref(db, 'points/');

        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedMarkers = Object.keys(data)
                    .map(key => {
                        const point: any = data[key];
                        if (typeof point.coordinates !== 'string' || point.coordinates.trim() === '') {
                            return null;
                        }
                        const [latitude, longitude] = point.coordinates.split(',').map(Number);
                        if (isNaN(latitude) || isNaN(longitude)) {
                            console.warn(`Invalid coordinates for point ${key}:`, point.coordinates);
                            return null;
                        }
                        return {
                            id: key,
                            name: point.name,
                            latitude,
                            longitude,
                        };
                    })
                    .filter(Boolean);

                setMarkers(parsedMarkers);
            } else {
                setMarkers([]);
            }
            setLoading(false);
        }, (error) => {
            console.error(error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading map data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -7.7956,
                    longitude: 110.3695,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.01,
                }}
                zoomControlEnabled={true}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.name}
                        description={`Coords: ${marker.latitude}, ${marker.longitude}`}
                    />
                ))}
            </MapView>
            <TouchableOpacity style={styles.fab} onPress={() => router.push('/forminputlocation')}>
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        bottom: 20,
        backgroundColor: '#0275d8',
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
