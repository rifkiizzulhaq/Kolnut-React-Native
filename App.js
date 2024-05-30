import { StyleSheet, Text, View,Image } from 'react-native'
// import React from 'react'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Dashboard, Login, Main_page, Profile, Register, Scan } from './app/route';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOption = {
  headerStyle: {
    backgroundColor: '#0B111F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

function Main(){
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      // headerShown: true,
      tabBarStyle: {
        // height: 90,
        // paddingHorizontal: 5,
        paddingTop: 0,
        // backgroundColor: '#80C30C',
        height:60,
        borderTopWidth:1,
        position: 'absolute',
        borderTopColor: '#D9D9D9', // Menambahkan border tebal bagian atas
      },
    })}
    >
    <Tab.Screen
    name="Dashboard"
    component={Dashboard}
    options={{
      ...headerOption,
      headerShown : false,
      HeaderCustome: (props) => <headerTitle {...props} />, 
      // title: "Pemberitaahuan",
      tabBarIcon: ({ color }) => (
        <Image source={require('./app/image/home.png')} style={{ width: 30, height: 30, tintColor: color }} />
      )
    }}
  />
    <Tab.Screen
    name="Profile"
    component={Profile}
    options={{
      ...headerOption,
      headerShown : false,
      HeaderCustome: (props) => <headerTitle {...props} />, 
      // title: "Pemberitaahuan",
      tabBarIcon: ({ color }) => (
        <Image source={require('./app/image/user.png')} style={{ width: 30, height: 30, tintColor: color }} />
      )
    }}
  />
  </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Main_page"
        component={Main_page}
        options={{
          // ...headerOption,
          headerShown : false,
          headerCustom:(props) => <hedarTitle {...props }/>,
          title:"MainPage",
        }}
        />
      {/* <Stack.Screen 
        name="Dashboard"
        component={Dashboard}
        options={{
          // ...headerOption,
          headerShown : false,
          headerCustom:(props) => <hedarTitle {...props }/>,
          // title:"Halaman Login",
        }}
        /> */}
      <Stack.Screen 
        name="Scan"
        component={Scan}
        options={{
          // ...headerOption,
          headerShown : false,
          headerCustom:(props) => <hedarTitle {...props }/>,
          // title:"Halaman Login",
        }}
        />
      <Stack.Screen 
        name="Register"
        component={Register}
        options={{
          // ...headerOption,
          headerShown : false,
          headerCustom:(props) => <hedarTitle {...props }/>,
          title:"Daftar",
        }}
        />
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{
          // ...headerOption,
          headerShown : false,
          headerCustom:(props) => <hedarTitle {...props }/>,
          // title:"Halaman Login",
        }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default App

