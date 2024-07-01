import React from "react";
import { SafeAreaView, View, StatusBar, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const BankDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {bankInfo()}
                {autoPlayInfo()}
                {setupAutoPlayButton()}
            </View>
        </SafeAreaView>
    )

    function setupAutoPlayButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AutoplayRequestSuccess', { item: item })}
                style={styles.setupAutoplayButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    SETUP AUTOPAY
                </Text>
            </TouchableOpacity>
        )
    }

    function autoPlayInfo() {
        return (
            <View style={styles.autoPlayInfoWrapStyle}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Medium }}>
                    AutoPay via Form
                </Text>
                <Text style={{ alignSelf: 'flex-start', marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14SemiBold }}>
                    Primary AutoPay
                </Text>
                <View style={styles.idAndStatusInfoWrapStyle}>
                    <View style={{ marginRight: Sizes.fixPadding * 3.0, }}>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            AutoPay ID:
                        </Text>
                        <Text style={{ ...Fonts.blackColor12SemiBold }}>
                            XXXXXX
                        </Text>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Status
                        </Text>
                        <Text style={{ ...Fonts.blackColor12SemiBold }}>
                            Approved
                        </Text>
                    </View>
                </View>
                <View style={styles.autoPlayInfoTopIconWrapStyle}>
                    <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                        *
                    </Text>
                </View>
            </View>
        )
    }

    function bankInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.bankIcon}
                        style={{ width: 26.0, height: 26.0, resizeMode: 'contain' }}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.blackColor16Medium }}>
                        {item.bankName} {item.isPrimary
                            ?
                            <Text style={{ ...Fonts.primaryColor12SemiBold }}>
                                (Primary bank)
                            </Text>
                            :
                            null
                        }
                    </Text>
                </View>
                <View style={styles.bankStatusInfoWrapStyle}>
                    <Text style={{ width: 150.0, ...Fonts.grayColor14Medium }}>
                        Status
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="check-circle" size={12} color={Colors.primaryColor} />
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            Verified
                        </Text>
                    </View>
                </View>
                {bankInfoSort({ title: 'Account Number', value: item.accountNumber })}
                {bankInfoSort({ title: 'IFSC', value: 'GTD00001458' })}
                {bankInfoSort({ title: ' Branch Name', value: 'SBI Bank' })}
            </View>
        )
    }

    function bankInfoSort({ title, value }) {
        return (
            <View style={{ marginVertical: Sizes.fixPadding - 8.0, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ width: 150.0, ...Fonts.grayColor14Medium }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {value}
                </Text>
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
    bankStatusInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 8.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    autoPlayInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 5.0,
    },
    autoPlayInfoTopIconWrapStyle: {
        paddingHorizontal: Sizes.fixPadding + 5.0,
        position: 'absolute',
        top: -8.0,
        backgroundColor: Colors.whiteColor,
    },
    idAndStatusInfoWrapStyle: {
        marginTop: Sizes.fixPadding - 5.0,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    setupAutoplayButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    }
});

export default BankDetailScreen;