import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";

const investmentCartsList = [
    {
        id: '1',
        bgColor: '#BA000D',
        fund: 'Axis Top Securities',
        investmentAmount: '1,059',
    },
];

const InvestmentCartScreen = ({ navigation }) => {

    const [state, setState] = useState({
        investmentCarts: investmentCartsList,
        showSnackBar: false,
        snackBarMsg: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        investmentCarts,
        showSnackBar,
        snackBarMsg,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {
                    investmentCarts.length == 0
                        ?
                        cartEmptyInfo()
                        :
                        <>
                            {countInfo()}
                            {investmentsCartsInfo()}
                            {amountInfo()}
                            {payNowButton()}
                        </>
                }
            </View>
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
                style={styles.snackBarStyle}
            >
                {snackBarMsg}
            </Snackbar>
        </SafeAreaView>
    )

    function payNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('PaymentMethod')}
                style={styles.payNowButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    PAY NOW
                </Text>
            </TouchableOpacity>
        )
    }

    function amountInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Amount to be paid
                </Text>
                <Text style={{ ...Fonts.blackColor20Bold }}>
                    Rs. 1,059
                </Text>
            </View>
        )
    }

    function cartEmptyInfo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name='cart-outline'
                    color={Colors.grayColor}
                    size={50}
                />
                <Text style={{ ...Fonts.grayColor16SemiBold, marginTop: Sizes.fixPadding }}>
                    Investment Cart List is Empty
                </Text>
            </View>
        )
    }

    function updateInvestmentCarts({ id }) {
        const newList = investmentCarts.filter((item) => item.id != id);
        updateState({ investmentCarts: newList });
    }

    function investmentsCartsInfo() {

        const renderItem = ({ item }) => (
            <View style={styles.investmentCartInfoWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{
                        ...styles.fundFirstLatterWrapStyle,
                        backgroundColor: item.bgColor,
                    }}>
                        <Text style={{ ...Fonts.whiteColor14Bold }}>
                            {item.fund.charAt(0)}
                        </Text>
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.fund}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            Rs. {item.investmentAmount}
                        </Text>
                    </View>
                </View>
                <MaterialIcons
                    name="close"
                    color={Colors.grayColor}
                    size={18}
                    onPress={() => {
                        updateInvestmentCarts({ id: item.id })
                        updateState({ showSnackBar: true, snackBarMsg: `${item.fund} Remove From Cart` })
                    }}
                />
            </View>
        )
        return (
            <View>
                <FlatList
                    data={investmentCarts}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function countInfo() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.grayColor14Medium }}>
                {investmentCarts.length} Fund (one time payment)
            </Text>
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
                    Investment Cart
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
    fundFirstLatterWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    snackBarStyle: {
        position: 'absolute',
        backgroundColor: '#333333',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
    },
    payNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    },
    investmentCartInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default InvestmentCartScreen;