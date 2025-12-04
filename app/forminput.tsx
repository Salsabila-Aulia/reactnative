import React from 'react';
import { StyleSheet, TextInput, Text, Button, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';


const TextInputExample = () => {
    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Stack.Screen options={{ title: 'Form Input' }} />
                <Text style={styles.inputTitle}>Nama</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder='Nama'
                />
                <Text style={styles.inputTitle}>NIM</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    placeholder="NIM"
                    keyboardType="numeric"
                />
                <Text style={styles.inputTitle}>Kelas</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder="Kelas"
                />
                <View style={styles.button}>
                <Button
                    title="Save"
                    color="#4789e4ff"
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
        borderRadius: 15,
    },
    inputTitle: {
        marginLeft: 12,
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600'
    },
    button: {
        margin: 12,
        borderRadius: 15,

        
    }
});

export default TextInputExample;