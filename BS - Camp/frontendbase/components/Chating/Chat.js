import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';

const Chat = ({ item }) => {
    const navigation = useNavigation();
    const { userId } = useContext(AuthContext);
    console.log("broUseridChat.jspage", userId);
    const [messages, setMessages] = useState([]);

    // const fetchMessages = async () => {
    //     try {
    //         const senderId = userId;
    //         const receiverId = item?._id;
    //         console.log(senderId);
    //         console.log(receiverId);

    //         const response = await axios.get('http://localhost:8005/messages', {
    //             params: { senderId, receiverId },
    //         });
    //         setMessages(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // console.log("messages", messages);
    // useEffect(() => {
    //     fetchMessages();
    // }, []);

    // const getLastMessage = () => {
    //     const n = messages.length;
    //     return messages[n - 1];
    // };
    // const lastMessage = getLastMessage();

    return (
        <Pressable
            onPress={() =>
                navigation.navigate('ChatRoom', {
                    name: item?.phone,
                    receiverId: item?.userid,          //    FIX THIS
                })
            }
            style={{ marginVertical: 15 }}
        >
            
            <View style={styles.container}>
                <Text style={styles.text}>{item?.phone}, {item?.userid}</Text>
                
                <TouchableOpacity 
                    style={styles.messageButton}
                    onPress={() => navigation.navigate('ChatRoom', {
                        name: item?.phone,
                        receiverId: item?.userid,
                    })}
                >
                    {/* <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" /> */}
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        elevation: 3,  // Shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        width: '100%'
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    messageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',  // iOS blue color
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 5,
    }
})






 {/* <Text style={{ marginTop: 4, color: 'gray' }}>
                        {lastMessage
                            ? lastMessage.message
                            : `Start chat with ${item?.name}`}
                    </Text>                                             FIX THIS */}