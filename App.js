import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';LogBox.ignoreAllLogs();
import LoadingScreen from './components/loadingScreen';
import SplashScreen from './screens/splashScreen';
import OnboardingScreen from './screens/onboarding.js/onboardingScreen';
import Signin from './screens/auth/signin';
import Header from './screens/main/dashboard';
const Stack = createStackNavigator();
const App = () => {
    return (
    
       
   
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="auth/sign-in" component={Signin} />
          <Stack.Screen name="/dashboard" component={Header}/>
          </Stack.Navigator>
    </NavigationContainer>
    
  
   
  );
}
export default App;
