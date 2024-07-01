import React, { useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const AutoplayRequestSuccessScreen = ({ navigation, route }) => {

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

    const item = route.params.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {successInfo()}
                {bankInfo()}
                {backToHomeButton()}
            </View>
        </SafeAreaView>
    )

    function bankInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding + 5.0, alignItems: 'center' }}>
                <View style={{ marginBottom: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.bankIcon}
                        style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                    />
                    <Text style={{ textAlign: 'center', marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.blackColor16SemiBold }}>
                        {item.bankName}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        ({item.accountNumber})
                    </Text>
                </View>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Expected completion time.
                </Text>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    2-7 working days.
                </Text>
            </View>
        )
    }

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
                    Your AutoPay request has been submitted
                    successfully
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

export default AutoplayRequestSuccessScreen;