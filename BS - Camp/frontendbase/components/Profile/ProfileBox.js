import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';

const ProfileBox = () => {

    const baseURL = 'http://10.0.2.2:8005';
      const { token } = useContext(AuthContext);
      const [phone, setPhone] = useState('');
      const [tok, setTok] = useState('');


      useEffect(() => {
        const fetchProfile = async () => {
          try {
            const res = await fetch(`${baseURL}/veri`, {
              method: "POST", // Changed to POST
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }) // Send token in body
            });
    
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const data = await res.json();
            console.log("Received Data:", data);
    
          } catch (error) {
            console.log("Error fetching profile:", error.message);
          }
        };
    
        fetchProfile();
      }, []);

  

  return (
    <View>
      <Text>{phone} </Text>
    </View>
  )
}

export default ProfileBox

const styles = StyleSheet.create({});




// useEffect(() => {
//   try {
//     const profile = async () => {
//       const res = await fetch(`${baseURL}/myprofile`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           userId
//         }),
//         credentials: 'include'
//       });
//       const data = await res.json();
//       setPhone(data.result[0]["phone"]);
//       // console.log(data.result[0]["phone"]);
      
//       if(res.status != 201 || !data)
//           console.log("Errrrrror broooo", res.status);
//     }
//     if (userId) profile();

//   }
//   catch (error) {
//       console.log("error is", error.message);
      
//   }
// }, [userId]);








  //  useEffect(() => {
    //     try{
    //       const profile = async() => {
    //         const res = await fetch(`${baseURL}/veri`, {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json"
    //           },
    //           body: JSON.stringify({
    //             token
    //           }),
    //         });
    //         const data = await res.json();
    //         console.log(data);
            

    //       };
    //         profile();
    //       }
    //       catch(error) {
    //           console.log("error a gyi bro", error.message);
              
    //       }
    //  }, [tok]);