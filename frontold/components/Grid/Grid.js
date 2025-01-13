import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Line } from 'react-native';
import Window from '../Window/Window';

import { AppContext } from '../context/AppContext';

const Grid = () => {
  const timeSlots = Array.from({ length: 30 }, (_, i) => i + 1); // 1 to 30
  const hours = Array.from({ length: 24 }, (_, i) => `${i }:00`); // 1:00 to 24:00

  const { selectedMonth } = useContext(AppContext);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ flexDirection: 'row', paddingTop: 50 }}
    >

      {/* Main Grid */}
      <ScrollView vertical   >
        <View style={styles.gridContainer}>
          <View style={styles.datesabove}>
              {timeSlots.map((e, key) => (
                  <Text key={key} style={styles.hourLabelsContainer}>{e}</Text>
              ))}
          </View>
          {hours.map((hour, rowIndex) => (
            <View key={rowIndex} style={styles.gridRow}>
              <Text style={styles.lefthour}>{hour}</Text>
              {timeSlots.map((slot, colIndex) => (
                <View key={colIndex} style={styles.gridCell}>
                  <Window hour={hour} date={slot} destination={"A"} month={selectedMonth} year={selectedMonth==12?"2024":"2025"} />
                  {/* <Text>{selectedMonth==12?"2024":"2025"}</Text> */}
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hourLabelsContainer: {
    width: 50,
    backgroundColor: '#f0f0f0',
  },
  datesabove: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 50,
  },
  hourLabel: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  gridContainer: {
    flexDirection: 'column',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  lefthour: {
    height: 50,
    width: 50,
    top: -8,
    alignItems: 'center',
    backgroundColor: 'green',

  }
});

export default Grid;












// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { Line } from 'react-native-svg';
// import Window from '../Window/Window';

// const Grid = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const markedDates = {
//     [selectedDate.toISOString().split('T')[0]]: {
//       selected: true,
//     },
//   };

//   const timeSlots = Array.from({ length: 31 }, (_, i) => i);

//   return (
//     <View style={styles.container}>
//       <Calendar
//         markedDates={markedDates}
//         onDayPress={({ date }) => setSelectedDate(date)}
//       />

//       <ScrollView horizontal>
//         <View style={styles.timeSlotsContainer}>
//           {timeSlots.map((time) => (
//             <View key={time} style={styles.timeSlot}>
//               <Text style={styles.timeSlotText}>{time+1}</Text>
//               <Line
//                 x1="0"
//                 y1="0"
//                 x2="0"
//                 y2="50"
//                 stroke="#ccc"
//                 strokeWidth="1"
//               />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
      
//       <ScrollView vertical>
//         <View style={styles.gridContainer}>
//           {Array.from({ length: 25 }, (_, i) => i).map((hour) => (
//             <View key={hour} style={styles.gridColumn}>

//                   <Text style={styles.gridCellText}>
//                     {hour}:00
//                   </Text>
//                   <View>
//                         {timeSlots.map((time) => (
//                             <Window/>
//                         ))}
//                   </View>
                       
//             </View>
//           ))}

//         {timeSlots.map((time) => (
//                             <Window/>
//                         ))}

        
//         </View>
//       </ScrollView>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   timeSlotsContainer: {
//     flexDirection: 'row',
//     height: 50,
//     left: 50
//   },
//   timeSlot: {
//     width: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   timeSlotText: {
//     fontSize: 12,
//   },
//   gridContainer: {
//     flexDirection: 'column',
//   },
//   gridColumn: {
//     // width: 50,
//     flexDirection: 'row'
//   },
//   gridCell: {
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   gridCellText: {
//     fontSize: 12,
//   },
//   oneLine: {
//     flexDirection: 'row'
//   }
// });

// export default Grid;













   {/* <ScrollView horizontal>
         <View >
           {timeSlots.map((time) => (
             <View key={time} >
               <Text>{time+1}</Text>
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
       */}

      {/* Left Hour Labels */}
      {/* <View style={styles.hourLabelsContainer}>
        {hours.map((hour) => (
          <View key={hour} style={styles.hourLabel}>
            <Text>{hour}</Text>
          </View>
        ))}
      </View> */}