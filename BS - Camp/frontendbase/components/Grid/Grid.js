import React, { useRef, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Window from '../Window/Window';
import { AppContext } from '../context/AppContext';

const Grid = () => {
  const timeSlots = Array.from({ length: 30 }, (_, i) => i + 1); // 1 to 30
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`); // 1:00 to 24:00
  const { selectedMonth } = useContext(AppContext);

  // Refs for both vertical scrollviews
  const leftColumnRef = useRef(null);
  const gridRef = useRef(null);

  const syncScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (leftColumnRef.current) {
      leftColumnRef.current.scrollTo({ y, animated: false });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* Fixed Left Time Labels */}
        <ScrollView
          ref={leftColumnRef}
          scrollEnabled={false} // Sync only
          style={styles.fixedLeftColumn}
          showsVerticalScrollIndicator={false}
        >
          {hours.map((hour, index) => (
            <View key={index} style={styles.fixedLeftTimeLabel}>
              <Text style={styles.lefthour}>{hour.replace(/:00$/, '')} AM</Text>
            </View>
          ))}
        </ScrollView>

        {/* Horizontal Scrollable Grid */}
        <ScrollView
          horizontal
          contentContainerStyle={{ flexDirection: 'row', paddingTop: 50 }}
        >
          <View style={styles.gridContainer}>
            {/* Dates Above */}
            <View style={styles.datesabove}>
              {timeSlots.map((e, key) => (
                <View key={key} style={styles.hourLabelsContainer}>
                  <Text> {e} Jan</Text>
                  <View style={styles.line} />
                </View>
              ))}
            </View>

            {/* Vertical Scrollable Grid */}
            <ScrollView
              ref={gridRef}
              onScroll={syncScroll}
              scrollEventThrottle={1} // Improve responsiveness
              showsVerticalScrollIndicator={false}
            >
              {hours.map((hour, rowIndex) => (
                <View key={rowIndex} style={styles.gridRow}>
                  {timeSlots.map((slot, colIndex) => (
                    <View key={colIndex} style={styles.gridCell}>
                      <Window
                        hour={hour}
                        date={slot}
                        destination="Ai"
                        month={selectedMonth}
                        year={selectedMonth == 12 ? '2024' : '2025'}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -30,   // space between the grid and navbar
  },
  rowContainer: {
    flexDirection: 'row',
  },
  fixedLeftColumn: {
    marginTop:  47,
    marginBottom: 19,
    width: 50,
    // backgroundColor: 'white',
  },
  fixedLeftTimeLabel: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'pink',
  },
  gridContainer: {
    flexDirection: 'column',
  },
  datesabove: {
    flexDirection: 'row',
    // marginLeft: 50, // Offset for time labels
  },
  hourLabelsContainer: {
    width: 50,
    backgroundColor: '#f0f0f0',
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: 'black',
    position: 'absolute',
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
    borderColor: 'black',
  },
  lefthour: {
    fontSize: 14,
  },
});

export default Grid;


















// import React, { useState, useContext } from 'react';
// import { View, Text, StyleSheet, ScrollView, Line } from 'react-native';
// import Window from '../Window/Window';

// import { AppContext } from '../context/AppContext';

// const Grid = () => {
//   const timeSlots = Array.from({ length: 30 }, (_, i) => i + 1); // 1 to 30
//   const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`); // 1:00 to 24:00

//   const { selectedMonth } = useContext(AppContext);

//   return (
//     <View style={styles.biggerFlexOne}>
//     <ScrollView
//       horizontal
//       contentContainerStyle={{ flexDirection: 'row', paddingTop: 50}}
//       style={styles.abc}
//     >

//       {/* Main Grid */}
//       <View style={styles.gridContainer}>

//         <View style={styles.datesabove}>
//           {timeSlots.map((e, key) => (
//             <View style={styles.hourLabelsContainer}>
//               <Text key={key} > {e} Jan</Text>
//               <View key={key} style={[styles.line, { left: key * 0 }]} />
//             </View>
//           ))}
//         </View>

//         <ScrollView vertical   style={styles.abc}  >

//           {hours.map((hour, rowIndex) => (
//             <View key={rowIndex} style={styles.gridRow}>

//               {/* Should come in vertical scroll, not horizontal scroll */}
//               {/* Below is line X */}
//               {/* <Text style={styles.lefthour}>{hour.replace(/:00$/, '')} </Text>     */}
//               <View style={styles.fixedLeftTimeLabel}>
//                   <Text style={styles.lefthour}>{hour.replace(/:00$/, '')}</Text>
//                 </View>



                
//               {timeSlots.map((slot, colIndex) => (
//                 <View key={colIndex} style={styles.gridCell}>
//                   <Window hour={hour} date={slot} destination={"Ai"} month={selectedMonth} year={selectedMonth == 12 ? "2024" : "2025"} />
//                   {/* <Text>{selectedMonth==12?"2024":"2025"}</Text> */}
//                   {slot == 1 ?
//                     (
//                       <View style={styles.bottomLine} />
//                     ) :
//                     (<View />)
//                   }

//                 </View>
//               ))}
//             </View>
//           ))}

//         </ScrollView>

//       </View>

//     </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   abc: {
//       position: 'relative'
//   },
//   biggerFlexOne:{
//       flex: 1,
//   },
//   bottomLine: {
//     position: 'absolute',
//     bottom: -2,
//     left: -15,
//     width: 15, // Adjust the length of the horizontal line
//     height: 2, // Thickness of the line
//     backgroundColor: 'blue',
//   },

//   hourLabelsContainer: {
//     width: 50,
//     backgroundColor: '#f0f0f0',
//   },
//   datesabove: {
//     display: 'flex',
//     flexDirection: 'row',
//     marginLeft: 25,
//     width: 50,
//   },

//   line: {
//     width: 1,
//     height: '100%',
//     backgroundColor: 'black',
//     position: 'absolute',
//   },

//   hourLabel: {
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   gridContainer: {
//     flexDirection: 'column',

//   },
//   gridRow: {
//     flexDirection: 'row',
//   },
//   gridCell: {
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'blue',  // this is the border between individual time slots, was previously #ddd
//   },

//   lefthour: {
//     height: 50,
//     width: 25,
//     top: -10,
//     // position: 'absolute',

//   },

//   // lefthour: {
//   //   height: 50,
//   //   width: 25,
//   //   top: -10,
//   //   backgroundColor: 'green',

//   // },


  
//   fixedLeftTimeLabel: {
//     // position: 'absolute',
//   //   left: 0,
//   //   top: 0,
//   //   height: '100%',
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   },


// });

// export default Grid;


