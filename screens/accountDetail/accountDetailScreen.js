import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";

const AccountDetailScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: 'Samantha Smith',
        email: 'samanthasmith@gmail.com',
        mobileNumber: '+91 1236547890',
        password: '123456789016',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        mobileNumber,
        password,
        showBottomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePic()}
                    {nameTextField()}
                    {emailTextField()}
                    {mobileNumberField()}
                    {passwordTextField()}
                    {updateProfileButton()}
                </ScrollView>
            </View>
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { updateState({ showBottomSheet: false }) }}
            >
                <View
                    style={{
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: Sizes.fixPadding + 5.0,
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                    }}
                >
                    <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18SemiBold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium, }}>
                        Take a picture
                    </Text>
                    <Text style={{ marginVertical: Sizes.fixPadding, ...Fonts.blackColor14Medium, }}>
                        Select from gallery
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Medium }}>
                        Remove profile picture
                    </Text>
                </View>
            </BottomSheet>
        )
    }

    function updateProfileButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.updateProfileButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    UPDATE PROFILE
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Password
                </Text>
                <TextInput
                    value={password}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text) => updateState({ password: text })}
                    style={{
                        ...Fonts.blackColor16Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.0,
                    }}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    function mobileNumberField() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Mobile Number
                </Text>
                <TextInput
                    value={mobileNumber}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text) => updateState({ mobileNumber: text })}
                    style={{
                        ...Fonts.blackColor16Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.0,
                    }}
                    keyboardType="phone-pad"
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text) => updateState({ email: text })}
                    style={{
                        ...Fonts.blackColor16Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.0,
                    }}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function nameTextField() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 10.0, }}>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Name
                </Text>
                <TextInput
                    value={name}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text) => updateState({ name: text })}
                    style={{
                        ...Fonts.blackColor16Medium,
                        borderBottomColor: Colors.grayColor,
                        borderBottomWidth: 1.0,
                    }}
                />
            </View>
        )
    }

    function profilePic() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showBottomSheet: true })}
                style={{ margin: Sizes.fixPadding * 2.0, }}>
                <ImageBackground
                    source={require('../../assets/images/users/user2.png')}
                    style={{ width: 80.0, height: 80.0, alignSelf: 'center' }}
                    borderRadius={40.0}
                >
                    <View style={styles.addIconWrapStyle}>
                        <MaterialIcons name="add"
                            color={Colors.whiteColor}
                            size={16}
                        />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
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
                    Account Details
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
    addIconWrapStyle: {
        width: 20.0, height: 20.0, borderRadius: 10.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', bottom: 0.0,
        right: 5.0,
        borderWidth: 1.5,
        borderColor: Colors.whiteColor
    },
    updateProfileButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 3.0,
        marginHorizontal: Sizes.fixPadding * 8.0,
    }
});

export default AccountDetailScreen;