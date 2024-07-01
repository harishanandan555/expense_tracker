import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, FlatList, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";

const watchlistData = [
    {
        id: '1',
        bgColor: '#BA000D',
        companyShortName: 'ASTRAL',
        companyFullName: 'Astral Ltd',
        investedAmount: '2,589.40',
        percentageOfStatus: 1.15,
        statusDown: true,
    },
    {
        id: '2',
        bgColor: '#002984',
        companyShortName: 'ATUL',
        companyFullName: 'Atul Ltd',
        investedAmount: '9,250.20',
        percentageOfStatus: 0.10,
        statusDown: true,
    },
    {
        id: '3',
        bgColor: '#6A0080',
        companyShortName: 'DMART',
        companyFullName: 'Avenue Supermarts Ltd',
        investedAmount: '3,394.00',
        percentageOfStatus: 1.18,
    },
    {
        id: '4',
        bgColor: '#008BA3',
        companyShortName: 'BAJAJ',
        companyFullName: 'Bajaj Finance Ltd',
        investedAmount: '3,309.00',
        percentageOfStatus: 0.67,
    },
    {
        id: '5',
        bgColor: '#007AC1',
        companyShortName: 'I MART',
        companyFullName: 'IndiaMART Intermesh...',
        investedAmount: '7,509.00',
        percentageOfStatus: 0.41,
    },
    {
        id: '6',
        bgColor: '#087F23',
        companyShortName: 'BAJAJ',
        companyFullName: 'Bajaj Auto Ltd',
        investedAmount: '9,250.20',
        percentageOfStatus: 0.10,
        statusDown: true,
    },
];

const WatchlistScreen = ({ navigation }) => {

    const [state, setState] = useState({
        watchlists: watchlistData,
        showSnackBar: false,
        snackBarMsg: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        watchlists,
        showSnackBar,
        snackBarMsg,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {
                    state.watchlists.length == 0
                        ?
                        noWatchlistInfo()
                        :
                        watchlistsInfo()
                }
            </View>
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => updateState({ showSnackBar: false })}
                style={styles.snackBarStyle}
            >
                {snackBarMsg}
            </Snackbar>
        </SafeAreaView>
    )

    function noWatchlistInfo() {
        return (
            <View style={{ flex: 1.0, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons
                    name="access-time"
                    color={Colors.grayColor}
                    size={50}
                />
                <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor16SemiBold }}>
                    Watchlist is Empty
                </Text>
            </View>
        )
    }

    function updateWatchlist({ id }) {
        const newList = watchlists.filter((item) => item.id != id);
        updateState({ watchlists: newList });
    }

    function watchlistsInfo() {
        const renderItem = ({ item }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={styles.watchlistsInfoWrapStyle}>
                    <View style={{ flex: 0.70, }}>
                        <View style={{
                            backgroundColor: item.bgColor,
                            ...styles.companyShortNameWrapStyle,
                        }}>
                            <Text style={{ ...Fonts.whiteColor10Bold }}>
                                {item.companyShortName}
                            </Text>
                        </View>
                        <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 6.0, ...Fonts.blackColor14Medium }}>
                            {item.companyFullName}
                        </Text>
                    </View>
                    <View style={styles.investmentAndStatusInfoWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            Rs. {item.investedAmount}
                        </Text>
                        <MaterialIcons
                            name="arrow-downward"
                            color={item.statusDown ? Colors.redColor : Colors.greenColor}
                            size={16}
                            style={{ marginLeft: Sizes.fixPadding - 5.0, }}
                        />
                        <Text
                            numberOfLines={1}
                            style={{ marginRight: Sizes.fixPadding - 5.0, ...item.statusDown ? { ...Fonts.redColor16SemiBold } : { ...Fonts.greenColor16SemiBold } }}
                        >
                            {item.percentageOfStatus.toFixed(2)}%
                        </Text>
                        <MaterialIcons
                            name="close"
                            color={Colors.grayColor}
                            size={18}
                            onPress={() => {
                                updateWatchlist({ id: item.id })
                                updateState({
                                    showSnackBar: true,
                                    snackBarMsg: `${item.companyFullName} Remove From Watchlist`
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: Colors.grayColor, height: 1.0, marginVertical: Sizes.fixPadding + 2.0, }} />
            </View >
        )
        return (
            <FlatList
                data={watchlists}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
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
                    Watchlist
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
    snackBarStyle: {
        position: 'absolute',
        backgroundColor: '#333333',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
    },
    companyShortNameWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding - 5.0,
        width: 60.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    investmentAndStatusInfoWrapStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    watchlistsInfoWrapStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default WatchlistScreen;