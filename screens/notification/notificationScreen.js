import React, { useState, useRef } from 'react';
import { Fonts, Colors, Sizes, } from "../../constants/styles";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Animated,
    Image,
    Dimensions,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const notificationList = [
    {
        key: '1',
        title: 'Failed!',
        description: 'Your request to verify bank account has been fail. You can try after 2 days!',
        timeAgo: '35 min'
    },
    {
        key: '2',
        title: 'Success!',
        description: 'Your bank account successfully verified. Now you are able to set autoPay.',
        timeAgo: '50 min'
    },
    {
        key: '3',
        title: 'Success!',
        description: 'You successfully purchased Axis Top Securities.',
        timeAgo: '1 h'
    },
    {
        key: '4',
        title: 'Great!',
        description: 'Your autoPay request has been submitted successfully.',
        timeAgo: '2 h'
    },
];

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0, }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.notificationIconWrapStyle}>
                            <Image
                                source={require('../../assets/images/icons/bell.png')}
                                style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                                tintColor={Colors.whiteColor}
                            />
                        </View>
                        <View style={{ marginLeft: Sizes.fixPadding + 2.0, flex: 1, }}>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                                {data.item.title}
                            </Text>
                            <Text numberOfLines={2} style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Medium }}>
                                {data.item.description}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12SemiBold }}>
                                {data.item.timeAgo} ago
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View >
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

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
                    Notifications
                </Text>
            </View>
        )
    }

    function noNotifictionsInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <MaterialCommunityIcons
                    name='bell-off-outline'
                    color={Colors.grayColor}
                    size={50}
                />
                <Text style={{ ...Fonts.grayColor16SemiBold, marginTop: Sizes.fixPadding }}>
                    Notification List is Empty
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ backgroundColor: Colors.whiteColor, flex: 1, }}>
                {header()}
                {listData.length == 0 ?
                    noNotifictionsInfo()
                    :
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-Dimensions.get('window').width}
                        leftOpenValue={Dimensions.get('window').width}
                        onSwipeValueChange={onSwipeValueChange}
                        useNativeDriver={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                    />
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    {snackBarMsg}
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    notificationIconWrapStyle: {
        height: 50.0,
        width: 50.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 25.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
        elevation: 4.0,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding + 7.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    }
});

export default NotificationScreen;