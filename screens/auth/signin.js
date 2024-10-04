import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import { useAuthRequest } from 'expo-auth-session';
import Constants from 'expo-constants';

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID,
    androidClientId: Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleSignInWithGoogle(authentication);
    }
  }, [response]);

  const handleSignInWithGoogle = async (authentication) => {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      }
    );

    const userInfo = await userInfoResponse.json();
    setUserInfo(userInfo);

    await SecureStore.setItemAsync('authToken', authentication.accessToken);
  };

  const handleLogin = () => {
    // Simply navigate to the Dashboard
    navigation.navigate('/dashboard'); // Navigate to Dashboard
  };


  const handleLogout = async () => {
    setUserInfo(null);
    await SecureStore.deleteItemAsync('authToken');
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View>
          <Text>Welcome, {userInfo.name}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Button
        title="Sign in with Google"
        onPress={handleLogin} // This will navigate to /dashboard
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});