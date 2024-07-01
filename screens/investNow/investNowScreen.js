import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from "@react-native-community/datetimepicker";

const InvestNowScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const investmentSelection = route.params.investmentSelection;

    const [state, setState] = useState({
        amount: null,
        showCalender: false,
        selectedDay: new Date().getUTCDate(),
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        amount,
        showCalender,
        selectedDay,
    } = state;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {fundInfo()}
                    {investmentAmountInfo()}
                    {sipDateInfo()}
                    {detailInfo()}
                    {investNowAndAddToCartButton()}
                    {calender()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function calender() {

        const onChange = (event, selectedDate) => {
            updateState({ selectedDay: selectedDate.getUTCDate(), showCalender: false })
        };

        return (
            showCalender && <DateTimePickerModal
                value={new Date()}
                mode="date"
                onChange={onChange}
            />
        )
    }

    function investNowAndAddToCartButton() {
        return (
            <View style={styles.investNowAndAddToCartButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('PaymentMethod')}
                    style={{
                        backgroundColor: Colors.primaryColor,
                        ...styles.investNowAndAddToCartButtonStyle,
                    }}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        INVEST NOW
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('InvestmentCart')}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        elevation: 3.0,
                        borderColor: Colors.lightWhiteColor,
                        borderWidth: 0.50,
                        ...styles.investNowAndAddToCartButtonStyle,
                    }}>
                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                        ADD TO CART
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function detailInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.primaryColor12SemiBold }}>
                    • This fund allow SIP
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', }}>
                    <Text style={{ ...Fonts.primaryColor12SemiBold, marginRight: Sizes.fixPadding - 5.0, }}>
                        •
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        By continuing I agree with the
                        <Text style={{ ...Fonts.primaryColor12SemiBold }}>Disclaimer</Text>
                        and
                        <Text style={{ ...Fonts.primaryColor12SemiBold }}>Terms and Conditions</Text>
                        of Investment Zone.
                    </Text>
                </View>
            </View>
        )
    }

    function sipDateInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => updateState({ showCalender: true })}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Image
                            source={require('../../assets/images/icons/calendar.png')}
                            style={{ width: 14.0, height: 14.0, resizeMode: 'contain' }}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                            SIP Date
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                        {selectedDay} date of every month
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding - 7.0, backgroundColor: '#E6E6E6', height: 1.0, }} />
            </View>
        )
    }

    function investmentAmountInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, alignItems: 'center', }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Investment Amount (Rs)
                </Text>
                <TextInput
                    value={amount}
                    onChangeText={(text) => updateState({ amount: text })}
                    selectionColor={Colors.primaryColor}
                    keyboardType="numeric"
                    style={styles.amountFieldStyle}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Min Invest Rs.1000
                </Text>
            </View>
        )
    }

    function fundInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{
                            backgroundColor: item.bgColor,
                            ...styles.fundFirstCharacterWrapStyle,
                        }}>
                            <Text style={{ ...Fonts.whiteColor14Bold }}>
                                {item.fund.charAt(0)}
                            </Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {item.fund}
                            </Text>
                            <Text>
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    Plan - Growth { }
                                </Text>
                                <Text style={{ ...Fonts.greenColor14Bold }}>
                                    {investmentSelection} Investment
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
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
                    {item.fund}
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
    fundFirstCharacterWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    investNowAndAddToCartButtonStyle: {
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
    },
    investNowAndAddToCartButtonWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
    amountFieldStyle: {
        ...Fonts.blackColor14Medium,
        width: '40%',
        borderBottomColor:
            Colors.grayColor,
        borderBottomWidth: 1.0,
        textAlign: 'center',
    }
});

export default InvestNowScreen;