import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {firebase} from './config';

import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Header from './components/Header';
import { useFonts } from 'expo-font';


const Stack = createStackNavigator();

function App(){

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  const [initalizing,setInitalizing] = useState(true);
  const [user,setUser] = useState();

  //handle user state changes

  function onAuthStateChanged(user){
    setUser(user);
    if(initalizing) setInitalizing(false);

  }

  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  if(initalizing) return null;

  if(!user){
    return(
      <Stack.Navigator>
        <Stack.Screen name="Login" 
        component={Login} 
        options={{
          headerTitle:() => <Header />,
          headerStyle:{
            height:50,
            borderBottomLeftRadius : 4,
            borderBottomRightRadius:4,
            backgroundColor:'#fff',
            shadowColor:'#000',
            elevation:0
          }
        }}
        />
        <Stack.Screen name="Registration" 
        component={Registration} 
        options={{
          headerTitle:() => <Header />,
          headerStyle:{
            height:80,
            borderBottomLeftRadius : 4,
            borderBottomRightRadius:4,
            backgroundColor:'#fff',
            shadowColor:'#000',
            elevation:0
          }
        }
        
      }
        
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" 
        component={Dashboard} 
        options={{
          headerTitle:() => <Header />,
          headerStyle:{
            height:80,
            borderBottomLeftRadius : 4,
            borderBottomRightRadius:4,
            backgroundColor:'#fff',
            shadowColor:'#000',
            elevation:0
          }
        }}
        />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
    <App />
    </NavigationContainer>
  )
}