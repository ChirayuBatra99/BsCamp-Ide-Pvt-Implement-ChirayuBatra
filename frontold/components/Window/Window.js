import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Window({ hour, date, destination, month, year }) {
  const month1 = String(month).padStart(2, "0");

  const date1 = String(date).padStart(2, "0");

  const [hours] = hour.split(":").map(Number);
  const nextHour = (hours + 1) % 24;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedNextHour = String(nextHour).padStart(2, "0");
  const time = formattedHours + formattedNextHour;

  const day = year + "-" + month1 + "-" + date1;
  // const day = date;
  const baseURL = 'http://10.0.2.2:8005'
  const [bids, setBids] = useState(0);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {

        const queryParams = new URLSearchParams({
          time,
          day,
          destination,
        }).toString();

        const res = await fetch(`${baseURL}/bidemojis?${queryParams}`, {
          method: "GET",
        });

        const data = await res.json();
        setBids(data[0]["COUNT(user)"]);
        Alert.alert('Error', 'error in catch block 1,' + error.message);

      } catch (error) {
        // console.log('Error fetching data:', error.message);

      }
    };

    fetchData();
  }, [hour, date, day]);

  const handlePress = () => {
    // navigation.navigate("People", { day }); // Navigate to the People screen with the `day` prop
  };

  return (
    <TouchableOpacity style={styles.box} onPress={handlePress}>
      <Text>{bids ? bids + " guy" : ''}</Text>
      {/* <Text>{day}</Text> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    height: 48,
    width: 48,
    backgroundColor: 'yellow'
  }
})