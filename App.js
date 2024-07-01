import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import LoadingScreen from "./components/loadingScreen";
import store  from './store/configureStore';
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import CategoryScreen from "./screens/category/categoryScreen";
import SearchResultScreen from "./screens/searchResult/searchResultScreen";
import FundDetailScreen from "./screens/fundDetail/fundDetailScreen";
import InvestNowScreen from "./screens/investNow/investNowScreen";
import PaymentMethodScreen from "./screens/paymentMethod/paymentMethodScreen";
import PaymentConfirmationScreen from "./screens/paymentConfirmation/paymentConfirmationScreen";
import PortfolioStocksScreen from "./screens/portfolioStocks/portfolioStocksScreen";
import AddMoneyScreen from "./screens/addMoney/addMoneyScreen";
import SelectBankScreen from "./screens/selectBank/selectBankScreen";
import AddMoneySuccessScreen from "./screens/addMoneyScccess/addMoneySuccessScreen";
import AccountDetailScreen from "./screens/accountDetail/accountDetailScreen";
import BankAndAutoPlayScreen from "./screens/bankAndAutoPlay/bankAndAutoPlayScreen";
import AddAnotherBankScreen from "./screens/addAnotherBank/addAnotherBankScreen";
import BankDetailScreen from "./screens/bankDetail/bankDetailScreen";
import AutoplayRequestSuccessScreen from "./screens/autoplayRequestSuccess/autoplayRequestSuccessScreen"
import WatchlistScreen from "./screens/watchlist/watchlistScreen";
import NotificationScreen from "./screens/notification/notificationScreen";
import InvestmentCartScreen from "./screens/investmentCart/investmentCartScreen";
import SipDelayCalculatorScreenJs from "./screens/sipDelayCalculator/sipDelayCalculatorScreen";
import SipDelayCalculatorGraphScreen from "./screens/sipDelayCalculatorGraph/sipDelayCalculatorGraphScreen";
import SavedScreen from "./screens/saved/savedScreen";
import InviteFriendsScreen from "./screens/inviteFriends/inviteFriendsScreen";
import SupportScreen from "./screens/support/supportScreen";
import TermsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onboarding/onboardingScreen";
import SigninSignupScreen from "./screens/auth/signinSignupScreen";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
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
        <Stack.Screen name="SigninSignup" component={SigninSignupScreen} />
        <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="SearchResult" component={SearchResultScreen} />
        <Stack.Screen name="FundDetail" component={FundDetailScreen} />
        <Stack.Screen name="InvestNow" component={InvestNowScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
        <Stack.Screen name="PortolioStocks" component={PortfolioStocksScreen} />
        <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
        <Stack.Screen name="SelectBank" component={SelectBankScreen} />
        <Stack.Screen name="AddMoneySuccess" component={AddMoneySuccessScreen} />
        <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
        <Stack.Screen name="BankAndAutoPlay" component={BankAndAutoPlayScreen} />
        <Stack.Screen name="AddAnotherBank" component={AddAnotherBankScreen} />
        <Stack.Screen name="BankDetail" component={BankDetailScreen} />
        <Stack.Screen name="AutoplayRequestSuccess" component={AutoplayRequestSuccessScreen} />
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="InvestmentCart" component={InvestmentCartScreen} />
        <Stack.Screen name="SIPDelayCalculator" component={SipDelayCalculatorScreenJs} />
        <Stack.Screen name="SIPDelayCalculatorGraph" component={SipDelayCalculatorGraphScreen} />
        <Stack.Screen name="Saved" component={SavedScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
