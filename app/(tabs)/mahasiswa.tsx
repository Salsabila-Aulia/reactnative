import React from 'react';
import { SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const DATA = [
    {
        title: 'Bandara',
        data: ['Bandara Dewadaru'],
    },
    {
        title: 'Pelabuhan',
        data: ['Dermaga Dewadaru', 'Dermaga Rakyat', 'Dermaga Pulau Menjangan Kecil'],
    },
    {
        title: 'Pantai',
        data: ['Pantai Ujung Gantungan', 'Pantai Tanjung Gelam', 'Pantai Batu Topeng', 'Pantai Kemujan', 'Annora Beach', 'Pantai Alano', 'Pantai Batu Lawang', 'Pokemon Beach'],
    },
    {
        title: 'Resort',
        data: ['Java Paradise Resort', 'Dewadaru Resort', 'Karimun Lumbung Resort', 'Floating Paradise', 'CasaVelion Cottages'],
    },
];

const App = () => (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>
                            <MaterialIcons name="beach-access" size={24} color="black" />
                            {item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    </SafeAreaProvider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    item: {
        backgroundColor: '#1ee1ebb0',
        padding: 20,
        marginVertical: 3,
        borderRadius: 5,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#46b6e7ff',
        fontWeight: '600',
        marginTop: 10,
        paddingLeft: 10,
    },
    title: {
        fontSize: 15,
    },
});

export default App;