import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Avatar, Menu, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LogOut, Sun, Moon } from "react-native-vector-icons/Feather"; // Replace with vector icons

// Logo Component
const Logo = ({ width = 40, height = 40 }) => {
  return (
    <Image
      source={require("../assets/logo.png")} // Replace with your logo
      style={{ width, height }}
      alt="SpendaScope"
    />
  );
};

// UserButton Component
const UserButton = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Mock data to simulate session, replace this with actual session data
  const userData = { user: { name: "John Doe", image: "https://via.placeholder.com/40" } };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button onPress={openMenu}>
          <Avatar.Image size={40} source={{ uri: userData.user.image }} />
        </Button>
      }
    >
      <Menu.Item onPress={() => {}} title="Light Theme" icon="sun" />
      <Menu.Item onPress={() => {}} title="Dark Theme" icon="moon" />
      <Menu.Item onPress={signOut} title="Logout" icon="log-out" />
    </Menu>
  );
};

// Navigation Component
const Navigation = () => {
  const navigation = useNavigation();
  
  const links = [
    { label: "Home", href: "HomeScreen" },
    { label: "Profile", href: "ProfileScreen" },
    // Add more navigation links here
  ];

  return (
    <View style={styles.navigation}>
      {links.map((link) => (
        <TouchableOpacity
          key={link.href}
          onPress={() => navigation.navigate(link.href)}
        >
          <Text style={styles.navItem}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// UpgradeBanner Component (Replace this with actual logic)
const UpgradeBanner = () => {
  return (
    <View style={styles.upgradeBanner}>
      <Text style={styles.upgradeText}>Upgrade to premium for more features!</Text>
    </View>
  );
};

// Header Component
export const Header = () => {
  const { hasAccess, isLoading } = useStripe(); // Replace with your actual useStripe logic

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          <Logo />
          <Navigation />
        </View>
        <View style={styles.rightSection}>
          <UserButton />
        </View>
      </View>
      {!isLoading && !hasAccess && <UpgradeBanner />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    zIndex: 50,
    paddingVertical: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
  },
  navigation: {
    flexDirection: "row",
    marginLeft: 20,
  },
  navItem: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#007BFF",
  },
  upgradeBanner: {
    padding: 10,
    backgroundColor: "#FFC107",
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default Header;
