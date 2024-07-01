import React, { useRef, useState } from 'react';
import {
    PanResponder,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet, SafeAreaView, View, StatusBar, ScrollView
} from 'react-native';
import { AreaChart, XAxis, LineChart, PieChart } from 'react-native-svg-charts';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import {
    Circle,
    G,
    Line,
    Path,
    Rect,
    Text as SvgText,
} from 'react-native-svg';
import * as shape from 'd3-shape';

const { width } = Dimensions.get('window');

const portfolioSummeryList = [
    {
        id: '1',
        title: 'Mutual Funds',
        graphValues: [102000, 120000, 140000, 110000, 133000, 142500, 152500, 131100, 133500, 152300, 125400, 153000,],
        dateAndTime: 'as of  Oct 17 2020, 9:45 am',
        investedAmount: '13,250.59',
        overallReturns: '45,580.96',
        currentValue: '15,589.36',
    },
    {
        id: '2',
        title: 'Stocks',
        graphValues: [153000, 125400, 142300, 133500, 131100, 152500, 142500, 133000, 110000, 140000, 120000, 102000,],
        dateAndTime: 'as of  Oct 17 2020, 9:45 am',
        investedAmount: '13,250.59',
        overallReturns: '45,580.96',
        currentValue: '10,589.36',
        currentValueDown: true,
    },
    {
        id: '3',
        title: 'Bonds',
        graphValues: [153000, 125400, 142300, 133500, 131100, 152500, 142500, 133000, 110000, 140000, 120000, 102000,],
        dateAndTime: 'as of  Oct 17 2020, 9:45 am',
        investedAmount: '13,250.59',
        overallReturns: '45,580.96',
        currentValue: '10,589.36',
        currentValueDown: true,
    },
];

const PortfolioScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0, }}
                >
                    {currentInvestmentInfoWithGraph()}
                    {portfoliaSummaryInfo()}
                    {analyticsInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function analyticsInfo() {
        const data = [90, 50, 30,];

        const colors = ['#757DE8', '#D05CE3', '#FF6090',];

        const pieData = data
            .filter((value) => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: colors[index],
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,

            }))

        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Analytics
                </Text>
                <View style={{ marginVertical: Sizes.fixPadding + 5.0, height: 180, justifyContent: 'center', }}>
                    <PieChart
                        style={{ height: 180, }}
                        data={pieData}
                        innerRadius={'89%'}
                    >
                        <Text style={{ textAlign: 'center', top: 80.0, ...Fonts.blackColor16Bold }}>
                            Rs. 31,70,152.75
                        </Text>
                    </PieChart>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="md-pie-chart" size={15} color={Colors.purpleColor} />
                        <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Mutual Funds
                            </Text>
                            <Text style={{ ...Fonts.purpleColor14SemiBold }}>
                                60.30%
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="md-pie-chart" size={15} color={Colors.pinkColor} />
                        <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Stocks
                            </Text>
                            <Text style={{ ...Fonts.pinkColor14SemiBold }}>
                                30.15%
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="md-pie-chart" size={15} color={Colors.darkPinkColor} />
                        <View style={{ marginLeft: Sizes.fixPadding - 5.0, }}>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Bonds
                            </Text>
                            <Text style={{ ...Fonts.darkPinkColor14SemiBold }}>
                                20.27%
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function portfoliaSummaryInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    Portfolio Summary
                </Text>
                {
                    portfolioSummeryList.map((item) =>
                        <View key={item.id}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigation.push('PortolioStocks')}
                                style={styles.portfolioSummeryGraphStyle}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ ...Fonts.blackColor16Medium }}>
                                            {item.title}
                                        </Text>
                                        <Text numberOfLines={1} style={{ ...Fonts.grayColor12Regular }}>
                                            {item.dateAndTime}
                                        </Text>
                                        <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                                            Invested Amount
                                        </Text>
                                        <Text style={{ ...Fonts.greenColor14SemiBold }}>
                                            Rs. {item.investedAmount}
                                        </Text>
                                    </View>
                                    <PortfolioSummeryGraphView data={item.graphValues} />
                                </View>
                                <View style={styles.portfolioReturnsAndCurrentValueWrapStyle}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                                Overall Returns
                                            </Text>
                                            <Text style={{ ...Fonts.greenColor14Medium }}>
                                                Rs. {item.overallReturns}
                                            </Text>
                                        </View>
                                        <View style={{ marginLeft: Sizes.fixPadding + 5.0, }}>
                                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                                Current Value
                                            </Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={item.currentValueDown ? { ...Fonts.redColor14Medium } : { ...Fonts.greenColor14Medium }}>
                                                    Rs. {item.currentValue}
                                                </Text>
                                                <MaterialIcons
                                                    name={item.currentValueDown ? "arrow-downward" : 'arrow-upward'}
                                                    color={item.currentValueDown ? Colors.redColor : Colors.greenColor}
                                                    size={15}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <MaterialIcons
                                        name="arrow-forward-ios"
                                        color={Colors.primaryColor}
                                        size={20}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        )
    }

    function currentInvestmentInfoWithGraph() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ ...Fonts.grayColor14Medium }}>
                        Current Investment Value
                    </Text>
                    <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                        Rs. 31,70,152.75
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Regular }}>
                        as of Dec 17 2020, 09:55 am
                    </Text>
                </View>
                <InvestmentWithGraphView />
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding + 5.0, }}>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            WithGraphView
                        </Text>
                        <Text>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                Rs.30,00,000 { }
                            </Text>
                            <Text style={{ ...Fonts.greenColor14Medium }}>
                                (+21.65%)
                            </Text>
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            Returns
                        </Text>
                        <Text style={{}}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                Rs.1,70,500.75 { }
                            </Text>
                            <Text style={{ ...Fonts.greenColor14Medium }}>
                                (+5.69%)
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    Portfolio
                </Text>
            </View>
        )
    }
}

