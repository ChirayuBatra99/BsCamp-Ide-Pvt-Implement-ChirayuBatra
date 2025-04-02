import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../Context/AuthContext';

import DestinationPicker from './DestinationPicker';
import TimeRangeDropDown from './TimeRangeDropDown';

const PlaceBid = () => {
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState('');
  const [destination, setDestination] = useState('');
  const { userId } = useContext(AuthContext);
  const baseURL = 'http://10.0.2.2:8005';

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}-${i + 1}`); // Generate time ranges: 0-1, 1-2, etc.

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSubmit = async () => {
    console.log(timeRange, ",");
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

      <View style={styles.dateContainer3}>
        <Text style={styles.label}>Select a Day:</Text>
        <TouchableOpacity
          styles={{ marginRight: 30, marginLeft: 20, backgroundColor: 'green' }}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {selectedDate.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>

      </View>


      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.dateContainer1}>
        <Text style={styles.label}>Time Range:</Text>
        <TimeRangeDropDown onTimeChange={setTimeRange} />
      </View>

      {/* Destination Input */}
      <View style={styles.dateContainer1}>
        <Text style={styles.label}>Destination:</Text>
        <DestinationPicker onDestinationChange={setDestination} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit Bid" onPress={handleSubmit} color="#007bff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    backgroundColor: 'black',
    flex: 1,
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
    color: 'white',
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
    color: 'white',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 15,
  },
  dateText: {
    color: 'white',
    borderWidth: 3,
    borderColor: 'white',
    height: 45,
    width: 115,
    borderRadius: 9
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '10%',
    marginRight: '20%',
    alignItems: 'center'
  },
  dateContainer3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '20%',
    alignItems: 'center',

  }
});

export default PlaceBid;
