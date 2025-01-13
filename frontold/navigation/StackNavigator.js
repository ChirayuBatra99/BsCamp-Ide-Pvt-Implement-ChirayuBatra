import { StyleSheet, Text, View } from 'react-native';
import React, {useContext, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';

import ShareFl from '../components/ShareFl/ShareFl'
import Login from '../components/LoginSignup/Login';
import Signup from '../components/LoginSignup/Signup';

// import People from '../components/PeopleComponent/People';
import Grid from '../components/Grid/Grid';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
    };
    fetchUser(); 
  }, [] );

  const AuthStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen 
            name= "Login"
            component= {Login}
            options= {{headerShown: false}}
        />
        <Stack.Screen 
            name= "Register"
            component= {Signup}
            options= {{headerShown: false}}
        />
      </Stack.Navigator>
    )
  };

  function MainStack() {
    return(
      <Stack.Navigator>
          <Stack.Screen
            name="GridScreen"
            component={ShareFl}
            options={{headerShown: false}}
          />
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      {token == null || token == '' ? <AuthStack/> : <MainStack/>} 
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})