const PortfolioSummeryGraphView = ({ data }) => {
    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        return (width / 750) * size;
    };

    const [priceList, setPriceList] = useState(data);
    const size = useRef(priceList.length);

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

        const data = priceList[positionX];

        return (
            <G x={x(positionX)} key="tooltip">
                <G
                    x={positionX > size.current / 2 ? -apx(100 + 10) : apx(10)}
                    y={y(priceList[positionX]) - apx(10)}>
                    <Rect
                        y={-apx(20 + 24 + 20) / 2}
                        rx={apx(10)}
                        ry={apx(10)}
                        width={apx(120)}
                        height={apx(45)}
                        stroke={Colors.lightPrimaryColor}
                        fill={Colors.lightPrimaryColor}
                    />
                    <SvgText
                        x={apx(15)}
                        fill={Colors.grayColor}
                        fontSize={apx(24)}
                    >
                        {data}
                    </SvgText>
                </G>

                <G x={x}>
                    <Line
                        y1={ticks[0]}
                        y2={ticks[Number(ticks.length)]}
                        stroke={Colors.primaryColor}
                        strokeWidth={apx(4)}
                        strokeDasharray={[6, 3]}
                    />
                    <Circle
                        cy={y(priceList[positionX])}
                        r={apx(20 / 2)}
                        stroke={Colors.whiteColor}
                        strokeWidth={apx(2)}
                        fill={Colors.primaryColor}
                    />
                </G>
            </G>
        );
    };

    const Shadow = ({ line }) => (
        <Path
            key={'shadow'}
            y={2}
            d={line}
            fill={'none'}
            strokeWidth={4}
            stroke={'rgba(124, 139, 75, 0.2)'}
        />
    )

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
                <LineChart
                    style={{ height: 90 }}
                    data={priceList}
                    svg={{ stroke: Colors.primaryColor }}
                    contentInset={{ top: 15, bottom: 10, left: 5.0, right: 5.0, }}
                    curve={shape.curveNatural}
                >
                    <Shadow />
                    <Tooltip />
                </LineChart>
            </View>
        </View>
    );
}

const InvestmentWithGraphView = () => {
    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        return (width / 750) * size;
    };

    const [dateList, setDateList] = useState([
        '8 May',
        '9 May',
        '10 May',
        '11 May',
        '12 May',
        '13 May',
        '14 May',
    ]);

    const [priceList, setPriceList] = useState([
        150000.0,
        200000.3,
        100000.50,
        155000.30,
        130000.15,
        120000.0,
        235000.0,
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
                    y={y(priceList[positionX]) - apx(10)}>
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
                        {`Rs.`}{priceList[positionX]}
                    </SvgText>
                </G>

                <G x={x}>
                    <Line
                        y1={ticks[0]}
                        y2={ticks[Number(ticks.length)]}
                        stroke={Colors.primaryColor}
                        strokeWidth={apx(4)}
                        strokeDasharray={[6, 3]}
                    />
                    <Circle
                        cy={y(priceList[positionX])}
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
                        data={priceList}
                        gridMin={100}
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
                data={priceList}
                formatLabel={(value, index) => dateList[value]}
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
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    portfolioSummeryGraphStyle: {
        marginBottom: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.lightWhiteColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    portfolioReturnsAndCurrentValueWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default PortfolioScreen;