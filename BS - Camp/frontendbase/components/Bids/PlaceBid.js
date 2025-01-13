import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../AuthContext';

const PlaceBid = () => {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {userId} = useContext(AuthContext);

  const [timeRange, setTimeRange] = useState('');
  const [destination, setDestination] = useState('');
  const baseURL = 'http://10.0.2.2:8005'

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}-${i + 1}`); // Generate time ranges: 0-1, 1-2, etc.

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSubmit = async () => {
    const formattedTimeRange = timeRange
      .split('-')
      .map((time) => time.padStart(2, '0'))
      .join('');

    console.log({
      email,
      selectedDate: selectedDate.toISOString().split('T')[0],
      timeRange: formattedTimeRange,
      destination,
    });

    try {
      const res = await fetch(`${baseURL}/placebid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          selectedDate: selectedDate.toISOString().split('T')[0],
          timeRange: formattedTimeRange,
          destination,
          userId
        }),
      });
      const data = await res.json();

      if (res.status === 422 || !data) {
        Alert.alert('Error', 'Some error occurred');
      } else {
        Alert.alert('Success', 'Bid placed successfully');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>B Page</Text>

      {/* Email Input */}
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Date Picker */}
      <Text style={styles.label}>Select a Day:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          {selectedDate.toISOString().split('T')[0]}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {/* {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter date"
          value={selectedDate.toISOString().split('T')[0]}
          editable={false}
        />
      )} */}

      {/* Time Range Picker */}
      <Text style={styles.label}>Time Range:</Text>
      <Picker
        selectedValue={timeRange}
        style={styles.picker}
        onValueChange={(itemValue) => setTimeRange(itemValue)}
      >
        <Picker.Item label="Select a time range" value="" />
        {timeSlots.map((slot) => (
          <Picker.Item key={slot} label={slot} value={slot} />
        ))}
      </Picker>

      {/* Destination Input */}
      <Text style={styles.label}>Destination:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title="Submit Bid" onPress={handleSubmit} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    // flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
});

export default PlaceBid;
