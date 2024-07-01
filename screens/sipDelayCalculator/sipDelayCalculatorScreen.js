import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, ScrollView, StatusBar, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Slider } from "@rneui/themed";

const { width } = Dimensions.get('window');

const SIPDelayCalculatorScreen = ({ navigation }) => {

    const [state, setState] = useState({
        investmentPeriod: 4,
        monthlyInvestment: 2000,
        rateOfReturn: 20,
        delayInStartingSip: 4,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        investmentPeriod,
        monthlyInvestment,
        rateOfReturn,
        delayInStartingSip,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {investmentPeriodInfo()}
                    {monthlyInvestmentInfo()}
                    {rateOfReturnInfo()}
                    {delayInStartingSipInfo()}
                    {calculateButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function calculateButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SIPDelayCalculatorGraph')}
                style={styles.calculateButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    CALCULATE
                </Text>
            </TouchableOpacity>
        )
    }

    function delayInStartingSipInfo() {
        const left = delayInStartingSip * (width - 45) / 12 - 1.5;
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        Delay in Starting SIP
                    </Text>
                    <View style={styles.selectedValueWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            {Math.floor(delayInStartingSip)} Months
                        </Text>
                    </View>
                </View>
                <Text style={{ ...Fonts.blackColor10Bold, width: 15, left: left, bottom: -8.0, }}>
                    {Math.floor(delayInStartingSip)}
                </Text>
                <Slider
                    value={delayInStartingSip}
                    minimumValue={1}
                    maximumValue={12}
                    onValueChange={(value) => updateState({ delayInStartingSip: value })}
                    style={{ marginHorizontal: 20.0, }}
                    trackStyle={{ height: 10.0, }}
                    thumbStyle={styles.sliderThumbStyle}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor={Colors.grayColor}
                />
            </View>
        )
    }

    function rateOfReturnInfo() {
        const left = rateOfReturn * (width - 40) / 90 - 2.0;
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
                <View style={styles.sipDelayCalculatorInfoWrapStyle}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        Expected Rate of Return (In %)
                    </Text>
                    <View style={styles.selectedValueWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            {Math.floor(rateOfReturn)}%
                        </Text>
                    </View>
                </View>
                <Text style={{
                    ...Fonts.blackColor10Bold,
                    left: rateOfReturn < 10 ? left + 15 : left,
                    bottom: -8.0,
                }}>
                    {Math.floor(rateOfReturn)}
                </Text>
                <Slider
                    value={rateOfReturn}
                    minimumValue={1}
                    maximumValue={90}
                    onValueChange={(value) => updateState({ rateOfReturn: value })}
                    style={{ marginHorizontal: 20.0, }}
                    trackStyle={{ height: 10.0, }}
                    thumbStyle={styles.sliderThumbStyle}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor={Colors.grayColor}
                />
            </View>
        )
    }

    function monthlyInvestmentInfo() {
        const left = monthlyInvestment * (width - 30) / 10000 - 1.5;
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <View style={styles.sipDelayCalculatorInfoWrapStyle}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        Monthly Investment (In Rs)
                    </Text>
                    <View style={styles.selectedValueWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            Rs. {Math.floor(monthlyInvestment)}
                        </Text>
                    </View>
                </View>
                <Text style={{
                    ...Fonts.blackColor10Bold,
                    left: monthlyInvestment == 10000 ? left - 20.0 : monthlyInvestment == 100 ? left + 10 : left,
                    bottom: -8.0,
                }}>
                    {Math.floor(monthlyInvestment)}
                </Text>
                <Slider
                    value={monthlyInvestment}
                    minimumValue={100}
                    maximumValue={10000}
                    onValueChange={(value) => updateState({ monthlyInvestment: value })}
                    style={{ marginHorizontal: 20.0, }}
                    trackStyle={{ height: 10.0, }}
                    thumbStyle={styles.sliderThumbStyle}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor={Colors.grayColor}
                />
            </View>
        )
    }

    function investmentPeriodInfo() {
        const left = investmentPeriod * (width - 45) / 10 - 1.5;
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <View style={styles.sipDelayCalculatorInfoWrapStyle}>
                    <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                        Investment Period (In Year)
                    </Text>
                    <View style={styles.selectedValueWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            {Math.floor(investmentPeriod)} Years
                        </Text>
                    </View>
                </View>
                <Text style={{ ...Fonts.blackColor10Bold, width: 15, left: left, bottom: -8.0, }}>
                    {Math.floor(investmentPeriod)}
                </Text>
                <Slider
                    value={investmentPeriod}
                    minimumValue={1}
                    maximumValue={10}
                    onValueChange={(value) => updateState({ investmentPeriod: value })}
                    style={{ marginHorizontal: 20.0, }}
                    trackStyle={{ height: 10.0, }}
                    thumbStyle={styles.sliderThumbStyle}
                    minimumTrackTintColor={Colors.primaryColor}
                    maximumTrackTintColor={Colors.grayColor}
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
                    SIP Delay Calculator
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
    selectedValueWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: Colors.lightWhiteColor,
        borderWidth: 1.0,
        alignItems: 'center', justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 4.0,
        width: 100.0,
    },
    sliderThumbStyle: {
        width: 7,
        height: 17,
        overflow: 'hidden',
        borderRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 1.5,
        borderColor: Colors.lightWhiteColor,
        borderWidth: 1.0,
        marginVertical: Sizes.fixPadding - 8.0,
    },
    calculateButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    },
    sipDelayCalculatorInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default SIPDelayCalculatorScreen;