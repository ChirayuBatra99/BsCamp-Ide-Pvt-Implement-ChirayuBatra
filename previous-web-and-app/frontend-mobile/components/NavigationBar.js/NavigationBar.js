import { View, StyleSheet, Button, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { Picker } from '@react-native-picker/picker'; // Install this package if not installed: npm install @react-native-picker/picker

import { AppContext } from '../context/AppContext';

export default function NavigationBar() {
  const { selectedMonth, setSelectedMonth } = useContext(AppContext);
  // const [selectedMonth, setSelectedMonth] = useState("");

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

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={destinationType}
        style={styles.picker}
        onValueChange={(itemValue) => setDestinationType(itemValue)}
      >
        <Picker.Item label="Ai" value="airport" />
        <Picker.Item label="Rai" value="railway" />
      </Picker>

      <Picker
        selectedValue={selectedMonth}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedMonth(itemValue=="2024-12"?"12":itemValue=="2025-01"?"01":"02")}
      >
        <Picker.Item label="Select Month" value="" />
        {months.map((month) => (
          <Picker.Item key={month.value} label={month.label} value={month.value} />
        ))}
      </Picker>

      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f8f9fa",
    elevation: 3,
  },
  picker: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});














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