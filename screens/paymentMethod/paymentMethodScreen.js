import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const virtualPaymentMethodsList = [
    {
        id: '1',
        methodIcon: require('../../assets/images/paymentMethod/googlePay.png'),
        method: 'Google Pay',
    },
    {
        id: '2',
        methodIcon: require('../../assets/images/paymentMethod/paytm.png'),
        method: 'Paytm',
    },
    {
        id: '3',
        methodIcon: require('../../assets/images/paymentMethod/phonePay.png'),
        method: 'Phone Pay',
    },
];

const bankTransferOptionsList = [
    {
        id: '1',
        methodIcon: require('../../assets/images/paymentMethod/sbi.png'),
        method: 'SBI',
    },
    {
        id: '2',
        methodIcon: require('../../assets/images/paymentMethod/hdfc.png'),
        method: 'HDFC',
    },
    {
        id: '3',
        methodIcon: require('../../assets/images/paymentMethod/bob.png'),
        method: 'BOB',
    },
    {
        id: '4',
        methodIcon: require('../../assets/images/paymentMethod/icic.png'),
        method: 'ICICI',
    },
];

const PaymnentMethodScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedPaymentOption: bankTransferOptionsList[1].method,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { selectedPaymentOption, } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {virtualPaymentMethods()}
                    {bankTransferOptions()}
                    {payNowButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function payNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('PaymentConfirmation')}
                style={styles.payNowButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    PAY NOW
                </Text>
            </TouchableOpacity>
        )
    }

    function bankTransferOptions() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Bank Transfer
                </Text>
                {
                    bankTransferOptionsList.map((item) => (
                        <View key={item.id}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedPaymentOption: item.method })}
                                style={styles.paymentOptionsWrapStyle}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={item.methodIcon}
                                        style={{ width: 26.0, height: 26.0, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                                        {item.method}
                                    </Text>
                                </View>
                                <View style={{
                                    borderColor: selectedPaymentOption == item.method ? Colors.primaryColor : Colors.grayColor,
                                    ...styles.radioButtonOuterCircleStyle,
                                }}>
                                    {
                                        selectedPaymentOption == item.method
                                            ?
                                            <View style={styles.radioButtonInnerCircleStyle} />
                                            :
                                            null
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        )
    }

    function virtualPaymentMethods() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Virtual Payment
                </Text>
                {
                    virtualPaymentMethodsList.map((item) => (
                        <View key={item.id}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => updateState({ selectedPaymentOption: item.method })}
                                style={styles.paymentOptionsWrapStyle}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={item.methodIcon}
                                        style={{ width: 26.0, height: 26.0, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                                        {item.method}
                                    </Text>
                                </View>
                                <View style={{
                                    ...styles.radioButtonOuterCircleStyle,
                                    borderColor: selectedPaymentOption == item.method ? Colors.primaryColor : Colors.grayColor,
                                }}>
                                    {
                                        selectedPaymentOption == item.method
                                            ?
                                            <View style={styles.radioButtonInnerCircleStyle} />
                                            :
                                            null
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                }
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
                    Payment Method
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
    paymentOptionsWrapStyle: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        borderColor: Colors.lightWhiteColor,
        borderWidth: 1.0,
    },
    radioButtonOuterCircleStyle: {
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 16.0, height: 16.0, borderRadius: 8.0,
    },
    radioButtonInnerCircleStyle: {
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.primaryColor
    },
    payNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    }
});

export default PaymnentMethodScreen;