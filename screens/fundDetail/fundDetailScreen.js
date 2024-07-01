import React, { useRef, useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, Dimensions, StyleSheet, PanResponder, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { showRating } from "../../components/showRatingScreen";
import {
    Circle,
    G,
    Path,
    Svg,
    Rect,
    Text as SvgText,
} from "react-native-svg";
import * as shape from 'd3-shape';
import { AreaChart, XAxis } from 'react-native-svg-charts';
import { Snackbar } from "react-native-paper";

const { width } = Dimensions.get('window');

const durationsList = ['1 Y Back', '3 Y Back', '5 Y Back'];

const fundsReturnsAverage = ['17.7%', '12.2%', '7.5%', '14.7%'];

const categoryAverage = ['19.4%', '6.1%', '3.2%', ''];

const rankWithinAverage = ['6', '1', '1', ''];

const holdersList = [
    {
        id: '1',
        holder: 'Dr.Reddy’s Labroratories',
        percentOfAssets: '10.4%',
    },
    {
        id: '2',
        holder: 'Sun Pharmaceutical Inds.Ltd.',
        percentOfAssets: '10.4%',
    },
    {
        id: '3',
        holder: 'Divi’s Labroratories',
        percentOfAssets: '9.99%',
    }
];

const pastPerformanceList = [
    {
        id: '1',
        time: '1 Month',
        fund: +2.62,
        category: -100,
    },
    {
        id: '2',
        time: '3 Month',
        fund: +35.62,
        category: +44.93,
    },
    {
        id: '3',
        time: '6 Month',
        fund: -15.62,
        category: -100,
    },
    {
        id: '4',
        time: '1 Year',
        fund: +2.62,
        category: -100,
    },
    {
        id: '5',
        time: '3 Year',
        fund: +98.52,
        category: -96.52,
    },
    {
        id: '6',
        time: '5 Year',
        fund: +98.52,
        category: -96.52,
    },
];

const FundDetailScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        tooltipPos: { x: 0, y: 0, visible: false, value: 0 },
        isSIP: true,
        selectedDuration: durationsList[0],
        isFundInfo: true,
        showSnackBar: false,
        isFavorite: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        tooltipPos,
        isSIP,
        selectedDuration,
        isFundInfo,
        showSnackBar,
        isFavorite,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0, }}
                >
                    {fundInfo()}
                    <GraphView />
                    {sipAndOneTimeCalculatorInfo()}
                    {durationInfo()}
                    {returnsInfo()}
                    {holdingInfo()}
                    {riskometerInfo()}
                    {fundInformation()}
                    {pastPerformanceInfo()}
                </ScrollView>
                {investNowButton()}
            </View>
            <Snackbar
                style={styles.snackBarStyle}
                onDismiss={() => updateState({ showSnackBar: false })}
                visible={showSnackBar}
            >
                {isFavorite
                    ?
                    'Added to save'
                    :
                    'Removed from save'
                }
            </Snackbar>
        </SafeAreaView>
    )

    function investNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('InvestNow', { item: item, investmentSelection: isSIP ? 'SIP' : 'One Time' })}
                style={styles.investNowButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    INVEST NOW
                </Text>
            </TouchableOpacity>
        )
    }

    function pastPerformanceInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Past Performance
                </Text>
                <View style={styles.fundAndCategoryHeaderStyle}>
                    <Text style={{ textAlign: 'right', width: 115.0, ...Fonts.grayColor14Bold }}>
                        Fund
                    </Text>
                    <Text style={{ textAlign: 'right', flex: 1, ...Fonts.grayColor14Bold }}>
                        Category
                    </Text>
                </View>
                {pastPerformanceList.map((item, index) => (
                    <View key={item.id}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: 75.0, ...Fonts.grayColor14Medium }}>
                                {item.time}
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                <View style={{ alignItems: 'center', width: 60.0, }}>
                                    <Text style={item.fund <= 0 ? { ...Fonts.redColor14SemiBold } : { ...Fonts.greenColor14SemiBold }}>
                                        {item.fund > 0 ? `+` : null}{item.fund}%
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: Sizes.fixPadding, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1, height: 1.0, backgroundColor: Colors.grayColor }}>
                                    </View>
                                    <View style={styles.fundVsCategoryWrapStyle}>
                                        <Text style={{ ...Fonts.grayColor10SemiBold }}>VS</Text>
                                    </View>
                                    <View style={{ flex: 1, height: 1.0, backgroundColor: Colors.grayColor }}>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', width: 60.0, }}>
                                    <Text numberOfLines={1} style={item.category <= 0 ? { ...Fonts.redColor14SemiBold } : { ...Fonts.greenColor14SemiBold }}>
                                        {item.category > 0 ? `+` : null}{item.category}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {
                            pastPerformanceList.length - 1 == index
                                ?
                                null
                                :
                                <View style={{ marginVertical: Sizes.fixPadding, height: 1.0, backgroundColor: Colors.grayColor }} />
                        }
                    </View>
                ))}
            </View>
        )
    }

    function fundInformation() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Fund Information
                </Text>
                {fundAndAMCOptions()}
                {fundInfoSort({ title1: 'Fund Type', value1: 'Open End', title2: 'Plan', value2: 'Growth' })}
                {fundInfoSort({ title1: 'Scheme Size', value1: 'Rs. 10,997.90 Cr', title2: 'Expense Ratio', value2: '0.47%' })}
                {fundInfoSort({ title1: 'Cash Holding', value1: '-1.30%', title2: 'As on Date', value2: '31 Mar 2020' })}
            </View>
        )
    }

    function fundInfoSort({ title1, value1, title2, value2 }) {
        return (
            <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 150 }}>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        {title1}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor12SemiBold }}>
                        {value1}
                    </Text>
                </View>
                <View>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        {title2}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor12SemiBold }}>
                        {value2}
                    </Text>
                </View>
            </View>
        )
    }

    function fundAndAMCOptions() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ isFundInfo: true })}
                    style={{ marginRight: Sizes.fixPadding * 2.0, }}
                >
                    <Text style={isFundInfo ? { ...Fonts.primaryColor14Medium } : { ...Fonts.blackColor14Medium }}>
                        Fund Info
                    </Text>
                    <View style={{ height: 1.0, backgroundColor: isFundInfo ? Colors.primaryColor : Colors.whiteColor }} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ isFundInfo: false })}
                >
                    <Text style={!isFundInfo ? { ...Fonts.primaryColor14Medium } : { ...Fonts.blackColor14Medium }}>
                        AMC Info
                    </Text>
                    <View style={{ height: 1.0, backgroundColor: isFundInfo ? Colors.whiteColor : Colors.primaryColor }} />
                </TouchableOpacity>
            </View>
        )
    }

    function riskometerInfo() {
        const maxPercentage = 100;

        const generateCoordinates = (percent) => {
            const a = (percent * 2 * Math.PI) / maxPercentage;
            const x = Math.cos(a);
            const y = Math.sin(a);
            return [x, y];
        };

        const PieChart = ({ style, data, size }) => {
            const radius = size / 2;
            const viewBox = `-${radius} -${radius} ${size} ${size}`;
            let cumulativePercent = 0;

            return (
                <View style={[style, { width: size, height: size }]}>
                    <Svg
                        width={size}
                        height={size}
                        viewBox={viewBox}
                        style={{ transform: [{ rotate: '-180deg' }] }}>
                        {data.map(slice => {
                            const largeArcFlag = slice.percent > maxPercentage / 2 ? 1 : 0;
                            const xAxisRotation = 0;
                            const sweepFlag = 1;
                            const scaleValue = slice.percentScale / maxPercentage;
                            const [startX, startY] = generateCoordinates(cumulativePercent);
                            const [endX, endY] = generateCoordinates(
                                (cumulativePercent += slice.percent)
                            );

                            const m = `M ${startX * radius} ${startY * radius}`;
                            const a = `A ${radius} ${radius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX *
                                radius} ${endY * radius}`;
                            const l = 'L 0 0';

                            const offset = radius * 0.07;
                            const offsetX = offset * (startX + endX + 1);
                            const offsetY = offset * (startY + endY + 1);

                            return (
                                <G key={slice.id} transform={`translate(${offsetX}, ${offsetY})scale(${scaleValue})`}>
                                    <Path d={`${m} ${a} ${l}`} fill={slice.color} />
                                </G>
                            );
                        })}
                        <Svg height="80" width="80">
                            <Circle cx="5" cy="10" r="30" fill="white" />
                        </Svg>
                    </Svg>
                    <Text style={{ position: 'absolute', top: -10.0, ...Fonts.grayColor12SemiBold, left: 65.0, }}>
                        Moderate
                    </Text>
                    <Text style={{ position: 'absolute', top: 5.0, ...Fonts.grayColor12SemiBold, left: -20.0 }}>
                        {`Moderate\nLow`}
                    </Text>
                    <Text style={{ position: 'absolute', left: -20.0, top: 60.0, ...Fonts.grayColor12SemiBold, }}>
                        Low
                    </Text>
                    <Text style={{ position: 'absolute', right: -20.0, top: 5.0, ...Fonts.grayColor12SemiBold }}>
                        {`Moderate\nHigh`}
                    </Text>
                    <Text style={{ position: 'absolute', right: -20.0, top: 60.0, ...Fonts.grayColor12SemiBold, }}>
                        High
                    </Text>
                </View>
            );
        };

        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    Riskometer
                </Text>
                <View style={{ paddingTop: Sizes.fixPadding * 2.0, height: 125.0, alignItems: 'center', }}>
                    <PieChart
                        style={{ alignSelf: 'center' }}
                        size={200}
                        data={[
                            {
                                id: 1,
                                percent: 10,
                                percentScale: 70,
                                color: '#96FAA0',
                            },
                            {
                                id: 2,
                                percent: 10,
                                percentScale: 70,
                                color: '#6EC239',
                            },
                            {
                                id: 3,
                                percent: 10,
                                percentScale: 70,
                                color: '#F9CA24',
                            },
                            {
                                id: 4,
                                percent: 10,
                                percentScale: 70,
                                color: '#FB9435',
                            },
                            {
                                id: 5,
                                percent: 10,
                                percentScale: 70,
                                color: '#FD0505',
                            },
                        ]}
                    />
                </View>
            </View>
        )
    }

    function holdingInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 2.0, ...Fonts.blackColor16SemiBold }}>
                    Holding
                </Text>
                <View style={styles.holdingInfoTitleWrapStyle}>
                    <Text style={{ ...Fonts.grayColor14SemiBold }}>
                        Name
                    </Text>
                    <Text style={{ width: 60.0, ...Fonts.grayColor14SemiBold }}>
                        Assets%
                    </Text>
                </View>
                {
                    holdersList.map((item, index) => (
                        <View
                            key={index}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                {item.holder}
                            </Text>
                            <Text style={{ width: 60.0, ...Fonts.primaryColor12Medium }}>
                                {item.percentOfAssets}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function returnsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Returns
                </Text>
                <View>
                    <View style={styles.returnPartsWrapSTyle}>
                        <Text style={{ flex: 1, textAlign: 'center', ...Fonts.grayColor14SemiBold }}>
                            1Y
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'center', ...Fonts.grayColor14SemiBold }}>
                            3Y
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'center', ...Fonts.grayColor14SemiBold }}>
                            5Y
                        </Text>
                        <Text style={{ flex: 1, textAlign: 'center', ...Fonts.grayColor14SemiBold }}>
                            All
                        </Text>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 120.0, ...Fonts.grayColor12Medium }}>
                            Funds Returns
                        </Text>
                        <View style={styles.returnsWrapStyle}>
                            {fundsReturnsAverage.map((item, index) => (
                                <Text key={index} style={{ ...Fonts.blackColor12Medium, textAlign: 'center', flex: 1 }}>
                                    {item}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding - 2.0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 120.0, ...Fonts.grayColor12Medium }}>
                            Category Average
                        </Text>
                        <View style={styles.returnsWrapStyle}>
                            {categoryAverage.map((item, index) => (
                                <Text key={index} style={{ ...Fonts.blackColor12Medium, textAlign: 'center', flex: 1 }} >
                                    {item.length == 0 ? `-` : item}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 120.0, ...Fonts.grayColor12Medium }}>
                            Rank Within
                        </Text>
                        <View style={styles.returnsWrapStyle}>
                            {rankWithinAverage.map((item, index) => (
                                <Text key={index} style={{ ...Fonts.blackColor12Medium, textAlign: 'center', flex: 1 }} >
                                    {item.length == 0 ? `-` : item}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function durationInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor14Medium }}>
                    Duration
                </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding, }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            durationsList.map((item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => updateState({ selectedDuration: item })}
                                    key={index} style={{
                                        borderColor: selectedDuration == item ? Colors.primaryColor : Colors.grayColor,
                                        backgroundColor: selectedDuration == item ? Colors.primaryColor : Colors.whiteColor,
                                        ...styles.durationWrapStyle,
                                    }}>
                                    <Text style={selectedDuration == item ? { ...Fonts.whiteColor12Medium } : { ...Fonts.primaryColor12Medium }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </View >
        )
    }

    function sipAndOneTimeCalculatorInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    SIP / One Time Calculator
                </Text>
                {sipAndOneTimePasswordOptions()}
                <View style={{ marginTop: Sizes.fixPadding, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Minimum SIP Amount
                        </Text>
                        <Text style={{ ...Fonts.blackColor12SemiBold }}>
                            Rs.1000
                        </Text>
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding - 5.0, backgroundColor: Colors.grayColor, height: 1.0, }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Amount per month
                        </Text>
                        <Text style={{ ...Fonts.blackColor12SemiBold }}>
                            Rs.1000
                        </Text>
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding - 5.0, backgroundColor: Colors.grayColor, height: 1.0, }} />
                </View>
            </View>
        )
    }

    function sipAndOneTimePasswordOptions() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ isSIP: true })}
                    style={{ marginRight: Sizes.fixPadding * 2.0, }}
                >
                    <Text style={isSIP ? { ...Fonts.primaryColor14Medium } : { ...Fonts.blackColor14Medium }}>
                        SIP
                    </Text>
                    <View style={{ height: 1.0, backgroundColor: isSIP ? Colors.primaryColor : Colors.whiteColor }} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ isSIP: false })}
                >
                    <Text style={!isSIP ? { ...Fonts.primaryColor14Medium } : { ...Fonts.blackColor14Medium }}>
                        One Time
                    </Text>
                    <View style={{ height: 1.0, backgroundColor: isSIP ? Colors.whiteColor : Colors.primaryColor }} />
                </TouchableOpacity>
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor, height: 1.0,
                marginVertical: Sizes.fixPadding,
            }} />
        )
    }

    function fundInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding * 2.0,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{
                            backgroundColor: item.bgColor,
                            ...styles.fundFirstCharacterWrapStyle,
                        }}>
                            <Text style={{ ...Fonts.whiteColor14Bold }}>
                                {item.fund.charAt(0)}
                            </Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {item.fund}
                            </Text>
                            <Text>
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    Plan - Growth { }
                                </Text>
                                <Text style={{ ...Fonts.greenColor14Bold }}>
                                    {item.category}
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, }}>
                        {showRating({ number: item.rating })}
                    </View>
                </View>
                {divider()}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 0.75, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Min Investment
                        </Text>
                        <Text style={{ ...Fonts.greenColor14Bold }}>
                            Rs.{item.minInvestment}
                        </Text>
                    </View>
                    <View style={{ flex: 0.75, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            AUM (Crs)
                        </Text>
                        <Text style={{ ...Fonts.greenColor14Bold }}>
                            Rs.5.275.75
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor12Regular }}>
                            Returns
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    1Y
                                </Text>
                                <Text style={{ ...Fonts.redColor14Bold }}>
                                    +20.13%
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    1Y
                                </Text>
                                <Text style={{ ...Fonts.redColor14Bold }}>
                                    +65.13%
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: Sizes.fixPadding, alignSelf: 'flex-end' }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        14.90%
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        +1.03% 1 Day Return
                    </Text>
                </View>
            </View>

        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.pop()}
                    />
                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor18SemiBold }}>
                        {item.fund}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="share"
                        color={Colors.blackColor}
                        size={20}
                        style={{ marginRight: Sizes.fixPadding, }}
                    />
                    <MaterialIcons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        color={Colors.blackColor}
                        size={24}
                        onPress={() => { updateState({ isFavorite: !isFavorite, showSnackBar: true }) }}
                    />
                </View>
            </View>
        )
    }
}

