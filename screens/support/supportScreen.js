import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const SupportScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        support: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        support,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar
                translucent={false}
                backgroundColor={Colors.primaryColor}
            />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {nameTextField()}
                    {emailTextField()}
                    {supportTextField()}
                    {submitButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.submitButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    SUBMIT
                </Text>
            </TouchableOpacity>
        )
    }

    function supportTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, }}>
                <TextInput
                    placeholder="Write here"
                    multiline={true}
                    numberOfLines={6}
                    mode="outlined"
                    value={support}
                    onChangeText={text => updateState({ support: text })}
                    style={styles.textFieldWrapStyle}
                    cursorColor={Colors.primaryColor}
                    textAlignVertical="top"
                />
            </View>

        )
    }

    function emailTextField() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding }}>
                <TextInput
                    placeholder="Email"
                    mode="outlined"
                    value={email}
                    onChangeText={text => updateState({ email: text })}
                    style={styles.textFieldWrapStyle}
                    cursorColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function nameTextField() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding }}>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={Colors.grayColor}
                    mode="outlined"
                    value={name}
                    onChangeText={text => updateState({ name: text })}
                    style={styles.textFieldWrapStyle}
                    cursorColor={Colors.primaryColor}
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
                    Support
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
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 4.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    },
    textFieldWrapStyle: {
        ...Fonts.blackColor14Medium,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
    }
})

export default SupportScreen;