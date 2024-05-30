import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const logoImg = require('../image/gambar.png')

export default function Main_page() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    console.log('Login button pressed');
  }

  return (
    <View style={styles.container}>
      <View style={styles.bungkus1}>
        <Image
          source={logoImg}
          style={{ width: 360, height: 240, }}
        />
      </View>
      <View>
        <View style={styles.bungkus2}>
          <Text style={styles.tulisan}>Welcome To KOLNUT</Text>
        </View>
        <View style={styles.bungkus3}>
          <Text style={styles.tulisan1}>
            Menggunakan AI mutakhir untuk 
            mempersonalisasi nutrisi 
            dan meminimalkan biaya bagi 
            penderita kolesterol.
          </Text>
        </View>
      </View>
      <View style={styles.bungkus7}>
        <View>
          <TouchableOpacity
            style={styles.button1}
            // title="Login"
            // color="#FAFD5D"
            onPress={() => navigation.navigate('Login')}
          >
            <View style={styles.bungkus4}>
              <Text style={styles.tulisan2}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.bungkus6}>
          <TouchableOpacity
            style={styles.button2}
            // title="Login"
            // color="#FAFD5D"
            onPress={() => navigation.navigate('Register')}
          >
            <View style={styles.bungkus5}>
              <Text style={styles.tulisan3}>
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bungkus7 : {
    // borderWidth:2,
    height:361,
    flexDirection:'column',
    justifyContent:'flex-end'
  },
  bungkus6 : {
    marginVertical:20
  },
  tulisan3 : {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
  },
  bungkus5: {
    // borderWidth:2,
    flexDirection:'row',
    alignItems:'center'
  },
  button2 : {
    fontWeight:'semibold',
    borderRadius : 20,
    backgroundColor:'#A9A9A9',
    borderWidth:2,
    padding:10,
    height:80,
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center'
  },
  tulisan2 : {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
  },
  bungkus4: {
    // borderWidth:2,
    flexDirection:'row',
    alignItems:'center'
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
  bungkus3 : {
    // borderWidth:2,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:120
  },
  tulisan1 : {
    color : '#7A7A7A',
    fontSize:15,
    fontWeight:'medium',
    width:250,
    // borderWidth:2,
    textAlign:'center',
    height:80
  },
  bungkus2: {
    // borderWidth:2,
    flexDirection:'row',
    justifyContent:'center'
  },
  bungkus1 : {
    // borderWidth:2,
    flexDirection:'row',
    justifyContent:'center',
    marginVertical:10
  },
  container : {
    paddingTop: 10,
    paddingHorizontal: 35,
  },
  tulisan : {
    color : 'black',
    fontSize:32,
    fontWeight:'bold',
    width:200,
    // borderWidth:2,
    textAlign:'center'
  },
})
