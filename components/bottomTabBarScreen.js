import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, BackHandler, SafeAreaView } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import HomeScreen from "../screens/home/homeScreen";
import PortfolioScreen from "../screens/portfolio/portfolioScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { useFocusEffect } from '@react-navigation/native';

const BottomTabBarScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(1);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                {currentIndex == 1 ?
                    <HomeScreen navigation={navigation} /> :
                    currentIndex == 2 ?
                        <PortfolioScreen navigation={navigation} />
                        :
                        <ProfileScreen navigation={navigation} />
                }
                <View style={styles.bottomTabBarStyle}>
                    {bottomTabBarItem({
                        index: 1,
                        icon: require('../assets/images/icons/home.png'),
                        tabName: 'Home',
                    })}
                    {bottomTabBarItem({
                        index: 2,
                        icon: require('../assets/images/icons/briefcase.png'),
                        tabName: 'Portfolio',
                    })}
                    {bottomTabBarItem({
                        index: 3,
                        icon: require('../assets/images/icons/user.png'),
                        tabName: 'Profile',
                    })}
                </View>
            </View>
            {
                backClickCount == 1
                    ?
                    <Animated.View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </Animated.View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function bottomTabBarItem({ index, icon, tabName }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setCurrentIndex(index)}
                style={{ alignItems: 'center' }}
            >
                <Image
                    source={icon}
                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                    tintColor={currentIndex == index ? Colors.primaryColor : Colors.blackColor}
                />
                <Text style={{
                    ...currentIndex == index ?
                        { ...Fonts.primaryColor16SemiBold }
                        :
                        { ...Fonts.grayColor16SemiBold }
                }}>
                    {tabName}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 1.0,
        elevation: 2.0
    },
    bottomTabSelectedIconStyle: {
        height: 30.0,
        width: 30.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BottomTabBarScreen;





