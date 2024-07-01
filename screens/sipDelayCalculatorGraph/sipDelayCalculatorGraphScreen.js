import React, { useRef, useState } from "react";
import { SafeAreaView, Dimensions, View, PanResponder, ScrollView, StatusBar, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import {
    Circle,
    G,
    Rect,
    Text as SvgText,
} from 'react-native-svg';
import * as shape from 'd3-shape';

const SipDelayCalculatorGraphScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <ScrollView showVerticalLines={false}>
                    {header()}
                    {graphView()}
                    {recalculateButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function recalculateButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.recalculateButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    RE-CALCULATE
                </Text>
            </TouchableOpacity>
        )
    }

    function graphView() {

        const data1 = [10, 20, 60, 45, 50, 20, 25, 28, 80, 40, 45, 35, 75, 60, 100]
        const data2 = [10, 20, 70, 50, 55, 20, 28, 30, 90, 45, 50, 37, 79, 63, 110]

        const data = [
            {
                data: data1,
                svg: { stroke: Colors.redColor },
            },
            {
                data: data2,
                svg: { stroke: Colors.primaryColor },
            },
        ]

        const apx = (size = 0) => {
            let width = Dimensions.get('window').width;
            return (width / 750) * size;
        };
        const size = useRef(data1.length);

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

        const Tooltip = ({ x, y }) => {
            if (positionX < 0) {
                return null;
            }
            const data = data1[positionX];
            return (
                <G x={x(positionX)} key="tooltip">
                    <G
                        x={positionX > size.current / 2 ? -apx(100 + 10) : apx(10)}
                        y={y(data1[positionX]) - apx(10)}>
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
                            fill={Colors.primaryColor}
                            fontSize={apx(24)}
                        >
                            {data2[positionX]}L
                        </SvgText>
                        <Rect
                            y={-apx(20 + 24 + 20) / 2 + 20}
                            rx={apx(10)}
                            ry={apx(10)}
                            width={apx(120)}
                            height={apx(45)}
                            stroke={'#FFCCCB'}
                            fill={'#FFCCCB'}
                        />
                        <SvgText
                            x={apx(15)}
                            y={apx(40)}
                            fill={Colors.redColor}
                            fontSize={apx(24)}
                        >
                            {data}L
                        </SvgText>
                    </G>
                    <G x={x}>
                        <Circle
                            cy={y(data1[positionX])}
                            r={apx(20 / 2)}
                            stroke={Colors.whiteColor}
                            strokeWidth={apx(2)}
                            fill={Colors.redColor}
                        />
                        <Circle
                            cy={y(data2[positionX])}
                            r={apx(20 / 2)}
                            stroke={Colors.whiteColor}
                            strokeWidth={apx(2)}
                            fill={Colors.primaryColor}
                        />
                    </G>
                </G>
            );
        };

        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <View style={{ height: 250, flexDirection: 'row', }} {...panResponder.current.panHandlers}>
                    <YAxis
                        data={[0, 10, 30, 50, 70, 90, 110, 130]}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{ fill: Colors.grayColor, fontSize: 14, fontFamily: 'Montserrat_Medium', }}
                        numberOfTicks={5}
                        formatLabel={(value) => value == 0 ? '0' : `${value}L`}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: Sizes.fixPadding, }}
                        data={data}
                        contentInset={{ top: 20, bottom: 20 }}
                        animate={true}
                        curve={shape.curveNatural}
                    >
                        <Tooltip />
                    </LineChart>
                </View>
                <XAxis
                    style={styles.xAxisLableStyle}
                    data={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                    formatLabel={(value, index) => index == 0 ? '' : index}
                    contentInset={{ left: 20, right: 20 }}
                    svg={{
                        fill: Colors.grayColor,
                        fontSize: 14,
                        fontFamily: 'Montserrat_Medium',
                    }}
                />
                <View style={styles.graphDescriptionWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                        <View style={{ width: 10.0, height: 10.0, borderRadius: 5.0, backgroundColor: Colors.redColor }} />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor12Medium }}>
                            Amount Invested
                        </Text>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                        <View style={{ width: 10.0, height: 10.0, borderRadius: 5.0, backgroundColor: Colors.primaryColor }} />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor12Medium }}>
                            Amount Accumulated
                        </Text>
                    </View>
                </View>
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
                    SIP Delay Calculator
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
    recalculateButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 9.0,
    },
    graphDescriptionWrapStyle: {
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    xAxisLableStyle: {
        marginHorizontal: -10,
        borderTopColor: Colors.grayColor,
        borderTopWidth: 1.0,
        marginTop: -(Sizes.fixPadding - 5.0),
        paddingTop: Sizes.fixPadding
    }
});

export default SipDelayCalculatorGraphScreen;