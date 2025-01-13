import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import peopleData from "./peopledata";

const People = () => {
    const [peopleData, setPeopleData] = useState([]);
    const date = "2024-12-08";
    const time = "1920";
    const baseURL = "http://10.0.2.2:8005";

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const res = await fetch(`${baseURL}/people?date=${date}&time=${time}`, {
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
    }, [date]);

    return (
        <View style={styles.container}>
            {/* <Text>{peopleData[0]}</Text> */}
            <Text>Date: {date}  Time-slot: 1 am - 2 am</Text>
            {peopleData.map((peep) => (
                <View key={peep.id} style={styles.card}>
                    {/* <Image source={{ uri: person.displayPicture }} style={styles.image} /> */} 
                    <View>
                        <Text style={styles.name}>{peep.user}</Text>
                        {/* <Text style={styles.phone}>{person.phone}</Text> */}
                    </View>
                    <Button
                        title="Message"
                        onPress={() => handleMessage(person.name)}
                        color="#007BFF"
                    />
                </View>
            ))}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 40,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
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