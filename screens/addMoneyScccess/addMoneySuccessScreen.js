import React, { useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const AddMoneySuccessScreen = ({ navigation }) => {

    const backAction = () => {
        navigation.push('BottomTabBar')
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {successInfo()}
                {backToHomeButton()}
            </View>
        </SafeAreaView>
    )


    function backToHomeButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar')}
                style={styles.backToHomeButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    BACK TO HOME
                </Text>
            </TouchableOpacity>
        )
    }

    function successInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <FontAwesome5 name="check-circle" size={80} color={Colors.greenColor} />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor20SemiBold }}>
                    Great!
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    Money successfully added to your Wallet!
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.primaryColor16SemiBold }}>
                    Your Updated Wallet Balance is Rs. 4,159
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backToHomeButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    },
});

export default AddMoneySuccessScreen;