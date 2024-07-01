import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const AddMoneyScreen = ({ navigation }) => {

    const [state, setState] = useState({
        amount: 'Rs. 1,000',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { amount } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {amountInfo()}
                {detailInfo()}
            </View>
            {addMoneyButton()}
        </SafeAreaView>
    )

    function addMoneyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SelectBank')}
                style={styles.addMoneyButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    ADD MONEY
                </Text>
            </TouchableOpacity>
        )
    }

    function detailInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', }}>
                <Text style={{ ...Fonts.primaryColor12SemiBold, marginRight: Sizes.fixPadding - 5.0, }}>
                    •
                </Text>
                <Text style={{ ...Fonts.grayColor12Regular }}>
                    By continuing I agree with the { }
                    <Text style={{ ...Fonts.primaryColor12SemiBold }}>Disclaimer</Text>
                    { } and { }
                    <Text style={{ ...Fonts.primaryColor12SemiBold }}>Terms and Conditions</Text>
                    { } of Investment Zone.
                </Text>
            </View>
        )
    }

    function amountInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, alignItems: 'center', }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Amount to add
                </Text>
                <TextInput
                    value={amount}
                    onChangeText={(text) => updateState({ amount: text })}
                    selectionColor={Colors.primaryColor}
                    keyboardType="numeric"
                    style={styles.amountFieldStyle}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={22}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                    Add Money
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    amountFieldStyle: {
        ...Fonts.blackColor14Medium,
        width: '40%',
        borderBottomColor:
            Colors.grayColor,
        borderBottomWidth: 1.0,
        textAlign: 'center',
    },
    addMoneyButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    }
});

export default AddMoneyScreen;