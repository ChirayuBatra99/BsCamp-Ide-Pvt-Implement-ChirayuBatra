import { View, Text, StyleSheet, Image, Button, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import peopleData from "./peopledata";
import { AuthContext } from '../../AuthContext';
import { useRoute } from '@react-navigation/native';

import Chat from '../Chating/Chat';
// import { ScrollView } from 'react-native-gesture-handler';

const People = () => {
    const [peopleData, setPeopleData] = useState([]);
    const {userId} = useContext(AuthContext);
    // const date = "2024-12-08";  done
    // const time = "1920";
    const baseURL = "http://10.0.2.2:8005";

    const route = useRoute();
    const { day, time, destination } = route.params;
    const date = day;
    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                console.log(day, ",", time, ",", destination);
                const res = await fetch(`${baseURL}/people?date=${day}&time=${time}&userId=${userId}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                console.log(data);

                setPeopleData(data); // Update state with fetched data
            } catch (error) {
                Alert.alert("Error", `Failed to fetch data: ${error.message}`);
            }
        };

        fetchData();
    }, [day]);

    function formatDate(day) {
        const date = new Date(day);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }
    function formatTimeRange(timeStr) {
        let startHour = parseInt(timeStr.slice(0, 2), 10);
        let endHour = parseInt(timeStr.slice(2, 4), 10);
    
        const formatHour = (hour) => {
            let period = hour < 12 ? "AM" : "PM";
            let formattedHour = hour % 12 || 12; // Convert 0 to 12 AM and 12 remains 12 PM
            return `${formattedHour} ${period}`;
        };
    
        return `${formatHour(startHour)} - ${formatHour(endHour)}`;
    }
    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'green'}}>
        <View style={styles.container}>
            {/* <View style={styles.headersTimeDay}> */}
                <Text style={styles.headerDayText}>{formatDate(day)}</Text>
                <Text style={styles.headerTimeText}>{formatTimeRange(time)}</Text>
            {/* </View> */}
            {/* From here to */}
                {
                    peopleData?.map((peep) => (
                        <Chat item={peep} key={peep?.bid_id} />
                    ))
                }
               {/* To here */}
        </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerDayText: {
        fontSize: 16,
        fontWeight: 'bold',
        // width: '25%'
    },
    headerTimeText: {
        fontSize: 22,
        fontWeight: 'bold',
        // width: '40%'
    },
    headersTimeDay: {

    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    phone: {
        fontSize: 14,
        color: "gray",
    },
    card: {
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-between",
        // marginBottom: 10,
        // padding: 10,
        // backgroundColor: "#f9f9f9",
        // borderRadius: 10,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // elevation: 3,
    },
});

export default People








// {peopleData.map((person) => (
//     <View key={person.id} style={styles.card}>
//       {/* <Image source={{ uri: person.displayPicture }} style={styles.image} /> */}
//       <View>
//         <Text style={styles.name}>{person.name}</Text>
//         {/* <Text style={styles.phone}>{person.phone}</Text> */}
//       </View>
//       <Button
//           title="Message"
//           onPress={() => handleMessage(person.name)}
//           color="#007BFF"
//         />
//     </View>
//   ))}






// Previous list of poeple

// {peopleData.map((peep) => (
//     <View key={peep.bid_id} style={styles.card}>
//         {/* <Image source={{ uri: person.displayPicture }} style={styles.image} /> */} 
//         <View>
//             <Text style={styles.name}>{peep.user},Bidid {peep.bid_id}</Text>
        
//             {/* <Text style={styles.phone}>{person.phone}</Text> */}
//         </View>
//         <Button
//             title="Message"
//             onPress={() => handleMessage(person.name)}
//             color="#007BFF"
//         />
//     </View>
// ))}