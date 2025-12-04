import * as Location from 'expo-location';
import React, { useState } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const App = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { id, name: initialName, coordinates: initialCoordinates, accuration: initialAccuration } = params;

    const [name, setName] = useState(initialName);
    const [location, setLocation] = useState(initialCoordinates);
    const [accuration, setAccuration] = useState(initialAccuration);

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

    const getCoordinates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const coords = location.coords.latitude + ',' + location.coords.longitude;
        setLocation(coords);
        setAccuration(location.coords.accuracy + ' m');
    };

    // >>>>>> ALERT SUKSES
    const createOneButtonAlert = (callback: any) =>
        Alert.alert('Success', 'Berhasil memperbarui data', [
            { text: 'OK', onPress: callback },
        ]);

    // >>>>>> HANDLE UPDATE
    const handleUpdate = () => {
        if (!id) {
            Alert.alert("Error", "ID lokasi tidak ditemukan.");
            return;
        }
        const pointRef = ref(db, `points/${id}`);

        update(pointRef, {
            name: name,
            coordinates: location,
            accuration: accuration,
        }).then(() => {
            createOneButtonAlert(() => router.back());
        }).catch((e) => {
            console.error("Error updating document: ", e);
            Alert.alert("Error", "Gagal memperbarui data");
        });
    };

    return (
        <SafeAreaProvider style={{ backgroundColor: 'white' }}>
            <SafeAreaView>
                <Stack.Screen options={{ title: 'Form Edit Location' }} />

                <Text style={styles.inputTitle}>Nama</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.inputTitle}>Koordinat</Text>
                <TextInput style={styles.input} value={location} onChangeText={setLocation} />

                <Text style={styles.inputTitle}>Accuration</Text>
                <TextInput style={styles.input} value={accuration} onChangeText={setAccuration} />

                <View style={styles.button}>
                    <Button title="Get Current Location" onPress={getCoordinates} />
                </View>

                <View style={styles.button}>
                    <Button title="Save" onPress={handleUpdate} />
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    inputTitle: {
        marginLeft: 12,
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        margin: 12,
    }
});

export default App;
