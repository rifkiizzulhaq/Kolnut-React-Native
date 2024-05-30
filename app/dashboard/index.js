import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.tulisan}>Cari Objek Makanan Untuk Dipindai</Text>
            </View>
            <View style={styles.bungkus}>
                <View style={styles.touch}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Scan')}
                    >
                        <Image 
                            style={{ width: 50, height: 50 }}
                            source={require('../image/scanner.png')}
                            resizeMode='cover'
                        />
                        <Text style={styles.tulisan1}>Scan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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