import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../baseUrl';

export default function Register() {
  
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    // nohp: '',
    email: '',
    password: '',
    role_id: '2', 
    // code:'',
  });

  // const [showMessage, setShowMessage] = useState(null);
  const [isSuccessSend, setIsSuccessSend] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countingDown, setCountingDown] = useState(false);

  const [showMessage, setShowMessage] = useState(null);

  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  const register = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name) {
      setShowMessage('Masukkan Nama');
      return;
    } else if (!form.email || !emailRegex.test(form.email)) {
      setShowMessage('Masukkan Email Yang Valid');
      return;
    } else if (!form.password) {
      setShowMessage('Masukkan Password');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl.url}/register`, form);
      if (response.data.success) {
        setShowMessage('Registrasi berhasil');
        console.log(response.data);
        alert('Anda Berhasil Daftar');
        navigation.navigate('Login');
      }else{
        setShowMessage('Kesalahan Kode Verifikasi');
      }
    } catch (error) {
      setShowMessage(error.response.data.message || 'Terjadi kesalahan');
    }
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
                  style={{ width:'10%', height:'40%' }}
                  source={require('../image/right-arrows.png')}
                  resizeMode='cover'
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.text2}>
            <View>
              <Text style={styles.tulisan}>Let’s Register You're Account.</Text>
            </View>
          </View>
        </View>
        <View style={styles.bungkus2}>
          <View style={styles.form1}>
            <View>
              <Text style={styles.tulisan2}>Nama</Text>
              <TextInput
                style={styles.form}
                value={form.name}
                placeholder='Masukkan Nama'
                placeholderTextColor="grey"
                onChangeText={(text) => handleInputChange('name', text)}
                color="black"
              />
            </View>
            <View>
              <Text style={styles.tulisan2}>Email</Text>
              <TextInput
                style={styles.form}
                placeholder='Masukkan Email'
                value={form.email}
                placeholderTextColor="grey"
                onChangeText={(text) => handleInputChange('email', text)}
                color="black"
              />
            </View>
            <View>
              <Text style={styles.tulisan2}>Kata Sandi</Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={styles.form}
                  placeholder='Masukkan Kata Sandi'
                  placeholderTextColor="grey"
                  color="black"
                  value={form.password}
                  onChangeText={(text) => handleInputChange('password', text)}
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
          <View>
            <View>
              <View>
                {showMessage && <Text style={styles.errorText}>{showMessage}</Text>}
              </View>
              <View style={styles.bungkus4}>
                <>
                  <Text style={styles.tulisan4}>Sudah punya akun ?</Text>
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}
                    >
                      <Text style={styles.tulisan5}>Login</Text>
                    </TouchableOpacity>
                  </View>
                </>
              </View>
              <TouchableOpacity
                style={styles.button1}
                onPress={register}
              >
                <View style={styles.bungkus6}>
                  <Text style={styles.tulisan3}>
                    Register
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : '#ffff',
    height:'100px',
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 35,
    // fontFamily:
  },
  eyeIcon: {
    position: 'absolute',
    right: 25,
    top: 20
  },
  errorText : {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10
  },
  bungkus : {
      borderRadius : 10,
      borderColor:'red',
      // borderWidth: 1,
      height : 170,
      flexDirection:'column',
      justifyContent:'space-between'
  },
  text1 : {
      borderRadius : 10,
      borderColor:'red',
      // borderWidth: 1,
      // paddingTop:10
      flexDirection:'row',
      height:40,
      alignItems:'center'
      // height : 300
  },
  text2 : {
      borderRadius : 10,
      borderColor:'red',
      // borderWidth: 1,
      height : 100,
      flexDirection:'column',
      justifyContent:'flex-end'
  },
  tulisan : {
      fontWeight: 'bold',
      color: 'black',
      fontSize: 26,
  },
  tulisan1 : {
      fontWeight:'semibold',
      color:'#7A7A7A',
      fontSize:26
  },
  tulisan2 : {
      fontWeight:'bold',
      color:'black',
      fontSize:14
  },
  form : {
      borderRadius : 20,
      borderColor:'#7A7A7A',
      borderWidth: 1,
      padding:10,
      paddingVertical:15,
      
  },
  form1 : {
      borderRadius : 20,
      borderColor:'#7A7A7A',
      // borderWidth: 1,
      height:280,
      flexDirection:'column',
      justifyContent:'space-between'
  },
  bungkus2 : {
      flexDirection:'column',
      justifyContent:'center',
      // borderWidth:2,
      height:370
  },
  bungkus3 : {
      borderRadius : 20,
      borderColor:'#7A7A7A',
      // borderWidth: 1,
      height:260,
      flexDirection:'column',
      justifyContent:'flex-end'
  },
  button1 : {
      // color:'black',
      borderRadius : 20,
      backgroundColor:'#FAFD5D',
      borderWidth:2,
      padding:10,
      height:80,
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center'
  },
  tulisan3 : {
      fontWeight: 'bold',
      color: 'black',
      fontSize: 26,
  },
  bungkus4: {
      flexDirection:'row',
      justifyContent:'center',
      marginBottom:10
  },
  tulisan4 : {
      fontWeight: 'medium',
      color: 'black',
      fontSize: 15,
  },
  tulisan5 : {
      fontWeight: 'bold',
      color: 'black',
      fontSize: 15,
      marginHorizontal:5
  },
  bungkus6: {
      // borderWidth:2,
      flexDirection:'row',
      alignItems:'center'
  }
  
  // regisakun:{
  //   marginBottom:20
  // },
  // flexheader:{
  //   flex: 1, alignItems: 'center', justifyContent: 'center' 
  // },
  // img:{
  //   width: 150, height: 150
  // },
  // akun:{
  //   marginTop:12 , color:(255, 255, 255, 0.5), 
  // },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // daftar:{
  //   fontWeight:'bold',
  //   fontSize:20,
  //   color:'black',
  //   marginBottom:10,
  //   textAlign:'center'
  // },
  // form: {
  //   width: 300,
  //   padding: 20,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  // },
  // input: {
  //   height: 40,
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // },
  // form2: {
  //   backgroundColor:'black',
  //   color:'white'
  // },

});
