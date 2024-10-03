import React from "react";
import { SafeAreaView, View, StatusBar, Image } from "react-native";
import { Colors } from "../constants/styles";


const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('Onboarding')
    }, 2000)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.whiteColor} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../assets/assets/images/logo_1.png')}
                    style={{ height: 100, resizeMode: 'contain', width: '100%' }}
                />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;