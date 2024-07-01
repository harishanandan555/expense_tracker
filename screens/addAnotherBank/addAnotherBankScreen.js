import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const AddAnotherBankScreen = ({ navigation }) => {

    const [state, setState] = useState({
        benificiary: null,
        bank: null,
        accountNumber: null,
        ifscCode: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        benificiary,
        bank,
        accountNumber,
        ifscCode,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {beneficiaryNameTextField()}
                    {bankNameTextField()}
                    {accountNumberTextField()}
                    {ifscCodeTextField()}
                    {addAnotherBankButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function addAnotherBankButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.addAnotherBankButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    ADD ANOTHER BANK
                </Text>
            </TouchableOpacity>
        )
    }

    function ifscCodeTextField() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    IFSC Code
                </Text>
                <TextInput
                    value={ifscCode}
                    onChangeText={(text) => updateState({ ifscCode: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function accountNumberTextField() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Account Number
                </Text>
                <TextInput
                    value={accountNumber}
                    onChangeText={(text) => updateState({ accountNumber: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function bankNameTextField() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Name of Bank
                </Text>
                <TextInput
                    value={bank}
                    onChangeText={(text) => updateState({ bank: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function beneficiaryNameTextField() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Name of Beneficiary
                </Text>
                <TextInput
                    value={benificiary}
                    onChangeText={(text) => updateState({ benificiary: text })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
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
                    Bank & AutoPay
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
    textFieldStyle: {
        ...Fonts.blackColor16Medium,
        borderBottomColor: Colors.grayColor,
        borderBottomWidth: 1.0,
    },
    addAnotherBankButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        marginVertical: Sizes.fixPadding * 4.0,
        alignSelf: 'center',
    }
});

export default AddAnotherBankScreen;