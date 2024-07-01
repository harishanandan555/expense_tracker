import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, FlatList, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const bankOptionsList = [
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

const SelectBankScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedPaymentOption: bankOptionsList[1].method,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { selectedPaymentOption, } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {selectBankInfo()}
            </View>
            {addMoneyButton()}
        </SafeAreaView>
    )

    function addMoneyButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AddMoneySuccess')}
                style={styles.addMoneyButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    ADD MONEY
                </Text>
            </TouchableOpacity>
        )
    }

    function selectBankInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedPaymentOption: item.method })}
                style={styles.bankOptionsWrapStyle}>
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
        )
        return (
            <FlatList
                ListHeaderComponent={
                    <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                        Select Your Bank
                    </Text>
                }
                data={bankOptionsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: Sizes.fixPadding * 2.0, }}
            />
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
    bankOptionsWrapStyle: {
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

export default SelectBankScreen;