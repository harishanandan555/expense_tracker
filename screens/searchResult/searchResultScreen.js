import React, { useState, createRef, useRef } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, FlatList, TouchableOpacity, TextInput, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { showRating } from "../../components/showRatingScreen";

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

const fundCategories = ['Equity', 'Balanced', 'Tax Saver', 'Debt Fund'];

const fundTypes = ['Growth', 'Devidend'];

const minInvestmentOptions = ['<= Rs.500', 'Rs.501 - Rs.2000', '>= Rs.2000'];

const ratedByOptions = ['CRISIL', 'Marningstar', 'Value Research'];

const SearchResultScreen = ({ navigation, route }) => {

    const item = route.params.item;

    var textInputRef = createRef();

    const refRBSheet = useRef();

    const [state, setState] = useState({
        search: null,
        filterOptions: [
            {
                id: '1',
                selectedValue: item.category
            },
            {
                id: '2',
                selectedValue: item.type
            },
            {
                id: '3',
                selectedValue: item.minInvestment
            },
        ],
        selectedFundCategory: fundCategories[0],
        selectedFundtypes: fundTypes[0],
        selectedMinInvestmentOption: minInvestmentOptions[0],
        selectedRatedByOption: ratedByOptions[0],
        selectedRating: 5,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        search,
        filterOptions,
        selectedFundCategory,
        selectedFundtypes,
        selectedMinInvestmentOption,
        selectedRatedByOption,
        selectedRating,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {headerWithSearchField()}
                {
                    filterOptions.length != 0
                        ?
                        filterOptionsInfo()
                        :
                        null
                }
                {searchResults()}
            </View>
            {filterSheet()}
        </SafeAreaView>
    )

    function filterSheet() {
        return (
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={520}
                openDuration={250}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: "tranparent",
                    }
                }}
            >
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding - 20.0, }}>
                    <FlatList
                        listKey="filterOptions"
                        ListHeaderComponent={
                            <>
                                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                                    Filters
                                </Text>
                                {fundCategoriesInfo()}
                                {fundTypesInfo()}
                                {minInvestmentInfo()}
                                {ratedByInfo()}
                                {ratingInfo()}
                                {showResultsAndClearAllButton()}
                            </>
                        }
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 3.0, }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </RBSheet>
        )
    }

    function showResultsAndClearAllButton() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => refRBSheet.current.close()}
                    style={styles.showResultsButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        SHOW RESULTS
                    </Text>
                </TouchableOpacity>
                <Text
                    onPress={() => refRBSheet.current.close()}
                    style={{ ...Fonts.grayColor12SemiBold }}
                >
                    Clear All
                </Text>
            </View>
        )
    }

    function ratingInfo() {

        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedRating: item })}
                style={{
                    marginRight: index == 4 ? 0.0 : Sizes.fixPadding,
                    borderColor: selectedRating == item ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedRating == item ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.ratingNumberWrapStyle,
                }}
            >
                <Text style={selectedRating == item ? { ...Fonts.whiteColor12Medium } : { ...Fonts.grayColor12Medium }}>
                    {item}
                </Text>
                <MaterialIcons
                    name="star"
                    color={Colors.orangeColor}
                    size={15}
                    style={{ marginLeft: Sizes.fixPadding - 8.0, }}
                />
            </TouchableOpacity>
        )

        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14SemiBold }}>
                    Rating
                </Text>
                <FlatList
                    listKey="rating"
                    data={[5, 4, 3, 2, 1]}
                    keyExtractor={(index) => { index }}
                    renderItem={renderItem}
                    numColumns={5}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function ratedByInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedRatedByOption: item })}
                style={{
                    borderColor: selectedRatedByOption == item ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedRatedByOption == item ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.filterOptionsWrapStyle,
                }}
            >
                <Text style={selectedRatedByOption == item ? { ...Fonts.whiteColor12Medium } : { ...Fonts.grayColor12Medium }}>
                    {item}
                </Text>
            </TouchableOpacity>
        )

        return (
            <View style={{}}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14SemiBold }}>
                    Rated By
                </Text>
                <FlatList
                    listKey="ratedBy"
                    data={ratedByOptions}
                    keyExtractor={(index) => { index }}
                    renderItem={renderItem}
                    numColumns={4}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function minInvestmentInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedMinInvestmentOption: item })}
                style={{
                    borderColor: selectedMinInvestmentOption == item ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedMinInvestmentOption == item ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.filterOptionsWrapStyle,
                }}
            >
                <Text style={selectedMinInvestmentOption == item ? { ...Fonts.whiteColor12Medium } : { ...Fonts.grayColor12Medium }}>
                    {item}
                </Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14SemiBold }}>
                    Minimum Investment
                </Text>
                <FlatList
                    listKey="minInvestment"
                    data={minInvestmentOptions}
                    keyExtractor={(index) => { index }}
                    renderItem={renderItem}
                    numColumns={4}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function fundTypesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedFundtypes: item })}
                style={{
                    borderColor: selectedFundtypes == item ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedFundtypes == item ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.filterOptionsWrapStyle,
                }}
            >
                <Text style={selectedFundtypes == item ? { ...Fonts.whiteColor12Medium } : { ...Fonts.grayColor12Medium }}>
                    {item}
                </Text>
            </TouchableOpacity>
        )

        return (
            <View style={{}}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14SemiBold }}>
                    Fund Type
                </Text>
                <FlatList
                    listKey="fundTypes"
                    data={fundTypes}
                    keyExtractor={(index) => { index }}
                    renderItem={renderItem}
                    numColumns={4}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function fundCategoriesInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedFundCategory: item })}
                style={{
                    borderColor: selectedFundCategory == item ? Colors.primaryColor : Colors.grayColor,
                    backgroundColor: selectedFundCategory == item ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.filterOptionsWrapStyle,
                }}
            >
                <Text style={selectedFundCategory == item ? { ...Fonts.whiteColor12Medium } : { ...Fonts.grayColor12Medium }}>
                    {item}
                </Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14SemiBold }}>
                    Fund Category
                </Text>
                <FlatList
                    listKey="fundCategory"
                    data={fundCategories}
                    keyExtractor={(index) => { index }}
                    renderItem={renderItem}
                    numColumns={4}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function searchResults() {

        const renderItem = ({ item }) => (
            <View style={styles.fundsWithReturnsWrapStyle}>
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
            </View>
        )
        return (
            <FlatList
                data={fundsWithReturnsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingTop: filterOptions.length == 0 ? Sizes.fixPadding * 2.0 : Sizes.fixPadding - 8.0,
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingBottom: Sizes.fixPadding * 2.0,
                }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function removeThisFilter({ id }) {
        const newList = filterOptions.filter((item) => item.id != id);
        updateState({ filterOptions: newList });
    }

    function filterOptionsInfo() {

        const renderItem = ({ item }) => (
            <View style={{ ...styles.selectedFilterOptionsWrapStyle }}>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                    {item.selectedValue}
                </Text>
                <MaterialIcons
                    name="close"
                    color={Colors.grayColor}
                    size={13}
                    style={{ marginLeft: Sizes.fixPadding, }}
                    onPress={() => removeThisFilter({ id: item.id })}
                />
            </View>
        )

        return (
            <View style={{
                marginBottom: Sizes.fixPadding,
                marginTop: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <FlatList
                    data={filterOptions}
                    keyExtractor={(item) => { item.id }}
                    renderItem={renderItem}
                    numColumns={4}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function headerWithSearchField() {
        return (
            <View style={styles.headerWithSearchFieldWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.pop()}
                    />
                </View>
                <View style={styles.searchFieldWrapStyle}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                        <Feather
                            name="search"
                            size={16}
                            color={Colors.grayColor}
                            onPress={() => textInputRef.current.focus()}
                        />
                        <TextInput
                            ref={textInputRef}
                            value={search}
                            onChangeText={(text) => updateState({ search: text })}
                            placeholder="High return fund"
                            placeholderTextColor={Colors.grayColor}
                            style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Regular }}
                            selectionColor={Colors.primaryColor}
                        />
                    </View>
                    <FontAwesome
                        name="filter"
                        size={16}
                        color={Colors.grayColor}
                        onPress={() => refRBSheet.current.open()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderColor: Colors.lightWhiteColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
    },
    headerWithSearchFieldWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    selectedFilterOptionsWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.grayColor,
        backgroundColor: Colors.whiteColor,
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
    },
    filterOptionsWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
    },
    ratingNumberWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    showResultsButtonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.5,
        borderRadius: Sizes.fixPadding * 3.0,
    }
});

export default SearchResultScreen;