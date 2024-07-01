import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Image, Text, TouchableOpacity, FlatList, } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const banksList = [
    {
        id: '1',
        bankIcon: require('../../assets/images/paymentMethod/hdfc.png'),
        bankName: 'HDFC Bank',
        accountNumber: 'XXXX XXXX 1710',
    },
    {
        id: '2',
        bankIcon: require('../../assets/images/paymentMethod/sbi.png'),
        bankName: 'State Bank Of India',
        accountNumber: 'XXXX XXXX 2405',
        isPrimary: true,
    },
    {
        id: '3',
        bankIcon: require('../../assets/images/paymentMethod/icic.png'),
        bankName: 'ICICI Bank',
        accountNumber: 'XXXX XXXX 2808',
    },
];

const BankAndAutoPlayScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {banks()}
            </View>
        </SafeAreaView>
    )

    function banks() {
        const renderItem = ({ item }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.push('BankDetail', { item })}
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Image
                            source={item.bankIcon}
                            style={{ width: 26.0, height: 26.0, resizeMode: 'contain' }}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                            <Text style={{ flex: 1, ...Fonts.blackColor16Medium }}>
                                {item.bankName} {item.isPrimary ? <Text style={{ ...Fonts.primaryColor12SemiBold }}>(Primary bank)</Text> : null}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                {item.accountNumber}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="check-circle" size={10} color={Colors.primaryColor} />
                                <Text style={{ ...Fonts.grayColor12SemiBold }}>
                                    Verified
                                </Text>
                            </View>
                        </View>
                    </View>
                    <MaterialIcons
                        name="more-vert"
                        color={Colors.blackColor}
                        size={24}
                    />
                </TouchableOpacity>
                <View style={{ marginVertical: Sizes.fixPadding + 5.0, backgroundColor: Colors.grayColor, height: 1.0, }} />
            </View>
        )
        return (
            <FlatList
                data={banksList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={addAnotherBankButton()}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function addAnotherBankButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AddAnotherBank')}
                style={styles.addAnotherBankButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    ADD ANOTHER BANK
                </Text>
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
    addAnotherBankButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        marginVertical: Sizes.fixPadding * 2.5,
        alignSelf: 'center',
    }
});

export default BankAndAutoPlayScreen;