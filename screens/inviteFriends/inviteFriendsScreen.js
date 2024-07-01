import React from "react";
import { SafeAreaView, View, StatusBar, Image, Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const InviteFriendsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {inviteInfo()}
                {inviteAndEarnButton()}
            </View>
        </SafeAreaView>
    )

    function inviteAndEarnButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.inviteAndEarnButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    INVITE AND EARN
                </Text>
            </TouchableOpacity>
        )
    }

    function inviteInfo() {
        return (
            <View style={styles.inviteInfoWrapStyle}>
                <Image
                    source={require('../../assets/images/refer_friend.png')}
                    style={{ width: '100%', height: height / 3.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginTop: Sizes.fixPadding + 5.0, textAlign: 'center', ...Fonts.blackColor14Regular }}>
                    Earn Rs. 100 for every referral who completes
                    account opening successfully.
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
                    Invite Friends
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
    inviteAndEarnButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 8.0,
    },
    inviteInfoWrapStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
});

export default InviteFriendsScreen;