const GraphView = () => {
    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        return (width / 750) * size;
    };

    const [xAxisLabels, setXAxisLabels] = useState([
        '1D',
        '1W',
        '1M',
        '3M',
        '1Y',
        '5Y',
        'ALL',
    ]);

    const [dateList, setDateList] = useState([
        '4 Nov 2021',
        '7 Nov 2021',
        '15 Nov 2021',
        '20 Nov 2021',
        '24 Nov 2021',
        '1 Dec 2021',
        '5 Dec 2021',
    ]);

    const [navRateList, setnavRateList] = useState([
        15.0,
        20.30,
        40.50,
        15.30,
        30.15,
        12.00,
        50.00,
    ]);
    const size = useRef(dateList.length);

    const [positionX, setPositionX] = useState(-1);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderRelease: () => {
                setPositionX(-1);
            },
        })
    );

    const updatePosition = (x) => {
        const YAxisWidth = apx(130);
        const x0 = apx(0);
        const chartWidth = apx(750) - YAxisWidth - x0;
        const xN = x0 + chartWidth;
        const xDistance = chartWidth / size.current;
        if (x <= x0) {
            x = x0;
        }
        if (x >= xN) {
            x = xN;
        }

        let value = ((x - x0) / xDistance).toFixed(0);
        if (value >= size.current - 1) {
            value = size.current - 1;
        }

        setPositionX(Number(value));
    };

    const Tooltip = ({ x, y, ticks }) => {
        if (positionX < 0) {
            return null;
        }

        const date = dateList[positionX];

        return (
            <G x={x(positionX)} key="tooltip">
                <G
                    x={positionX > size.current / 2 ? -apx(300 + 10) : apx(10)}
                    y={y(navRateList[positionX]) - apx(10)}>
                    <Rect
                        y={-apx(24 + 24 + 20) / 2}
                        rx={apx(10)}
                        ry={apx(10)}
                        width={apx(200)}
                        height={apx(90)}
                        stroke={Colors.lightPrimaryColor}
                        fill={Colors.lightPrimaryColor}
                    />
                    <SvgText x={apx(20)} fill={Colors.grayColor} fontSize={apx(24)}>
                        {date}
                    </SvgText>
                    <SvgText
                        x={apx(20)}
                        y={apx(24 + 20)}
                        fontSize={apx(24)}
                        fontWeight="600"
                        fill={Colors.primaryColor}
                    >
                        NAV:{navRateList[positionX].toFixed(2)}
                    </SvgText>
                </G>

                <G x={x}>
                    <Circle
                        cy={y(navRateList[positionX])}
                        r={apx(20 / 2)}
                        stroke={Colors.whiteColor}
                        strokeWidth={apx(2)}
                        fill={Colors.primaryColor}
                    />
                </G>
            </G>
        );
    };

    const BorderLine = ({ line }) => (
        <Path
            key={'line'}
            d={line}
            stroke={'rgb(124, 139, 75)'}
            fill={'none'}
            strokeWidth={2}
        />
    );

    return (
        <View>
            <View
                style={{
                    width: width - 40,
                    height: 110,
                    alignSelf: 'center',
                }}>
                <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
                    <AreaChart
                        style={{ height: 110.0, marginTop: Sizes.fixPadding - 20.0, }}
                        data={navRateList}
                        gridMin={1}
                        curve={shape.curveNatural}
                        svg={{ fill: 'rgba(124, 139, 75, 0.2)' }}
                        contentInset={{ top: 20.0, left: 5.0, right: 5.0, }}
                    >
                        <BorderLine />
                        <Tooltip />
                    </AreaChart>
                </View>
            </View>
            <XAxis
                style={{
                    alignSelf: 'stretch',
                    height: apx(60),
                    marginTop: Sizes.fixPadding - 20.0,
                }}
                numberOfTicks={7}
                data={navRateList}
                formatLabel={(value, index) => xAxisLabels[value]}
                contentInset={{
                    left: apx(80),
                    right: apx(80),
                }}
                svg={{
                    fontSize: apx(22),
                    fill: Colors.grayColor,
                    y: apx(20),
                    fontFamily: 'Montserrat_Medium',
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    fundFirstCharacterWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        marginRight: Sizes.fixPadding,
    },
    returnsWrapStyle: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    returnPartsWrapSTyle: {
        marginLeft: Sizes.fixPadding * 12.0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    holdingInfoTitleWrapStyle: {
        marginBottom: Sizes.fixPadding - 6.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    fundAndCategoryHeaderStyle: {
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding - 6.0,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
    },
    fundVsCategoryWrapStyle: {
        marginHorizontal: Sizes.fixPadding - 5.0,
        width: 24.0,
        height: 24.0,
        borderRadius: 12.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor, borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    snackBarStyle: {
        backgroundColor: '#333333',
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
    },
    investNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        position: 'absolute',
        bottom: 20.0,
        left: Sizes.fixPadding * 9.0,
        right: Sizes.fixPadding * 9.0,
    }
});

export default FundDetailScreen;