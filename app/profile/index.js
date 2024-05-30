import React, {useEffect,useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions,ScrollView, FlatList, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

export default function Profile() {
  const [ambilDataProfile, setAmbilDataProfile] = useState([]);
  const [dataPribadi,setDataPribadi]=useState({});
  const navigation = useNavigation();

useEffect(()=>{
},[dataPribadi.token])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios(`${baseUrl.url}/datauser`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: "GET"
        });
        setAmbilDataProfile(response.data["data"]);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dataPribadi.token]);

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${baseUrl.url}/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
          console.log(response.data);
      }
    } catch (error) {
    } finally {
      await AsyncStorage.removeItem('token'); 
      navigation.navigate('Login'); 
    }
  };

  const handleLogout = () => {
    logout();
    Alert.alert('Logout Success');
  };

  return (
    <>
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.tulisan}>Account</Text>
        </View>
        <View style={styles.bungkus}>
          <View>
            {ambilDataProfile && (
              <View style={styles.gambar}>
                <Image
                  source={require('../image/profile.png')}
                  resizeMode="cover"
                  style={{ width: 34, height: 34 }}
                />
              </View>
            )}
          </View>
          <View style={styles.bungkus1}>
            <View>
              <Text style={styles.tulisan2}>{ambilDataProfile.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bungkus2}>
          <TouchableOpacity
            style={styles.bungkus3}
            onPress={handleLogout}>
              <Text Text style={styles.tulisan1}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#ffffff',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  bungkus : {
    marginTop:20,
    flexDirection:'row',
    alignItems:'center'
  },
  bungkus1 : {
    marginHorizontal:10,
    flexDirection:'row',
    alignItems:'center',
    fontWeight:'bold',
    color:'black',
    fontSize:10
  },
  bungkus2 : {
    flexDirection:'row',
    alignItems:'center',
    fontWeight:'bold',
    color:'black',
    fontSize:10,
    height:50,
  },
  bungkus3 : {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:40,
    borderRadius:30,
    backgroundColor:'#F23936',
    height:30,
    width:90
  },
  tulisan : {
    fontWeight:'bold',
    color:'black',
    fontSize:25,
  },
  tulisan1 : {
    fontWeight:'bold',
    color:'white',
    fontSize:15,
  },
  tulisan2 : {
    fontWeight:'bold',
    color:'#000000',
    fontSize:20,
  },
})