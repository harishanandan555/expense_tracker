import React, { useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const PaymentConfirmationScreen = ({ navigation }) => {

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
                {investmentInfo()}
                {investmentFutureInfo()}
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

    function investmentFutureInfo() {
        return (
            <View style={styles.investmentFutureInfoWrapStyle}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor14SemiBold }}>
                    Now, Do All Your Future Investment In A
                    Single Click
                </Text>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor12Regular }}>
                    Set up one time mandate with your bank account and
                    enable automatic deducation of our money
                    everytime your invest, be it in SIP.
                </Text>
                <View style={styles.investmentFutureInfoTopIconWrapStyle}>
                    <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                        *
                    </Text>
                </View>
            </View>
        )
    }

    function investmentInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Axis Top Securities
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, }}>
                    <Text style={{ ...Fonts.grayColor10SemiBold }}>
                        • Plan - Growth { }
                    </Text>
                    <Text style={{ ...Fonts.primaryColor10Bold }}>
                        Equity
                    </Text>
                    <Text style={{ ...Fonts.grayColor10SemiBold }}>
                        { } • One Time Investment { }
                    </Text>
                    <Text style={{ ...Fonts.grayColor10SemiBold }}>
                        • Min Investment { }
                    </Text>
                    <Text style={{ ...Fonts.primaryColor10Bold }}>
                        Rs.1000
                    </Text>
                </Text>
            </View>
        )
    }

    function successInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <FontAwesome5 name="check-circle" size={80} color={Colors.greenColor}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor20SemiBold }}>
                    Investment Done!
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    {`We have successfully received your\npurchase request`}
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    backToHomeButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    },
    investmentFutureInfoWrapStyle: {
        marginTop: Sizes.fixPadding - 2.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center', justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    investmentFutureInfoTopIconWrapStyle: {
        paddingHorizontal: Sizes.fixPadding + 5.0,
        position: 'absolute',
        top: -8.0,
        backgroundColor: Colors.whiteColor,
    }
});

export default PaymentConfirmationScreen;