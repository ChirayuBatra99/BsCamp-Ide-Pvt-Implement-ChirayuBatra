import { Pressable, StyleSheet, Text, View } from 'react-native'
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
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>{item?.phone},{item?.userid}</Text>
                     {/* <Text style={{ marginTop: 4, color: 'gray' }}>
                        {lastMessage
                            ? lastMessage.message
                            : `Start chat with ${item?.name}`}
                    </Text>                                             FIX THIS */}
                </View>

            </View>
        </Pressable>
    )
}

export default Chat

const styles = StyleSheet.create({})