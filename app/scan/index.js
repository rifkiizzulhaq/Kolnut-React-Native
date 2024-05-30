import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, PermissionsAndroid, Dimensions, StyleSheet, } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
export default function KlasifikasiObjek() {
    const navigation = useNavigation();
    const [cameraData, setCameraData] = useState(null);
    const [Nama_Makanan, SetNamaBarang] = useState(null);
    const [Dedection, SetDedection] = useState(null);

    const generateUniquePictureName = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    const uploadPhoto = async (fileUri) => {
        try {
            let uniquePictureName = generateUniquePictureName();
            let formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                type: 'image/jpeg',
                name: uniquePictureName + '.jpg',
            });

            let response = await axios.post(
                `${baseUrl.url}/scan`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                console.log('Upload berhasil:', response.data);

                let responseJson = response.data;
                SetNamaBarang(responseJson.response.Nama_Makanan);
                SetDedection(responseJson.response.Persentase);
            } else {
                console.error('Upload gagal. Status:', response.status, 'Data:', response.data);
            }
        } catch (error) {
            console.error('Kesalahan mengunggah file:', error);
        }
    };
    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 1280, 
            maxHeight: 720, 
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('Dibatalkan');
            } else if (response.errorCode) {
                console.log(response.errorMessage);
            } else {
                const data = response.assets;
                console.log(data);
                setCameraData(data);

                if (data && data[0] && data[0].uri) {
                    uploadPhoto(data[0].uri);
                }
            }
        });
    };

    const requestCameraPermission = async () => {
        let granted;
        do {
        try {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                openCamera();
                break;
            } else {
                console.log('Camera permission denied, asking again...');
            }
        } catch (err) {
            console.warn(err);
            break;
        }
    } while (granted !== PermissionsAndroid.RESULTS.GRANTED);
    };


    useEffect(() => {
        requestCameraPermission();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.bungkus}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Dashboard')}
                >
                <View>
                    <Text style={styles.tulisan}>Close</Text>
                </View>
                </TouchableOpacity>
                <View>
                    <Text style={styles.tulisan1}>Result Image</Text>
                </View>
            </View>
            <View style={styles.bingkai}>
                {cameraData && cameraData[0] && cameraData[0].uri && (
                    <View style={styles.foto}>
                        <Image source={{ uri: cameraData[0].uri }} style={styles.img} />
                    </View>
                )}
            </View>
            <View style={styles.resultcontainer}>
                <View style={styles.result}>
                    <Text style={styles.textresul}>Nama Makanan : {Nama_Makanan}</Text>
                    <Text style={styles.textresul}>Deteksi Objek  : {Dedection}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={openCamera}>
            <View style={styles.kamera}>
                <View style={styles.bungkus1}>
                    <Image source={require('../image/camera.png')} style={styles.camera} />
                    <View>
                        <Text style={styles.tulisan2}>Kamera</Text>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container : {
        flex:1,
        paddingTop: 40,
        paddingHorizontal: 35,
        backgroundColor:'#FFFFFF',
    },
    tulisan : {
        color:'black',
        fontWeight:'bold',
        fontSize:15,
    },
    tulisan1 : {
        fontWeight:'bold',
        color:'black',
        fontSize:24,
    },
    tulisan2 : {
        fontWeight:'bold',
        color:'black',
        fontSize:24,
        marginLeft:5
    },
    bungkus : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // borderWidth:1,
        width:240,
    },
    bungkus1 : {
        marginVertical:20,
        borderWidth:2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:60,
        width:200,
        borderRadius:10,
        backgroundColor:'#FAFD5D',
    },
    bingkai : {
        borderWidth:2,
        borderColor:'black',
        backgroundColor:'#FAFD5D',
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:5,
        marginTop:25
    },
    resultcontainer:{
        backgroundColor:'#FFFFFF',
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
        
    },
    result:{
        alignItems: 'center'
    },
    textresul:{
        fontWeight:'bold',
        fontSize: 16,
        color:'black',
    },
    
    kamera:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    camera:{
        height: windowWidth * 0.10,
        width: windowWidth * 0.10,
        
    },
    txt:{
        fontWeight:'bold',
        fontSize: 20,
        marginTop : -60
    },
    img:{
        width: windowWidth * 0.8,
        height: windowHeight * 0.5,
        alignSelf:'center',
        borderRadius:10,
    }
})