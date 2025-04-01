import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Line } from 'react-native-svg';

const Grid = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const markedDates = {
    [selectedDate.toISOString().split('T')[0]]: {
      selected: true,
    },
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={({ date }) => setSelectedDate(date)}
      />

      <ScrollView horizontal>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((time) => (
            <View key={time} style={styles.timeSlot}>
              <Text style={styles.timeSlotText}>{time}:00</Text>
              <Line
                x1="0"
                y1="0"
                x2="0"
                y2="50"
                stroke="#ccc"
                strokeWidth="1"
              />
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* <ScrollView>
        <View style={styles.gridContainer}>
          {Array.from({ length: 7 }, (_, i) => i).map((day) => (
            <View key={day} style={styles.gridColumn}>
              {timeSlots.map((time) => (
                <View key={time} style={styles.gridCell}>
                  <Text style={styles.gridCellText}>
                    {day + 1}/{time}:00
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    height: 50,
  },
  timeSlot: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 12,
  },
  gridContainer: {
    flexDirection: 'row',
  },
  gridColumn: {
    width: 50,
  },
  gridCell: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  gridCellText: {
    fontSize: 12,
  },
});

export default Grid;