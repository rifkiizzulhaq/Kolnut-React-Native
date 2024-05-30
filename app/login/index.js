import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../baseUrl';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (value === '') {
            setError('Password Tidak Boleh Kosong');
        } else {
            setError('');
        }
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        if (value === '') {
            setError('Email Tidak Boleh Kosong');
        } else {
            setError('');
        }
    };

    const handleLoginPress = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post(
                `${baseUrl.url}/login`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.data);

            if (response.data.success) {
                await AsyncStorage.setItem('token', response.data.data.token);
                setEmail('');
                setPassword('');
                navigation.navigate('Main');
                console.log(response.data);
            } else {
                setError('Username/Password Salah !');
            }
        } catch (error) {
            console.log('Username/Password Salah !');
            setError('Username/Password Salah !');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <View style={styles.container}>
                <View>
                    <View style={styles.bungkus}>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Main_page')}
                            >
                                <View style={styles.text1}>
                                    <Image
                                        style={{ width: '10%', height: '40%' }}
                                        source={require('../image/right-arrows.png')}
                                        resizeMode='cover'
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.text2}>
                            <View>
                                <Text style={styles.tulisan}>Let's Sign You In.</Text>
                            </View>
                            <View>
                                <Text style={styles.tulisan1}>Welcome Back</Text>
                            </View>
                            <View>
                                <Text style={styles.tulisan1}>You've been missed!</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bungkus2}>
                        <View style={styles.form1}>
                            <View>
                                <Text style={styles.tulisan2}>Email</Text>
                                <TextInput
                                    style={styles.form}
                                    placeholder='Masukan Email'
                                    placeholderTextColor="grey"
                                    value={email}
                                    color="black"
                                    onChangeText={handleEmailChange}
                                />
                            </View>
                            <View>
                                <Text style={styles.tulisan2}>Password</Text>
                                <View style={{ position: 'relative' }}>
                                    <TextInput
                                        style={styles.form}
                                        placeholder='Masukan Password'
                                        placeholderTextColor="grey"
                                        value={password}
                                        color="black"
                                        onChangeText={handlePasswordChange}
                                        secureTextEntry={showPassword}
                                    />
                                    <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                                        <Image
                                            source={showPassword ? require('../image/hide.png') : require('../image/view.png')}
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bungkus3}>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <View>
                            <View style={styles.bungkus4}>
                                <Text style={styles.tulisan4}>Belum punya akun ?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                    <Text style={styles.tulisan5}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.button1}
                                onPress={handleLoginPress}
                            >
                                <View style={styles.bungkus6}>
                                    <Text style={styles.tulisan3}>Login</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        height: '100px',
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 35,
    },
    eyeIcon: {
        position: 'absolute',
        right: 25,
        top: 20
    },
    bungkus: {
        borderRadius: 10,
        borderColor: 'red',
        height: 265,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    text1: {
        borderRadius: 10,
        borderColor: 'red',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    text2: {
        borderRadius: 10,
        borderColor: 'red',
        height: 160,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    tulisan: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 26,
    },
    tulisan1: {
        fontWeight: 'semibold',
        color: '#7A7A7A',
        fontSize: 26
    },
    tulisan2: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 14
    },
    form: {
        borderRadius: 20,
        borderColor: '#7A7A7A',
        borderWidth: 1,
        padding: 10,
        paddingVertical: 15
    },
    form1: {
        borderRadius: 20,
        borderColor: '#7A7A7A',
        height: 180,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    bungkus2: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 280
    },
    bungkus3: {
        borderRadius: 20,
        borderColor: '#7A7A7A',
        height: 255,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    button1: {
        borderRadius: 20,
        backgroundColor: '#FAFD5D',
        borderWidth: 2,
        padding: 10,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    tulisan3: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 26,
    },
    bungkus4: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    tulisan4: {
        fontWeight: 'medium',
        color: 'black',
        fontSize: 15,
    },
    tulisan5: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
        marginHorizontal: 5
    },
    bungkus6: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    }
});
