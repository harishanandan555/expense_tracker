
import React, { useCallback, useState, useEffect } from "react";
import { login, validateSession } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import * as Device from 'expo-device';
import { Constants } from 'expo-constants';
//import { AsyncStorage } from "react-native";
import { BackHandler,Button, SafeAreaView,ImageBackground,TouchableWithoutFeedback,KeyboardAvoidingView, ScrollView,Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backgroundlogin from '../../assets/background/bg-23.jpg';
import { Input } from 'react-native-elements';
import logo from '../../assets/images/logo.png';
import { v4 as uuidv4 } from 'react-native-get-random-values';
const generateUniqueId = () => {
    const uniqueId = `${Platform.OS}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    return uniqueId;
  };


  const deviceId =  generateUniqueId();;
const deviceName = Device.deviceName;
class SigninSignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          value: 0,
          login_mobile_number: "",
          signup_mobile_number: "",
          otp_button: false,
          show_popup: false,
          show_signup_popup: false,
          isloading: false,
          otp_validation: ""
        };
        this.otpValidation = this.otpValidation.bind(this);
        this.mobileRegex = /^[6-9]\d{9}$/gm;
      }
     backAction = () => {
        backClickCount === 1 ? BackHandler.exitApp() : _spring();
        return true;
    };

   
componentDidMount(){
    // useCallback(() => {
    //     BackHandler.addEventListener("hardwareBackPress", backAction);
    //     return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    // }, [])
}
     _spring = () => {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0);
        }, 1000);
    };
   
 
     handleContainerPress = () => {
        // Dismiss the keyboard when the middle layer is touched
        Keyboard.dismiss();
      };
    
  closePopup = () => {
    this.setState({
      show_popup: false
    })
  }

  onSubmit =async (login_request_from_value, event) => {
    try {
    const { email, password, login_mobile_number, signup_mobile_number } = this.state;
    
    // if(login_mobile_number === '7010815334')
    //    alert(window.AsyncStorage.getItem('mobile_device_id'));

    this.setState({ isloading: true });

    let body_parameters = {
      login_mobile_number: this.state.show_signup_popup ? signup_mobile_number : login_mobile_number,
      login_email: email,
      login_role: "customer",
      login_hint: password,
      login_request_from: login_request_from_value,
      screen_name: 'signin',
      device_information: deviceName,
      device_id: deviceId
    };


// Handle the response here

    const response = await this.props.login(body_parameters);
    console.log(response)
if (this.props.login_result["code"] !== "000") {
  this.setState({
    show_popup: true,
  });
} else {
  this.props.history.push({
            // pathname: '/' + this.props.login_result['navigateScreen'] + '/',
            state: {
              route_parameters: {
                login_mobile_number: body_parameters['login_mobile_number'],
                login_email: email,
                login_role: "customer",
                login_request_from: login_request_from_value,
                token_id: this.props.login_result['token_id']
              }
            }

        });
    }
  } 
  catch (error) {
    alert(error); // Handle error appropriately
  } finally {
    this.setState({ isloading: false });
  }
  };

  otpValidation = (text) => {
    // console.log(text);
    this.setState({ otpValidation: '' });
    const targetValue = text.replace(/\s/g, '');
   

    if (this.state.show_signup_popup) {
      this.setState({ signup_mobile_number: targetValue });
    } else {
      this.setState({ login_mobile_number: targetValue });
    }

    if (this.mobileRegex.test(targetValue)) {
      if (targetValue.length >= 10) {
      
        this.setState({ otp_button: true });
      
      }
      
    //   this.setState({ otpValidation: '' });
    } 
    else {
        console.log(12)
        this.setState({ otp_button: false });
      }
    console.log(this.state.otp_button)
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  handleClick() {
    console.log('this is:', this);
  }
  Cancelregistration = () => {
    this.setState({ show_signup_popup: false })
  }


     updateState = (data) => setState((state) => ({ ...state, ...data }));


render(){
    return (
        <ImageBackground
        
        style={[styles.backgroundImage]}
      >
        
        <View style={styles.container}>
        
          <ImageBackground
            source={logo}
            style={styles.logo}
          />
   <Text style={styles.tagline}>Mutual Fund Investments &</Text>
   <Text style={styles.tagline1}>An app that connects all your financial needs</Text>
          {/* Login Textbox and Button in the center */}
          <View style={styles.formContainer}>
         
          <TouchableWithoutFeedback >
          <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="Enter Mobile Number"
            placeholderTextColor={Colors.blackColor}
            value={this.state.login_mobile_number}
            maxLength={10}
            onChangeText= {
                  this.otpValidation
              }
                    style={{ ...Fonts.blackColor16Medium, borderBottomColor: Colors.grayColor, borderBottomWidth: 1.0, }}
                    keyboardType="phone-pad"
                    selectionColor={Colors.primaryColor}
                />
          

          <Button
        title="SIGN IN"
        onPress={() => this.onSubmit("mobile")}
        style={styles.signinSignupButtonStyle}
        disabled={!this.state.otp_button}
      />
           {/* <TouchableOpacity
                activeOpacity={0.9}
                disabled={this.state.otp_button}
                onClick={() => this.onSubmit("mobile")}
                style={styles.signinSignupButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>SIGN IN</Text>
            </TouchableOpacity> */}
            </ScrollView></SafeAreaView>
            </TouchableWithoutFeedback>
           
          </View>
         
        </View>
        <View style={styles.footer}>
        <Text style={styles.disclaimer1}>ARN NO-183190</Text>
        {/* Disclaimer at the bottom */}
        <Text style={styles.disclaimer}>
        
          Disclaimer:Mutual Fund Are Subjected to market risk please read offer document carefully before investing.
        </Text>
        </View>
      </ImageBackground>

        
    );
    }
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      inputBox: {
        marginBottom: 15,
        width: '100%',
      },
      input: {
        color: 'white',  // Text color
      },
      container: {
        
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      logo: {
        width:300,
        height: 100,
      },
      formContainer: {
    justifyContent:'center',
    alignContent:'center',
        width: '80%',
      },
      disclaimer1: {
        textAlign: 'center',
        color: 'white',
        padding: 0,
      },
      disclaimer: {
        textAlign: 'center',
        color: 'white',
        padding: 0,
      },
    
   
      tagline: {
        color:Colors.blackColor,
       
        fontSize: 20,
      
         // Text color can be adjusted based on your background
        // Add any additional styling for the tagline if needed
      },
      tagline1: {
        color:Colors.blackColor,
        marginBottom: 100,
        fontSize: 10,
       
         // Text color can be adjusted based on your background
        // Add any additional styling for the tagline if needed
      },
    signinSignupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 7.0,
    },

        background: {
            flex:1,
            resizeMode: 'cover', // or 'stretch' for different resize modes
          },
          footer:{
            backgroundColor:"#2C149C",
            height:60
          },

    socialMediaOptionsWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    socialMedioOptionsRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding,
    },
    
    signinSignupInfoWrapStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        padding: Sizes.fixPadding * 2.0,
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
    },
    centered: { 
        flex: 1, 
        justifyContent: "center", 
       
      }, 
});

const mapStateToProps = (state) => ({
   
    login_result: state.auth.login_result,
    
  });
  

  export default connect(mapStateToProps, { login, validateSession })(SigninSignupScreen);

