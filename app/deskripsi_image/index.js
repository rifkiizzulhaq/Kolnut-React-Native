import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'

export default function Deskripsi_image({ route }) {
    useEffect

    const { deskripsi } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.judul}>{deskripsi}</Text>
            <Image
                source={{ uri: `http://192.168.0.102:8888${gambar}` }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.deskripsi}>{deskripsi}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    judul: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    deskripsi: {
        fontSize: 16,
    },
});