import React, { useEffect } from "react";
import { View, Image} from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Montserrat_Light: require("../assets/assets/fonts/Montserrat-Light.ttf"),
                Montserrat_Regular: require("../assets/assets/fonts/Montserrat-Regular.ttf"),
                Montserrat_SemiBold: require("../assets/assets/fonts/Montserrat-SemiBold.ttf"),
                Montserrat_Bold: require("../assets/assets/fonts/Montserrat-Bold.ttf"),
                Montserrat_Medium: require("../assets/assets/fonts/Montserrat-Medium.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <>
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        
              
               
                
                 </View>
                 </>
        
    )
}

export default LoadingScreen;





