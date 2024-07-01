import React, { } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, ScrollView, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const companyPoliciesList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis tellus interdum amet convallis nisl pellentesque. Elementum eros eu ultricies urna posuere auctor.',
    'Fusce nulla cursus sed at mus in ornare. Pretium, sed aliquet vivamus ornare mattis viverra dolor at pulvinar. Nec sem odio at tristique egestas augue venenatis fermentum. Et sit commodo, vestibulum viverra tincidunt sed etiam.',
    'Vehicula mauris dictum amet non nibh massa ipsum ullamcorper. Diam viverra nisl pharetra dolor. Lorem nunc sapien interdum sapien ipsum sapien, purus commodo aliquet.'
];

const termsOfUseList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis tellus interdum amet convallis nisl pellentesque. Elementum eros eu ultricies urna posuere auctor.',
    'Fusce nulla cursus sed at mus in ornare. Pretium, sed aliquet vivamus ornare mattis viverra dolor at pulvinar. Nec sem odio at tristique egestas augue venenatis fermentum. Et sit commodo, vestibulum viverra tincidunt sed etiam.',
    'Vehicula mauris dictum amet non nibh massa ipsum ullamcorper. Diam viverra nisl pharetra dolor. Lorem nunc sapien interdum sapien ipsum sapien, purus commodo aliquet.'
];

const TermsAndConditionsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}>
                    {companyPoliciesInfo()}
                    {termsOfUseInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function termsOfUseInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Terms of Use
                </Text>
                {
                    termsOfUseList.map((item, index) => (
                        <Text
                            key={index}
                            style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Regular }}>
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function companyPoliciesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Company Policies
                </Text>
                {
                    companyPoliciesList.map((item, index) => (
                        <Text
                            key={index}
                            style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Regular }}>
                            {item}
                        </Text>
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
                    Terms and Conditions
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
});

export default TermsAndConditionsScreen;