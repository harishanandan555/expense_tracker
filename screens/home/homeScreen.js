import React from "react";
import { SafeAreaView, View, Dimensions, TouchableOpacity, StatusBar, StyleSheet, FlatList, Image, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import { showRating } from "../../components/showRatingScreen";

const { width } = Dimensions.get('window');

const bannersList = [
    {
        id: '1',
        image: require('../../assets/images/banner/image1.png'),
        title: 'Make investing a habit with ',
        titleBold: 'SIPs',
        description: 'Start your journey with as little as',
        descriptionBold: 'Rs.500 per month',
    },
    {
        id: '2',
        image: require('../../assets/images/banner/image2.png'),
        title: `Beat the inflation &\n`,
        titleBold: 'Earn higher returns',
        description: 'Start your journey with as little as ',
        descriptionBold: 'Equity mutual funds',
    },
    {
        id: '3',
        image: require('../../assets/images/banner/image2.png'),
        title: `Beat the inflation &\n`,
        titleBold: 'Earn higher returns',
        description: 'Start your journey with as little as ',
        descriptionBold: 'Equity mutual funds',
    },
];

const categoriesList = [
    {
        id: '1',
        categoryIcon: require('../../assets/images/category/category1.png'),
        category: 'High Return'
    },
    {
        id: '2',
        categoryIcon: require('../../assets/images/category/category2.png'),
        category: 'Tax saving'
    },
    {
        id: '3',
        categoryIcon: require('../../assets/images/category/category3.png'),
        category: 'Low Risk'
    },
    {
        id: '4',
        categoryIcon: require('../../assets/images/category/category4.png'),
        category: 'Low Risk'
    },
    {
        id: '5',
        categoryIcon: require('../../assets/images/category/category5.png'),
        category: 'SIP Worth rs.500'
    },
    {
        id: '6',
        categoryIcon: require('../../assets/images/category/category6.png'),
        category: 'Better than FD'
    },
    {
        id: '7',
        categoryIcon: require('../../assets/images/category/category7.png'),
        category: 'Equity Funds'
    },
    {
        id: '8',
        categoryIcon: require('../../assets/images/category/category8.png'),
        category: 'Debt Funds'
    },
    {
        id: '9',
        categoryIcon: require('../../assets/images/category/category9.png'),
        category: 'Balanced Funds'
    },
];

const fundsWithReturnsList = [
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
];

const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {banners()}
                            {features()}
                            {categoryInfo()}
                            {fundsWithReturnsInfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                />
            </View>
        </SafeAreaView>
    )

    function fundsWithReturnsInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
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
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Funds With Best Returns
                </Text>
                <FlatList
                    listKey="funds"
                    data={fundsWithReturnsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                />
            </View>
        )
    }

    function categoryInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('Category', { item })}
                style={styles.categoryWrapStyle}
            >
                <Image
                    source={item.categoryIcon}
                    style={styles.categoryIconStyle}
                />
                <View style={{ height: 1.0, backgroundColor: '#E6E6E6' }} />
                <Text numberOfLines={1} style={{ marginHorizontal: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.blackColor12Medium }}>
                    {item.category}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={styles.categoryInfoWrapStyle}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    Category
                </Text>
                <FlatList
                    listKey="categories"
                    data={categoriesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={3}
                />
            </View>
        )
    }

    function features() {
        return (
            <View style={styles.featuresWrapStyle}>
                {featuresSort({ featureIcon: require('../../assets/images/icons/saving.png'), feature: 'Big Savings A/c' })}
                {featuresSort({ featureIcon: require('../../assets/images/icons/goal.png'), feature: 'Goal Planning' })}
                {featuresSort({ featureIcon: require('../../assets/images/icons/insurance.png'), feature: 'Insurance' })}
            </View>
        )
    }

    function featuresSort({ featureIcon, feature }) {
        return (
            <View style={{ alignItems: 'center', flex: 1, }}>
                <View style={styles.featuresIconWrapStyle}>
                    <Image
                        source={featureIcon}
                        style={{ width: 40.0, height: 40.0, resizeMode: 'contain' }}
                        tintColor={Colors.whiteColor}
                    />
                </View>
                <Text numberOfLines={1} style={{ textAlign: 'center', ...Fonts.blackColor12Medium }}>
                    {feature}
                </Text>
            </View>
        )
    }

    function banners() {
        const renderItem = ({ item }) => (
            <LinearGradient
                colors={[Colors.primaryColor, Colors.lightPrimaryColor]}
                style={styles.bannerWrapStyle}
            >
                <Image
                    source={item.image}
                    style={{ width: 80.0, height: 80.0, resizeMode: 'contain' }}
                />
                <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
                    <Text >
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                            {item.title}
                        </Text>
                        <Text style={{ ...Fonts.lightPrimaryColor18Bold }}>
                            {item.titleBold}
                        </Text>
                    </Text>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        {item.description}{`\n`}
                        <Text style={{ ...Fonts.lightPrimaryColor12Bold }}>
                            {item.descriptionBold}
                        </Text>
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('InvestNow', {
                            item: {
                                bgColor: '#BA000D',
                                fund: 'Axis Top Securities',
                                rating: 5.0,
                                minInvestment: '1000',
                                category: 'Equity',
                                returns: '+20.13%',
                            }
                        })}
                        style={styles.investNowButtonStyle}
                    >
                        <Text style={{ ...Fonts.primaryColor12Bold }}>
                            Invest Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <FlatList
                    data={bannersList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding, }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Hey Samantha
                    </Text>
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                        Today is a good day to start
                    </Text>
                </View>
                <Image
                    source={require('../../assets/images/users/user1.png')}
                    style={{ width: 50.0, height: 50.0, borderRadius: 25.0, }}
                />
            </View>
        )
    }
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
    investNowButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignSelf: 'flex-start',
        marginTop: Sizes.fixPadding,
    },
    bannerWrapStyle: {
        width: 350.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        flexDirection: 'row',
        padding: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
    },
    featuresIconWrapStyle: {
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featuresWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    categoryWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: '#E6E6E6',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        marginRight: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        maxWidth: width / 3.0 - 20.0,
    },
    categoryIconStyle: {
        width: 40.0,
        height: 40.0,
        resizeMode: 'contain',
        marginVertical: Sizes.fixPadding + 5.0,
        alignSelf: 'center',
    },
    categoryInfoWrapStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding + 5.0,
        marginLeft: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding,
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

export default HomeScreen;