import React, { useRef, useState, useCallback } from "react";
import { BackHandler, Animated, SafeAreaView, View, StatusBar, StyleSheet, Image, Dimensions, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../../assets/assets/images/saving_money.png'),
        title: "Manage Transactions",
        description: "Log and organize income and expenses.",
    },
    {
        id: '2',
        onboardingImage: require('../../assets/assets/images/work_portfolio.png'),
        title: '"Manage Categories"',
        description: "Create and organize transaction categories.",
    },
    {
        id: '3',
        onboardingImage: require('../../assets/assets/images/investment_in_stocks.png'),
        title: "History with Bar Chart",
        description: "View yearly and monthly trends.",
    },
];

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const [onboardingScreens, setOnboardingScreen] = useState(onboardingScreenList);
    const [activeSlide, setActiveSlide] = useState(0);

    const flatListRef = useRef();

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={{ flex: 0.84, alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                        source={item.onboardingImage}
                        style={{ width: width - 40.0, height: 374.0, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor22SemiBold }}>
                        {item.title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.whiteColor14Regular }}>
                        {item.description}
                    </Text>
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <>
                    <Carousel
                        ref={flatListRef}
                        data={onboardingScreens}
                        sliderWidth={width}
                        itemWidth={width}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        autoplay={true}
                        loop={true}
                        autoplayInterval={3500}
                        slideStyle={{ width: width }}
                    />
                    {pagination()}
                    {skipNextAndLogin()}
                </>
            </View>
            {
                backClickCount == 1
                    ?
                    <Animated.View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </Animated.View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function skipNextAndLogin() {
        return (
            <View style={styles.skipAndDoneWrapStyle}>
                {activeSlide != 2
                    ?
                    <Text
                        onPress={() => navigation.push('/signin')}
                        style={{ ...Fonts.whiteColor14Bold }}>
                        Skip
                    </Text>
                    :
                    <Text>
                    </Text>
                }
                {
                    activeSlide == 2
                        ?
                        <Text
                            onPress={() => navigation.push('/signin')}
                            style={{ ...Fonts.lightPrimaryColor14Bold }}
                        >
                            Sign in
                        </Text>
                        :
                        <Text
                            onPress={() => {
                                if (activeSlide == 0) {
                                    flatListRef.current.snapToItem(1);
                                }
                                else if (activeSlide == 1) {
                                    flatListRef.current.snapToItem(2);
                                }
                            }}
                            style={{ ...Fonts.lightPrimaryColor14Bold }}
                        >
                            Next
                        </Text>
                }
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={onboardingScreens.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    position: 'absolute',
                    bottom: 40.0,
                    alignSelf: 'center'
                }}
                dotStyle={styles.activeDotStyle}
                inactiveDotStyle={styles.dotStyle}
                inactiveDotScale={0.8}
            />
        );
    }
}

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 15.0,
        width: 9.0,
        height: 9.0,
        borderRadius: 4.5,
    },
    activeDotStyle: {
        backgroundColor: Colors.lightPrimaryColor,
        borderRadius: 20.0,
        height: 8.0,
        width: 30.0,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    skipAndDoneWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20.0,
        left: 20.0,
        right: 20.0,
    },
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default OnboardingScreen;