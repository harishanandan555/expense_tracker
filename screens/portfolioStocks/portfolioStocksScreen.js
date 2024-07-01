import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, FlatList } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const stocksList = [
    {
        id: '1',
        bgColor: '#002984',
        fund: 'BNI-AM Indeks IDX30',
        investment: '1,000.00',
        currentValue: '0.00',
        returns: 0.00,
    },
    {
        id: '2',
        bgColor: '#6A0080',
        fund: 'Hoeizon First Fund Direct Plan Growth',
        investment: '2,000.00',
        currentValue: '1,592.59',
        returns: 0.04,
    },
    {
        id: '3',
        bgColor: '#008BA3',
        fund: 'Sun Bank Direct Plan Growth',
        investment: '1,000.00',
        currentValue: '1,592.59',
        returns: 0.00,
    },
    {
        id: '4',
        bgColor: '#087F23',
        fund: 'HDFC Securities',
        investment: '2,000.00',
        currentValue: '1,592.59',
        returns: 0.04,
    },
    {
        id: '5',
        bgColor: '#007AC1',
        fund: 'TATA Index Fund',
        investment: '1,000.00',
        currentValue: '0.00',
        returns: 0.00,
    },
    {
        id: '6',
        bgColor: '#BA000D',
        fund: 'Axis Top Securities',
        investment: '2,000.00',
        currentValue: '1,592.59',
        returns: 0.04,
    },
];

const PortfolioStocksScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {stocks()}
            </View>
        </SafeAreaView>
    )

    function stocks() {
        const renderItem = ({ item }) => (
            <View style={styles.stocksInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        ...styles.fundFirstLatterWrapStyle,
                        backgroundColor: item.bgColor,
                    }}>
                        <Text style={{ ...Fonts.whiteColor14Bold }}>
                            {item.fund.charAt(0)}
                        </Text>
                    </View>
                    <Text style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                        {item.fund}
                    </Text>
                </View>
                <View style={styles.investmentAndReturnsWrapStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Investment
                        </Text>
                        <Text style={{ ...Fonts.greenColor14Bold }}>
                            Rs.{item.investment}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Current Value
                        </Text>
                        <Text style={{ ...Fonts.greenColor14Bold }}>
                            Rs.{item.currentValue}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Returns
                        </Text>
                        <Text style={{ ...Fonts.redColor14Bold }}>
                            {item.returns.toFixed(2) > 0.00 ? '-' : null}Rs.{item.returns.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        )
        return (
            <FlatList
                data={stocksList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
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
                    Stocks
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
    fundFirstLatterWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    investmentAndReturnsWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    stocksInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: Colors.lightWhiteColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    }
});

export default PortfolioStocksScreen;