import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import Grid from '../../components/Grid/Grid';
import NavigationBar from '../NavigationBar/NavigationBar';
// import Iblock from '../../components/Iblock';

import {AppProvider} from '../../components/context/AppContext';

import DestinationPicker from './A';
import DestinationDropDown from './Pickers/DestinationDropDown';
import PickUpDropDown from './Pickers/PickUpDropDown';
import MonthPickerDropDown from './Pickers/MonthPickerDropDown';
import TopNavigationBar from '../NavigationBar/TopNavigationBar';


export default function ShareFl() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <Text style={styles.header}>App Name</Text> */}
        {/* <TopNavigationBar /> */}
        <AppProvider>
          <NavigationBar />
          {/* <DestinationPicker /> */}
          {/* <PickUpDropDown /> */}
          {/* <DestinationDropDown /> */}
          {/* <MonthPickerDropDown />
          <DestinationDropDown /> */}
          {/* <Grid /> */}
          
        </AppProvider>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black', 

    // Optional: Add a background color
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 20, // Space from the top
    paddingHorizontal: 10,   // Optional: Horizontal padding
  
    
    // flex: 1, // Ensure it takes the full screen height
    // flexDirection: 'column',
    // justifyContent: 'flex-start', // Stack children vertically
    // paddingHorizontal: 10,
    // paddingTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0, 
    // Space below the header
  },
});









// import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
// import React from 'react'
// import Grid from '../../components/Grid/Grid';
// import NavigationBar from '../../components/NavigationBar.js/NavigationBar';
// import Iblock from '../../components/Iblock';

// export default function ShareFl() {
//   return (
//     <View style={styles.container}>
//       <Text>shareFl</Text>
//       <NavigationBar />
//       <Grid /> 
//     </View>
//   )
// };

// const styles = StyleSheet.create({
//   container:{
//     flexDirection: 'column',
//     flex: 1
//   }
// })