import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { showRating } from "../../components/showRatingScreen";

const savedFundList = [
    {
        id: '1',
        bgColor: '#BA000D',
        fund: 'Axis Top Securities',
        rating: 5.0,
        minInvestment: '1000',
        category: 'Equity',
        returns: '+20.13%',
    },
    {
        id: '2',
        bgColor: '#6A0080',
        fund: 'HDFC Securities',
        rating: 4.0,
        minInvestment: '1000',
        category: 'Equity',
        returns: '+20.13%',
    },
    {
        id: '3',
        bgColor: '#002984',
        fund: 'ICICI Producial',
        rating: 3.0,
        minInvestment: '800',
        category: 'Equity',
        returns: '+10.13%',
    },
    {
        id: '4',
        bgColor: '#007AC1',
        fund: 'TATA Index Fund',
        rating: 3.0,
        minInvestment: '800',
        category: 'Equity',
        returns: '+10.13%',
    },
    {
        id: '5',
        bgColor: '#008BA3',
        fund: 'Sun Bank Direct Plan Growth',
        rating: 3.0,
        minInvestment: '800',
        category: 'Equity',
        returns: '+10.13%',
    },
];

const SavedScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {fundsWithReturnsInfo()}
            </View>
        </SafeAreaView>
    )

    function fundsWithReturnsInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('FundDetail', { item })}
                style={styles.fundsWithReturnsWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{
                            ...styles.fundFirstLatterWrapStyle,
                            backgroundColor: item.bgColor,
                        }}>
                            <Text style={{ ...Fonts.whiteColor14Bold }}>
                                {item.fund.charAt(0)}
                            </Text>
                        </View>
                        <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                            {item.fund}
                        </Text>
                    </View>
                    {showRating({ number: item.rating })}
                </View>
                <View style={styles.investRsAndCategoryInfoWrapStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Min Investment
                        </Text>
                        <Text style={{ ...Fonts.greenColor14Bold }}>
                            Rs.{item.minInvestment}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Category
                        </Text>
                        <Text style={{ ...Fonts.greenColor14Bold }}>
                            {item.category}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Returns
                        </Text>
                        <Text style={{ ...Fonts.redColor14Bold }}>
                            {item.returns}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                listKey="funds"
                data={savedFundList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingHorizontal: Sizes.fixPadding * 2.0, }}
                showsVerticalScrollIndicator={false}
            />
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
                    Saved
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
    fundsWithReturnsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    fundFirstLatterWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    investRsAndCategoryInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default SavedScreen;