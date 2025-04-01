import { StyleSheet, Text, View, ActivityIndicator, Image, Button } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileBox from '../components/Profile/ProfileBox';
import { NavigationContainer } from '@react-navigation/native';

import AllMessagesButton from '../components/Buttons/AllMessagesButton';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Video from 'react-native-video';


import ShareFl from '../components/ShareFl/ShareFl'
import Login from '../components/LoginSignup/Login';
import Signup from '../components/LoginSignup/Signup';

import Grid from '../components/Grid/Grid';
import People from '../components/PeopleComponent/People';
import PlaceBid from '../components/Bids/PlaceBid';
import ChatRoom from '../components/Chating/ChatRoom';
import Profile from '../components/Profile/Profile';

const Drawer = createDrawerNavigator();

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const { token, setToken, loading, setAuthUser, setUserId } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
    };
    fetchUser();
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  };

  const ScreenWithDrawer = () => {
    return (
      <Drawer.Navigator
      screenOptions={{ 
        drawerStyle: {
          width: '60%',
          backgroundColor: 'black',
        } ,        
      }}
        initialRouteName='GridScreen'
        drawerContent={props => {
          const { routeNames, index } = props.state;
          let focused = routeNames[index];
          console.log('focused', focused);

          return (
            <DrawerContentScrollView  {...props}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <ProfileBox />
              </View>

              <DrawerItem
                label={'ShareFl'}
                onPress={() => {
                  props.navigation.navigate('GridScreen');
                  focused='GridScreen'
                }}
                style={{
                  borderColor: 'white',
                  borderWidth: 2,
                  opacity: 1,
                  width: '100%',
                  marginBottom: 5,
                }}
                focused={focused==='GridScreen'}
                inactiveBackgroundColor='black'
                activeBackgroundColor='white'
                inactiveTintColor='yellow'
                activeTintColor='black'
              />
              
              <DrawerItem
                label={'Placebid'}
                onPress={() => {
                  props.navigation.navigate('Placebid');
                  focused = 'Placebid'
                }}
                style={{
                  // backgroundColor: '#9dd3c8',
                  borderColor: 'white',
                  borderWidth: 2,
                  opacity: 1,
                  width: '100%',
                  marginBottom: 5,
                  justifyContent: 'center'
                }}
               
                focused={focused==='Placebid'}
                inactiveBackgroundColor='black'
                activeBackgroundColor='white'
                inactiveTintColor='yellow'
                activeTintColor='black' 
              />
               <DrawerItem
                label={'Profile'}
                onPress={() => {
                  props.navigation.navigate('Profile');
                  focused='Profile'
                }}
                style={{
                  // backgroundColor: '#9dd3c8',
                  borderColor: 'white',
                  borderWidth: 2,
                  opacity: 1,
                  width: '100%',
                  marginBottom: 5
                }}
                focused={focused==='Profile'}
                inactiveBackgroundColor='black'
                activeBackgroundColor='white'
                inactiveTintColor='yellow'
                activeTintColor='black' 
              />
              
               <DrawerItem
                label={'Logout'}
                onPress={() => {
                  props.navigation.navigate('GridScreen');
                  try{
                    AsyncStorage.removeItem('authToken');
                    setToken('');
                    setAuthUser('');
                    setUserId('');
                    navigation.replace('Login');
                  } catch(error) {
                    console.log("error logging out bro", error);
                  }
                }}
                style={{
                  borderColor: 'white',
                  borderWidth: 2,
                  opacity: 1,
                  width: '100%',
                  marginBottom: 5,
                }}
                inactiveBackgroundColor='black'
                activeBackgroundColor='white'
                inactiveTintColor='yellow'
                activeTintColor='black' 
              />

            </DrawerContentScrollView>
          )
        }}
      >
                                                                          
        <Drawer.Screen name="GridScreen" component={ShareFl} options={{title: 'Find Travellers',
          headerRight: () => (
            <AllMessagesButton />
          ),
        }} />
        <Drawer.Screen name="Placebid" component={PlaceBid} options={{ title: 'Place B' }} />    
                                                                                           {/* Bid for c*b share and dont keep this in same line of code, causes error*/}
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Login" component={Login} options={{ title: 'Login' }} /> 


      </Drawer.Navigator>
    )
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={ScreenWithDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="People"
          component={People}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Placebid"
          component={ScreenWithDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    )
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.overlayContainer2}>
              <Image
                    source={require('../svgs/v.png')}
                    style={styles.image2}
              />
        </View>
      <View style={styles.overlayContainer}>
                <Image
                    source={require('../svgs/texi.png')} 
                    style={styles.image}
                />
      </View>
  </View>
    )
  }

  return (
    <NavigationContainer>
      {token == null || token == '' ? <AuthStack /> : <MainStack />}
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
  drawerWidth: {
    width: 30,
    color: 'green'
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
},
backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    marginTop: -165
},
overlayContainer: {
  position: 'absolute',
  bottom: 50,
  alignItems: 'center',
},
overlayContainer2: {
  alignItems: 'center',
  top: 110
},
image: {
  width: 400, 
  height: 400,
  resizeMode: 'contain',
},
image2: {
  width: 300,  
  height: 300, 
  resizeMode: 'contain',
},
});