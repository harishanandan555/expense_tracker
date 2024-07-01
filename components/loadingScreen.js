import React, { useEffect } from "react";
import { View, Image} from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Montserrat_Light: require("../assets/fonts/Montserrat-Light.ttf"),
                Montserrat_Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
                Montserrat_SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
                Montserrat_Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
                Montserrat_Medium: require("../assets/fonts/Montserrat-Medium.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <>
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        
              {/* <Image
              source={require('../assets/images/logo_1.png')}
              style={{ height: 100, resizeMode: 'contain', width: '100%' }} ></Image>   */}
               
                
                 </View>
                 </>
        
    )
}

export default LoadingScreen;





