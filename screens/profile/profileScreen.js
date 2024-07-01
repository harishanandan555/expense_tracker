import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from "@rneui/themed";

const ProfileScreen = ({ navigation }) => {

    const [showLogoutDialog, setshowLogoutDialog] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0, }}
                >
                    {profileInfo()}
                    {divider()}
                    {walletInfo()}
                    {profileOptions({ option: 'Account Details', optionIcon: require('../../assets/images/icons/user.png'), navigateTo: 'AccountDetail' })}
                    {profileOptions({ option: 'Bank & AutoPay', optionIcon: require('../../assets/images/icons/bank.png'), navigateTo: 'BankAndAutoPlay' })}
                    {profileOptions({ option: 'Watchlist', optionIcon: require('../../assets/images/icons/list.png'), navigateTo: 'Watchlist' })}
                    {profileOptions({ option: 'Notifications', optionIcon: require('../../assets/images/icons/bell.png'), navigateTo: 'Notification' })}
                    {profileOptions({ option: 'Investment Cart', optionIcon: require('../../assets/images/icons/shopping_cart.png'), navigateTo: 'InvestmentCart' })}
                    {profileOptions({ option: 'SIP Delay Calculator', optionIcon: require('../../assets/images/icons/calculator.png'), navigateTo: 'SIPDelayCalculator' })}
                    {profileOptions({ option: 'Saved', optionIcon: require('../../assets/images/icons/bookmark.png'), navigateTo: 'Saved' })}
                    {profileOptions({ option: 'Invite Friends', optionIcon: require('../../assets/images/icons/users.png'), navigateTo: 'InviteFriends' })}
                    {profileOptions({ option: 'Support', optionIcon: require('../../assets/images/icons/support.png'), navigateTo: 'Support' })}
                    {profileOptions({ option: 'Terms and Conditions', optionIcon: require('../../assets/images/icons/document.png'), navigateTo: 'TermsAndConditions' })}
                    {logoutInfo()}
                </ScrollView>
                {logoutDialog()}
            </View>
        </SafeAreaView >
    )

    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => { setshowLogoutDialog(false) }}
                overlayStyle={{ padding: 0.0, width: '85%', borderRadius: Sizes.fixPadding, }}
            >
                <View style={styles.dialogContentStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold, }}>
                        Sure you want to logout?
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setshowLogoutDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.primaryColor16Bold }}>
                                CANCEL
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setshowLogoutDialog(false)
                                navigation.push('SigninSignup')
                            }}
                            style={styles.logoutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Bold }}>
                                LOGOUT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay>
        )
    }

    function logoutInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setshowLogoutDialog(true)}
                style={styles.profileOptionsAndLogoutInfoWrapStyle}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/sign_out.png')}
                        style={{ width: 16.0, height: 16.0, resizeMode: 'contain' }}
                        tintColor={Colors.primaryColor}
                    />
                    <Text style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.primaryColor14SemiBold }}>
                        Logout
                    </Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.blackColor}
                    size={15}
                />
            </TouchableOpacity>
        )
    }

    function profileOptions({ option, optionIcon, navigateTo }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push(navigateTo)}
                style={styles.profileOptionsAndLogoutInfoWrapStyle}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={optionIcon}
                        style={{ width: 16.0, height: 16.0, resizeMode: 'contain' }}
                        tintColor={Colors.blackColor}
                    />
                    <Text style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor14Medium }}>
                        {option}
                    </Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.blackColor}
                    size={15}
                />
            </TouchableOpacity>
        )
    }

    function walletInfo() {
        return (
            <View style={styles.walletInfoWrapStyle}>
                <View style={styles.walletBalanceWrapStyle}>
                    <Image
                        source={require('../../assets/images/icons/wallet.png')}
                        style={{ width: 24.0, height: 24.0, resizeMode: 'contain' }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            Wallet Balance
                        </Text>
                        <Text style={{ ...Fonts.primaryColor14Bold }}>
                            Rs. 3,589.89
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('AddMoney')}
                    style={styles.addMoneyButtonWrapStyle}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        ADD MONEY
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function divider() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, height: 1.0, backgroundColor: Colors.grayColor }} />
        )
    }

    function profileInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/users/user2.png')}
                    style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                />
                <View style={{ marginLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Welcome,
                    </Text>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Samantha Smith
                    </Text>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    addMoneyButtonWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },
    walletBalanceWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    walletInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        margin: Sizes.fixPadding * 2.0,
    },
    profileOptionsAndLogoutInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoutButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        elevation: 4.0,
        borderWidth: 1.5,
        borderColor: 'rgba(124, 139, 75, 0.2)',
        shadowColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding,
        flex: 1,
    },
    cancelButtonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: Sizes.fixPadding,
        borderColor: Colors.lightWhiteColor,
        borderWidth: 1.5,
    },
    dialogContentStyle: {
        borderRadius: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0
    },
});

export default ProfileScreen;