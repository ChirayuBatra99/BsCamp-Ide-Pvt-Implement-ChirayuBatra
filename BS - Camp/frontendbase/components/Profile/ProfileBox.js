import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';

import ImagePicker from 'react-native-image-crop-picker';
// import { Image } from 'react-native-svg';

const ProfileBox = () => {

      const baseURL = 'http://10.0.2.2:8005';
      const { token, userId } = useContext(AuthContext);
      const [phone, setPhone] = useState('');
      const [tok, setTok] = useState('');

      const [profileImage, setProfileImage] = useState();
      const [imagesixfour, setImagesixfour] = useState('');
      // const openCamera = async() => {
      //     try{
      //       await ImagePicker.openCamera({
      //         width: 300,
      //         height: 400,
      //         cropping: true,
      //       }).then(image => {
      //         console.log(image);
      //         setProfileImage(image);
      //       });
      //     }
      //     catch(error) {
      //       console.log("error", error.message);            
      //     }
      // };

      const openGallery = async() => {
        try{
        await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          includeBase64: true,
          cropperCircleOverlay: true,
          avoidEmptySpaceAroundImage: true,
          freeStyleCropEnabled: true,

        }).then(image => {
          console.log(image);
          setProfileImage(image);
          const data = `data:${image.mime};base64,${image.data}`;
          console.log(data);
          
          setImagesixfour(data);
        });
      }
      catch(error) {
        console.log("error", error.message);        
      }
      };


      // Upload in mongodb
      useEffect(() => {
        try{
          const uploadImage = async() => {
            const res= await fetch(`${baseURL}/uploadImage`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId, imagesixfour})
            })
            if(res.status==201)
                console.log("Image uplaoded success");
            else  
              console.log("code",res.status);
            
          }
          uploadImage();
      }
      catch(error) {
        console.log("error", error.message);
        
      }
      }, [imagesixfour]);






      // useEffect(() => {
      //   const fetchProfile = async () => {
      //     try {
      //       const res = await fetch(`${baseURL}/veri`, {
      //         method: "POST", // Changed to POST
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({ token }) // Send token in body
      //       });
    
      //       if (!res.ok) {
      //         throw new Error(`HTTP error! Status: ${res.status}`);
      //       }
    
      //       const data = await res.json();
      //       console.log("Received Data:", data);
      //       setPhone(data)
      //     } catch (error) {
      //       console.log("Error fetching profile:", error.message);
      //     }
      //   };
    
      //   fetchProfile();
      // }, []);

  

  return (
    <View>
      <Text style={{color: 'white'}}>{phone} </Text>
      <View style= {styles.imageView}>
         <Image
            resizeMode='contain'
            // source={{uri:profileImage?.path}}
            source={{uri: imagesixfour}}
            style={styles.imageStyles}
      />
      </View>
      <Button title="profile pic" onPress={() => openGallery()} />
    </View>
  )
}

export default ProfileBox;

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