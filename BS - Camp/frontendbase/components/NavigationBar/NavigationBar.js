import { View, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import React, { useState, useContext } from 'react';
import { Picker } from '@react-native-picker/picker'; // Install this package if not installed: npm install @react-native-picker/picker
import { useNavigation } from '@react-navigation/native';

import { AppContext } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';
import DestinationDropDown from '../ShareFl/Pickers/DestinationDropDown';
import MonthPickerDropDown from '../ShareFl/Pickers/MonthPickerDropDown';
import PickUpDropDown from '../ShareFl/Pickers/PickUpDropDown';
import Newdropdown from '../ShareFl/Pickers/Newdropdown';

export default function NavigationBar() {
  const { selectedMonth, setSelectedMonth } = useContext(AppContext);
  // const [selectedMonth, setSelectedMonth] = useState("");
  const navigation = useNavigation();
  const {setToken, setUserId, setAuthUser} = useContext(AuthContext);
  
  const [destinationType, setDestinationType] = useState("airport");
  
  // Generate next 3 months dynamically
  const currentMonth = new Date().getMonth(); // 0-based index for months
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 3 }, (_, i) => {
    const month = (currentMonth + i) % 12;
    const year = currentYear + Math.floor((currentMonth + i) / 12);
    return { label: `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`, value: `${year}-${String(month + 1).padStart(2, '0')}` };
  });

  const handleSearch = () => {
    Alert.alert(`Destination Type: ${destinationType}, Month: ${selectedMonth}`);
  };

  const handleLogOut = async() => {
      try{
        await AsyncStorage.removeItem('authToken');
        setToken('');
        setAuthUser('');
        setUserId('');
        navigation.replace('Login');
      } catch(error) {
        console.log("error logging out bro", error);
      }
  }

  return (
    <View style={styles.container}>
      {/* <Button title='Logout' onPress={handleLogOut} /> */}
      <PickUpDropDown />
      <DestinationDropDown />
      {/* <Newdropdown /> */}

      <View style={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
        <View style={styles.monthpick}>
           <MonthPickerDropDown />
        </View>
        {/* <View  style={styles.bidbutton}>
           <Button title='Place Bid' onPress= {() => navigation.navigate("Placebid")}/>
      </View> */}
       <TouchableOpacity style={styles.roundButton} onPress={() => navigation.navigate("Placebid")}>
        <Text style={styles.buttonText}> Place {`\n`} a bid</Text>
      </TouchableOpacity>
      </View>

      




      
      {/* <Picker
        selectedValue={destinationType}
        style={styles.picker}
        onValueChange={(itemValue) => setDestinationType(itemValue)}
      >
        <Picker.Item label="Ai" value="airport" />
        <Picker.Item label="Rai" value="railway" />
      </Picker> */}






      {/* <Picker
        selectedValue={selectedMonth}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedMonth(itemValue=="2024-12"?"12":itemValue=="2025-01"?"01":"02")}
      >
        <Picker.Item label="Select Month" value="" />
        {months.map((month) => (
          <Picker.Item key={month.value} label={month.label} value={month.value} />
        ))}
      </Picker> */}

      {/* <Button title="Search" onPress={handleSearch} /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  monthpick: {
    width: 200,
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});


// container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   padding: 10,
  //   backgroundColor: "#f8f9fa",
  //   elevation: 3,
  // },
  // picker: {
  //   flex: 1,
  //   marginHorizontal: 5,
  //   backgroundColor: "#fff",
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   borderRadius: 5,
  // },













// import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
// import React, {useState} from 'react'

// export default function NavigationBar() {
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState("");

//   const handleGo = () => {
//     alert(`Destination: ${destination}, Date: ${date}`);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Destination"
//         value={destination}
//         onChangeText={setDestination}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Date (YYYY-MM-DD)"
//         value={date}
//         onChangeText={setDate}
//       />
//       <Button title="Go" onPress={handleGo} />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 10,
//     backgroundColor: "#f8f9fa",
//     elevation: 3,
//   },
//   input: {
//     flex: 1,
//     marginHorizontal: 5,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     backgroundColor: "#fff",
//   },
// });