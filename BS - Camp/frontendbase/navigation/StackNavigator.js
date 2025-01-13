import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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
import People from '../components/PeopleComponent/People';
import PlaceBid from '../components/Bids/PlaceBid';
import ChatRoom from '../components/Chating/ChatRoom';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const {token, setToken, loading} = useContext(AuthContext);

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
          <Stack.Screen
              name="People"
              component={People}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="Placebid"
              component={PlaceBid}
              options={{headerShown: false}}
          />
          <Stack.Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{headerShown: false}}
          />
      </Stack.Navigator>
    )
  }
  if(loading){
    return(
      <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
    )
  }

  return (
    <NavigationContainer>
      {token == null || token == '' ? <AuthStack/> : <MainStack/>} 
      {/* <MainStack /> */}
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});