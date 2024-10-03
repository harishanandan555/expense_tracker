import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import SQLite from 'react-native-sqlite-storage';


WebBrowser.maybeCompleteAuthSession();

SQLite.enablePromise(true);
const Signin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [db, setDb] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "382896848352-664l10kdn3j8f880srb1f83t6leg67db.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const dbInstance = await SQLite.openDatabase(
          { name: 'userDatabase.db', location: 'default' }
        );
        setDb(dbInstance);
        createTable(dbInstance);
        fetchStoredUser(dbInstance);
      } catch (error) {
        console.error("Error opening database:", error);
      }
    };
    initializeDatabase();
  }, []);

  const createTable = (db) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT, picture TEXT)"
      );
    });
  };

  const handleResponse = async () => {
    if (response?.type === "success") {
      const { accessToken } = response.authentication;
      if (accessToken) {
        await getUserInfo(accessToken);
      }
    } else if (response?.type === "error") {
      Alert.alert("Login Error", "Something went wrong with the sign-in process");
    }
  };

  const getUserInfo = async (token) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      saveUserToDb(user);
      setUserInfo(user);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const saveUserToDb = (user) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO Users (email, name, picture) VALUES (?, ?, ?)",
        [user.email, user.name, user.picture],
        () => { console.log("User saved to database"); },
        error => { console.log("Error saving user: ", error); }
      );
    });
  };

  const fetchStoredUser = (db) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Users",
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            setUserInfo(result.rows.item(0));
            console.log("User found in database:", result.rows.item(0));
          }
        },
        error => { console.log("Error running query: ", error); }
      );
    });
  };

  const signOut = () => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM Users",
        [],
        () => {
          setUserInfo(null);
          console.log("User signed out");
        },
        error => { console.log("Error signing out: ", error) }
      );
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>MoneyMap</Text>
        <Text style={styles.subtitle}>
          Empowering Your Financial Journey: Seamlessly Track, Plan, and Optimize Every Dollar with Confidence and Clarity
        </Text>
        {!userInfo ? (
          <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.card}>
            {userInfo.picture && (
              <Image source={{ uri: userInfo.picture }} style={styles.image} />
            )}
            <Text style={styles.text}>Email: {userInfo.email}</Text>
            <Text style={styles.text}>Name: {userInfo.name}</Text>
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Features Section */}
   
    </ScrollView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6B7C93",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#4F83F5",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: "#FF4F4F",
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  featuresContainer: {
    marginVertical: 32,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
  },
  featureCard: {
    margin: 8,
    width: 120,
  },
  upgradeContainer: {
    marginVertical: 32,
  },
  upgradeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  upgradeCard: {
    marginTop: 16,
  },
  priceContainer: {
    alignItems: "center",
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
  },
  priceInterval: {
    color: "#6B7C93",
  },
  checkoutButton: {
    backgroundColor: "#4F83F5",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  faqsContainer: {
    marginVertical: 32,
  },
  faqsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  faqCard: {
    marginVertical: 8,
  },
});

export default Signin;
