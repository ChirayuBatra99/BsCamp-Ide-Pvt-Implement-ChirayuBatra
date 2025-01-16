import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const Profile = () => {

  const baseURL = 'http://10.0.2.2:8005';
  const { userId } = useContext(AuthContext);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    try {
      const profile = async () => {
        const res = await fetch(`${baseURL}/myprofile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId
          }),
          credentials: 'include'
        });
        const data = await res.json();
        setPhone(data.result[0]["phone"]);
        // console.log(data.result[0]["phone"]);
        
        if(res.status != 201 || !data)
            console.log("Errrrrror broooo", res.status);
      }
      if (userId) profile();

    }
    catch (error) {
        console.log("error is", error.message);
        
    }
  }, [userId]);


  return (
    <View>
      <Text>{phone} </Text>
      <Text>{userId}</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})