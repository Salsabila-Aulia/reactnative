import React, { useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, remove } from 'firebase/database';

// Firebase config (sama dengan yang di map.html; pastikan cocok)
const firebaseConfig = {
    apiKey: "AIzaSyAx9yAT6dstWNoRY6ZvIdXHlqfbX7CpGmM",
    authDomain: "reactnative-1d3a7.firebaseapp.com",
    databaseURL: "https://reactnative-1d3a7-default-rtdb.firebaseio.com",
    projectId: "reactnative-1d3a7",
    storageBucket: "reactnative-1d3a7.firebasestorage.app",
    messagingSenderId: "347284551705",
    appId: "1:347284551705:web:ff056d92a7b21ad4121288"
};

// Init Firebase safely (prevent double init)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getDatabase(app);

// Use require for loading local HTML bundle (WebView expects a resource or uri)
const webmap = require('../../assets/images/html/map.html');

export default function MapWebViewScreen() {
    const webviewRef = useRef<WebView>(null);

    // Handler for messages coming FROM the WebView (map.html)
    const handleOnMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'delete' && data.key) {
                const { key, name } = data;
                // show native confirmation alert and delete on confirm
                Alert.alert(
                    'Hapus Lokasi',
                    `Apakah Anda yakin ingin menghapus lokasi "${name || key}"?`,
                    [
                        { text: 'Batal', style: 'cancel' },
                        {
                            text: 'Hapus',
                            style: 'destructive',
                            onPress: async () => {
                                try {
                                    await remove(ref(db, `points/${key}`));
                                    // optionally send a message back to webview to notify
                                    // webviewRef.current?.postMessage(JSON.stringify({ type: 'deleted', key }));
                                } catch (e) {
                                    console.error('Remove error', e);
                                    Alert.alert('Gagal', 'Tidak dapat menghapus data. Cek koneksi atau logs.');
                                }
                            }
                        }
                    ]
                );
            }
        } catch (e) {
            console.error('Failed to parse message from WebView', e);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webviewRef}
                originWhitelist={['*']}
                source={webmap}
                style={styles.webview}
                onMessage={handleOnMessage}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/forminputlocation')}
            >
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    webview: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
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
