import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

export default function Dashboard() {
    const navigation = useNavigation();
    const [artikel, setArtikel] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${baseUrl.url}/artikel`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setArtikel(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const renderItem = ({ item }) => {
        const imageUrl = `http://10.0.141.134:8888${item.gambar}`;
        console.log(imageUrl);
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Deskripsi_image', { judul: item.judul, deskripsi: item.deskripsi, gambar: item.gambar })}>
                <View>
                    <Text>{item.judul}</Text>
                    <Text>{item.deskripsi}</Text>
                    <Image
                        source={{ uri: imageUrl }}
                        style={{ width: 100, height: 100 }}
                        resizeMode="cover"
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.tulisan}>Cari Objek Makanan Untuk Dipindai</Text>
            </View>
            <View style={styles.bungkus}>
                <View style={styles.touch}>
                    <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../image/scanner.png')}
                            resizeMode="cover"
                        />
                        <Text style={styles.tulisan1}>Scan</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={artikel}
                nestedScrollEnabled={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    tulisan: {
        color:'black',
        fontWeight:'bold',
        fontSize:26
    },
    tulisan1: {
        color:'black',
        fontWeight:'bold',
        fontSize:15,
        marginLeft:9,
        marginTop:5
    },
    bungkus : {
        // borderWidth:2,
        marginTop:10
    },
    touch: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FAFD5D',
        borderWidth:2,
        borderRadius:10,
        width:100,
        height:100
    },
    bungkus1 : {
        borderWidth:2,
        
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:100
    }
})