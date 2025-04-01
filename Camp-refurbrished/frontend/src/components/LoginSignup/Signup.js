import { View, Text, StyleSheet , Alert, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';

export default function Signup() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const baseURL = 'http://10.0.2.2:8005'

  const handleSignup = async(event) => {
    event.preventDefault();
    if(!phone || !password || !cpassword)
    {
      Alert.alert('Error','Please enter both email and password');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Error', 'Phone number must be exactly 10 digits');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error','password length less than 6');
      return;
    }
    if (password !== cpassword) {
      Alert.alert('Error','passwords dont match');
      return;
    }
    try {
      const res = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone, password, cpassword
        })
      });
      const data = await res.json();
      if(res.status==422 || !data)
        Alert.alert('Error','some error bro');
      else
        {
          // setUdata({
          //   ...udata, name:"", password:"", cpassword:""
          // })
          Alert.alert('Error',`person registered bro ${res.status}`);
        }
    }
    catch (error) {
      Alert.alert('Error','came in catch block');
        
    }
  };

  return(
    <View style={styles.container}>
      <Text style = {styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder='Phone-number'
        keyboardType='number-pad'
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style= {styles.input}
        placeholder='password'
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
       <TextInput
        style= {styles.input}
        placeholder='Confirm password'
        placeholderTextColor="#888"
        secureTextEntry
        value={cpassword}
        onChangeText={setCpassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  button: {
    backgroundColor: '#6200ee',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#6200ee',
    marginTop: 15,
    fontSize: 16,
  },
});