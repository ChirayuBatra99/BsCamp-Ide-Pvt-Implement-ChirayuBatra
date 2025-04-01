import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

import {img} from "./imageSample";

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
    // <View>
    //   <Text>{phone} </Text>
    //   <Text>{userId}</Text>
    // </View>

        <View>
          <Text style={{color: 'black'}}>{phone} </Text>
          <View style= {styles.imageView}>
             <Image
                resizeMode='contain'
                // source={{uri:profileImage?.path}}
                source={{uri: img}}
                style={styles.imageStyles}
          />
          </View>
          <Button title="profile pic" onPress={() => openGallery()} />
        </View>

  )
}

export default Profile

const styles = StyleSheet.create({
  imageStyles: {
    height: '100%',
    width: '100%',
    // borderRadius: 200, // Half of width/height for a circular image
    overflow: "hidden",
  },
  imageView: {
    height: 150,
    width: 150,
    borderRadius: 0, // Same as imageStyles
    overflow: "hidden",
  }
});