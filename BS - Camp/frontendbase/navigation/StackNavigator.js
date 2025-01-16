import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileBox from '../components/Profile/ProfileBox';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

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
  const { token, setToken, loading } = useContext(AuthContext);

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
        initialRouteName='GridScreen'
        drawerContent={props => {
          const { routeNames, index } = props.state;
          const focused = routeNames[index];
          console.log('focused', focused);

          return (
            <DrawerContentScrollView  {...props}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <ProfileBox />
              </View>

              <DrawerItem
                label={'Placebid'}
                onPress={() => {
                  props.navigation.navigate('Placebid');
                }}
                // focused={focused === SCREENS.PROFILE}
                // activeBackgroundColor={COLORS.ORANGE}
                // inactiveBackgroundColor={COLORS.GRAY_LIGHT}
                // inactiveTintColor={COLORS.BLACK}
                // activeTintColor={COLORS.WHITE}
              />
               <DrawerItem
                label={'Profile'}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
                // focused={focused === SCREENS.PROFILE}
                // activeBackgroundColor={COLORS.ORANGE}
                // inactiveBackgroundColor={COLORS.GRAY_LIGHT}
                // inactiveTintColor={COLORS.BLACK}
                // activeTintColor={COLORS.WHITE}
              />
              <DrawerItem
                label={'ShareFl'}
                onPress={() => {
                  props.navigation.navigate('GridScreen');
                }}
                // focused={focused === SCREENS.PROFILE}
                // activeBackgroundColor={COLORS.ORANGE}
                // inactiveBackgroundColor={COLORS.GRAY_LIGHT}
                // inactiveTintColor={COLORS.BLACK}
                // activeTintColor={COLORS.WHITE}
              />
              {/* <DrawerItem
                label={'About'}
                onPress={() => {
                  props.navigation.navigate(SCREENS.ABOUT);
                }}
                focused={focused === SCREENS.ABOUT}
                activeBackgroundColor={COLORS.ORANGE}
                inactiveBackgroundColor={COLORS.GRAY_LIGHT}
                inactiveTintColor={COLORS.BLACK}
                activeTintColor={COLORS.WHITE}
              /> */}

            </DrawerContentScrollView>
          )
        }}
      >
        <Drawer.Screen name="Placebid" component={PlaceBid} />
        <Drawer.Screen name="GridScreen" component={ShareFl} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    )
  };

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="GridScreen"
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
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
});