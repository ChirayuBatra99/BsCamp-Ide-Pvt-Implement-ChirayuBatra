import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';

import { AuthContext } from '../../AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import { useSocketContext } from './SocketContext';

const ChatRoom = () => {
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { token, userId, setToken, setUserId } = useContext(AuthContext);
    const { socket } = useSocketContext();
    const route = useRoute();

    useLayoutEffect(() => {
        return navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View>
                        <Text>{route?.params?.name}</Text>
                    </View>
                </View>
            )
        });
    }, [route?.params?.name]);

    const listeMessages = () => {
        const { socket } = useSocketContext();
        useEffect(() => {
            socket?.on('receiveMessage', newMessage => {
                newMessage.shouldShake = true;
                setMessages([...messages, newMessage]);
            });
            return () => socket?.off('newMessage');
        }, [socket, messages, setMessages]);
    };
    listeMessages();
    // The above use function is v v important


    const fetchMessages = async () => {
        try {
            console.log("hii");
            const senderId = userId;
            const receiverId = route?.params?.receiverId;

            const conversationId = (senderId < receiverId) ? `${senderId}_${receiverId}` : `${receiverId}_${senderId}`;

            const response = await axios.get('http://10.0.2.2:8005/messages', {
                // params: { senderId, receiverId },
                params: { conversationId },
            });
            setMessages(response.data);
            console.log(response.data);

        }
        catch (error) {
            console.log('Error', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // console.log('messages', messages);
    const formatTime = time => {
        const options = { hour: 'numeric', minute: 'numeric' };
        return new Date(time).toLocaleString('en-US', options);
    };

    const sendMessage = async (senderId, receiverId) => {
        try {
            if(message=='')
                return;
            await axios.post('http://10.0.2.2:8005/sendMessage', {
                senderId,
                receiverId,
                message
            });
            socket.emit('sendMessage', { senderId, receiverId, message });
            setMessage('');
            setTimeout(() => {
                fetchMessages();
            }, 100);
        }
        catch (error) {
            console.log("errorBRO", error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
            <Text>Person:  {route?.params?.name}</Text>
            <ScrollView>
                <View>
                    {messages?.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={[
                                    item?.senderId === userId
                                        ? {
                                            alignSelf: 'flex-end',
                                            backgroundColor: '#DCF8C6',
                                            padding: 8,
                                            maxWidth: '60%',
                                            borderRadius: 7,
                                            margin: 10,
                                        }
                                        : {
                                            alignSelf: 'flex-start',
                                            backgroundColor: 'white',
                                            padding: 8,
                                            margin: 10,
                                            borderRadius: 7,
                                            maxWidth: '60%',
                                        },
                                ]}
                            >
                                <Text style={{ fontSize: 13, textAlign: "left" }}>{item?.message}</Text>
                                <Text style={{ textAlign: "right", fontSize: 9, color: "gray", marginTop: 4 }}>{formatTime(item?.timeStamp)}</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>


            {/* <ScrollView>
                <View>
                    {messages?.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={[
                                    item?.senderId === userId
                                        ? {
                                            alignSelf: 'flex-end',
                                            backgroundColor: '#DCF8C6',
                                            padding: 8,
                                            maxWidth: '60%',
                                            borderRadius: 7,
                                            margin: 10,
                                        }
                                        : {
                                            alignSelf: 'flex-start',
                                            backgroundColor: 'white',
                                            padding: 8,
                                            margin: 10,
                                            borderRadius: 7,
                                            maxWidth: '60%',
                                        },
                                ]}
                            >
                                <Text style={{ fontSize: 13, textAlign: 'left' }}>{item?.message}</Text>
                                <Text
                                    style={{
                                        textAlign: 'right',
                                        fontSize: 9,
                                        color: 'gray',
                                        marginTop: 4,
                                    }}
                                >
                                    {formatTime(item?.timeStamp)}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView> */}

            <View
                style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderTopColor: '#dddddd',
                    marginBottom: 20,
                }}
            >
                <TextInput
                    placeholder="type your message..."
                    value={message}
                    onChangeText={setMessage}
                    style={{
                        flex: 1,
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#ddddd',
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        marginLeft: 10,
                    }}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        marginHorizontal: 8,
                    }}>
                    <Text>Camera Icon</Text>
                    <Text>Mic Icon</Text>
                </View>

                <Pressable
                    onPress={() => sendMessage(userId, route?.params?.receiverId)}
                    style={{
                        backgroundColor: '#0066b2',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                    }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatRoom;