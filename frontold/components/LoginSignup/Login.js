import { Image, StyleSheet, Platform, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';
import { useNavigation } from '@react-navigation/native';



export default function Login() {

  // Login page
  const baseURL = 'http://10.0.2.2:8005'
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {token, setToken} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if(token) {
      navigation.replace('MainStack', {screen: 'GridScreen'});
    }
  }, [token, navigation] );

  const handleLogin = async(event) => {
    event.preventDefault();
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter both phone and password.');
      return;
    }

    try{
      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone, password
        }),
        credentials: 'include'
      });
      const data = await res.json();
      const token = data;
      console.log(data);
      
      if(res.status != 201 || !data)
        Alert.alert('Error', 'no user present or some other error');
      else{
          // console.log(data);   Data contains token value
          AsyncStorage.setItem('authToken', token);
          setToken(token);
      }
    }
    catch(error){
      Alert.alert('Error', 'error in catch block 1,'+error.message);

    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Login</Text>
    <TextInput
      style={styles.input}
      placeholder="Phone"
      placeholderTextColor="#888"
      keyboardType="number-pad"
      value={phone}
      onChangeText={setPhone}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#888"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.forgotPassword}>
        Forgot Password?
      </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
      <Text style={styles.forgotPassword}>
        New User?
      </Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
    // height: 50,
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






// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';



{/* <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView> */}





    // titleContainer: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   gap: 8,
    // },
    // stepContainer: {
    //   gap: 8,
    //   marginBottom: 8,
    // },
    // reactLogo: {
    //   height: 178,
    //   width: 290,
    //   bottom: 0,
    //   left: 0,
    //   position: 'absolute',
    // },