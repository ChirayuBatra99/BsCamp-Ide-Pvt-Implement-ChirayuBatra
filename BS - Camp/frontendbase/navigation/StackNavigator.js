import { StyleSheet, Text, View, ActivityIndicator, Image, Button } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileBox from '../components/Profile/ProfileBox';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Video from 'react-native-video';


import ShareFl from '../components/ShareFl/ShareFl'
import Login from '../components/LoginSignup/Login';
import Signup from '../components/LoginSignup/Signup';

// import People from '../components/PeopleComponent/People';
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
        // drawerActiveTintColor: 'yellow',
        // drawerActiveBackgroundColor: 'blue', 
        drawerStyle: {
          width: '60%',
          backgroundColor: 'black',

        } ,
        
      }}
        // style={styles.drawerWidth}
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
                  // backgroundColor: '#9dd3c8',
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
                activeTintColor='black' // text color
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
               
                // focused={focused === SCREENS.PROFILE}
                // drawerActiveTintColor= {'yellow'},
                focused={focused==='Placebid'}
                inactiveBackgroundColor='black'
                activeBackgroundColor='white'
                inactiveTintColor='yellow'
                activeTintColor='black' // text color
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
                activeTintColor='black' // text color

              />
              

               <DrawerItem
                label={'Logout'}
                onPress={() => {
                  props.navigation.navigate('GridScreen');
                  // focused='GridScreen'
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
                  // backgroundColor: '#9dd3c8',
                  borderColor: 'white',
                  borderWidth: 2,
                  opacity: 1,
                  width: '100%',
                  marginBottom: 5,
                  // flex:1,
                }}
                // focused={focused==='GridScreen'}
                inactiveBackgroundColor='black'
                activeBackgroundColor='white'
                inactiveTintColor='yellow'
                activeTintColor='black' // text color
              />

            </DrawerContentScrollView>
          )
        }}
      >
                                                                          
        <Drawer.Screen name="GridScreen" component={ShareFl} options={{title: 'Bscmap',
          headerRight: () => (
            <Button 
              onPress={() => alert('Button Pressed!')} 
              title="Messages" 
              color="blue" 
            />
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
      // <View style={styles.loadingContainer}>
      //   <ActivityIndicator size="large" color="#0000ff" />
      //   <Text>Loading...</Text>
      // </View>
      <View style={styles.container}>
      {/* <Video
          source={require('../svgs/figma12.mp4')} // Your video file in assets
          style={styles.backgroundVideo}
          // resizeMode="cover"
          // onEnd={() => navigation.replace('HomeScreen')} // Auto-navigate on video end
          repeat={true} // Set true if you want a loop
      /> */}
        <View style={styles.overlayContainer2}>
              <Image
                    source={require('../svgs/v.png')} // Replace with your image file
                    style={styles.image2}
              />
        </View>
      <View style={styles.overlayContainer}>
                <Image
                    source={require('../svgs/texi.png')} // Replace with your image file
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
  bottom: 50, // Adjust to position the image correctly
  alignItems: 'center',
},
overlayContainer2: {
  alignItems: 'center',
  top: 110
},
image: {
  width: 400,  // Adjust as needed
  height: 400, // Adjust as needed
  resizeMode: 'contain',
},
image2: {
  width: 300,  // Adjust as needed
  height: 300, // Adjust as needed
  resizeMode: 'contain',
},
});