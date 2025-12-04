import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const App = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [accuration, setAccuration] = useState('');

    // Get current location
    const getCoordinates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }


        let location = await Location.getCurrentPositionAsync({});
        const coords = location.coords.latitude + ',' + location.coords.longitude;
        setLocation(coords);


        const accuracy = location.coords.accuracy;
        setAccuration(accuracy + ' m');
    };

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAx9yAT6dstWNoRY6ZvIdXHlqfbX7CpGmM",
        authDomain: "reactnative-1d3a7.firebaseapp.com",
        databaseURL: "https://reactnative-1d3a7-default-rtdb.firebaseio.com",
        projectId: "reactnative-1d3a7",
        storageBucket: "reactnative-1d3a7.firebasestorage.app",
        messagingSenderId: "347284551705",
        appId: "1:347284551705:web:ff056d92a7b21ad4121288"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    return (
        <SafeAreaProvider style={{ backgroundColor: 'white' }}>
            <SafeAreaView>
                <Stack.Screen options={{ title: 'Form Input Location' }} />
                <Text style={styles.inputTitle}>Nama</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Isikan nama objek'
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.inputTitle}>Koordinat</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Isikan koordinat"
                    value={location}
                    onChangeText={setLocation}
                />
                <Text style={styles.inputTitle}>Accuration</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Isikan akurasi"
                    value={accuration}
                    onChangeText={setAccuration}
                />
                <View style={styles.button}>
                    <Button
                        title="Get Current Location"
                        onPress={getCoordinates}

                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Save"
                        onPress={() => {
                            const locationsRef = ref(db, 'points/');
                            push(locationsRef, {
                                name: name,
                                coordinates: location,
                                accuration: accuration,
                            }).then(() => {
                                //createOneButtonAlert();
                                console.log("yeey berhasil menyimpan data ", locationsRef.key);
                                // clear form
                                setName('');
                                setLocation('');
                                setAccuration('');
                            }).catch((e) => {
                                console.error("Error adding document: ", e);
                                Alert.alert("Error", "Gagal menyimpan data");
                            });
                        }}
                    />
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