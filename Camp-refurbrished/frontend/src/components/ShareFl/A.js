import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DestinationPicker = () => {
  const [startDestination, setStartDestination] = useState('');
  const [endDestination, setEndDestination] = useState('');

  const destinations = [
    { label: 'New York', value: 'new_york' },
    { label: 'Los Angeles', value: 'los_angeles' },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Houston', value: 'houston' },
    { label: 'Miami', value: 'miami' },
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Start Destination</Text> */}
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setStartDestination(value)}
          items={destinations}
          placeholder={{ label: 'Destination Place', value: null }}
          style={{ inputAndroid: styles.input, inputIOS: styles.input }}
        />
      </View>

      {/* <Text style={styles.label}>End Destination</Text> */}
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => setEndDestination(value)}
          items={destinations}
          placeholder={{ label: 'Select End Destination', value: null }}
          style={{ inputAndroid: styles.input, inputIOS: styles.input }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: 'pink',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 20, // Custom border radius
    backgroundColor: '#fff',
    marginBottom: 20,
    overflow: 'hidden', // Ensures borderRadius is applied properly
  },
  input: {
    fontSize: 16,
    paddingVertical: 1,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: 'black'
  },
});

export default DestinationPicker;
