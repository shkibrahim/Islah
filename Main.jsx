import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Icon} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import SideBar from './Components/SideBar/SideBar';
import {loadUser} from './redux/reducers/authReducers';
import AboutUs from './screens/AboutUs/AboutUs';
import AdvertiseWithUs from './screens/AdvertiseWithUs/AdvertiseWithUs';
import Associates from './screens/Associates/Associates';
import SignIn from './screens/Authentication/SignIn/SignIn';
import BusinessData1 from './screens/Authentication/SignUp/Business/BusinessData1';
import BusinessData2 from './screens/Authentication/SignUp/Business/BusinessData2';
import ImagePicker1 from './screens/Authentication/SignUp/ImagePicker1';
import JobSeekerData1 from './screens/Authentication/SignUp/JobSeeker/JobSeekerData1';
import OtherData from './screens/Authentication/SignUp/Other/OtherData';
import PersonalData1 from './screens/Authentication/SignUp/PersonalData/PersonalData1';
import PersonalData2 from './screens/Authentication/SignUp/PersonalData/PersonalData2';
import PersonalData3 from './screens/Authentication/SignUp/PersonalData/PersonalData3';
import StudentData1 from './screens/Authentication/SignUp/Student/StudentData1';
import BeforeSignUp from './screens/BeforeSignUp/BeforeSignUp';
import BusinessUpportunities from './screens/CategoryPage/BusinessOpportunities/BusinessUpportunities';
import AddPropsal from './screens/CategoryPage/BusinessProposal/AddPropsal';
import BusinessPropsals from './screens/CategoryPage/BusinessProposal/BusinessProposals';
import EditBusinessProposal from './screens/CategoryPage/BusinessProposal/EditBusinessProposal';
import BusinessListed from './screens/CategoryPage/Businesses/BusinessListed';
import EditBusinessDetails from './screens/CategoryPage/Businesses/EditBusinessDetails';
import CategoryPage from './screens/CategoryPage/CategoryPage';
import AddJob from './screens/CategoryPage/Jobs/AddJob';
import EditJob from './screens/CategoryPage/Jobs/EditJob';
import JobSeeker from './screens/CategoryPage/Jobs/JobSeeker';
import AddDetails from './screens/CategoryPage/Matrimonial/AddDetails';
import EditDetails from './screens/CategoryPage/Matrimonial/EditDetails';
import Matrimonial from './screens/CategoryPage/Matrimonial/Matrimonial';
import NOC from './screens/CategoryPage/NOC/NOC';
import AddDeals from './screens/CategoryPage/Offers/AddDeals';
import EditDeals from './screens/CategoryPage/Offers/EditDeals';
import Offers from './screens/CategoryPage/Offers/Offers';
import Students from './screens/CategoryPage/Students/Students';
import ChatPage from './screens/Chat/ChatPage';
import SingleChatPage from './screens/Chat/SingleChatPage';
import ContactUs from './screens/ContactUs/ContactUs';
import EventsAndGallery from './screens/EventsAndGallery/EventsAndGallery';
import HomePage from './screens/HomePage/HomePage';
import ImagePickerFortheBusiness from './screens/ImagePicker/ImagePickerFortheBusiness';
import MemberShipCard from './screens/MemberShipCard/MemberShipCard';
import NewsPage from './screens/NewsPage/NewsPage';
import PostPage from './screens/PostPage/PostPage';
import UserProfile from './screens/ProfilePage/OtherProfile';
import TermsAndConditions from './screens/TermsAndConditions/TermsAndConditions';
import Testing from './screens/Testing';
import {myTheme} from './theme';
import OfferEditForm from './screens/CategoryPage/Offers/OfferEditForm';
import JobEditForm from './screens/CategoryPage/Jobs/JobEditForm';
import EditBusinessDetailsForm from './screens/CategoryPage/Businesses/EditBusinessDetailsForm';
import SingleBusinessDetailPage from './screens/CategoryPage/Businesses/SingleBusinessDetailPage';
import EditBusinessProposalForm from './screens/CategoryPage/BusinessProposal/EditBusinessProposalForm';
import LookingForBride from './screens/CategoryPage/Matrimonial/LookingForBride';
import LookingForGroom from './screens/CategoryPage/Matrimonial/LookingForGroom';
import messaging from '@react-native-firebase/messaging';
import Notification from './screens/Notification/Notification';
import PersonalView from './screens/PersonalView/PersonalView';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // You can handle the background message here
});
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();




const categoryPageOptions ={
  headerShown : false,
  animation : "slide_from_right"
}

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        color: '#444',
        marginBottom: 5,
      },
      tabBarShowLabel: true,
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        elevation: 0,
        paddingVertical: 5,
        height: 48,
      },
      tabBarActiveTintColor: '#2874F0',
      tabBarInactiveTintColor: '#333',
    }}>
    <Tab.Screen
      name="Home"
      options={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        animation: 'slide_from_bottom',
        tabBarIcon: ({focused}) => (
          <Icon
            source={focused ? 'home' : 'home-outline'}
            size={23} // Set the desired size for focused and unfocused icons
            color={focused ? myTheme.colors.primary : '#444'}
          />
        ),
      }}
      component={HomePage}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Icon
            source={focused ? 'apps-box' : 'apps'}
            size={23} // Set the desired size for focused and unfocused icons
            color={focused ? myTheme.colors.primary : '#444'}
          />
        ),
      }}
      name="Categories"
      component={CategoryPage}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Icon
            source={focused ? 'plus-box' : 'plus'}
            size={23}
            color={focused ? myTheme.colors.primary : '#444'}
          />
        ),
      }}
      name="Post"
      component={PostPage}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Icon
            source={focused ? 'newspaper-variant' : 'newspaper-variant-outline'}
            size={23}
            color={focused ? myTheme.colors.primary : '#444'}
          />
        ),
      }}
      name="News"
      component={NewsPage}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Icon
            source={focused ? 'account-circle' : 'account-circle-outline'}
            size={23}
            color={focused ? myTheme.colors.primary : '#444'}
          />
        ),
      }}
      name="Profile"
      component={UserProfile}
    />
  </Tab.Navigator>
);

const StackNavigator = ({isAuthenticated}) => (
  <Stack.Navigator 
  // initialRouteName='home'
  initialRouteName={isAuthenticated ? 'home' :  'signin'}
  >
    <Stack.Screen
      name="home"
      component={TabNavigator}
      options={{headerShown: false, animation: 'slide_from_bottom'}}
    />
     <Stack.Screen
      name="PersonalView"
      component={PersonalView}
      options={{headerShown: false, animation: 'slide_from_bottom'}}
    />
    <Stack.Screen
      name="signin"
      component={SignIn}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="personalData"
      component={PersonalData1}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="personalData2"
      component={PersonalData2}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="personalData3"
      component={PersonalData3}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="studentData1"
      component={StudentData1}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="jobseekerData1"
      component={JobSeekerData1}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="businessData1"
      component={BusinessData1}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="businessData2"
      component={BusinessData2}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="imagePcikerForBusiness"
      component={ImagePickerFortheBusiness}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="otherData1"
      component={OtherData}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="beforesignup"
      component={BeforeSignUp}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="imagepickerpage"
      component={ImagePicker1}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="addDeals"
      component={AddDeals}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="viewAllOffers"
      component={Offers}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="offerEditForm"
      component={OfferEditForm}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editDeals"
      component={EditDeals}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="offerEditPage"
      component={Students}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="viewAllStudents"
      component={Students}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="jobSeekers"
      component={JobSeeker}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editJob"
      component={EditJob}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editJobForm"
      component={JobEditForm}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="postJob"
      component={AddJob}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="businessListed"
      component={BusinessListed}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editBusinessDetails"
      component={EditBusinessDetails}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editBusinessDetailsForm"
      component={EditBusinessDetailsForm}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="singleBusinessDetails"
      component={SingleBusinessDetailPage}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="matrimonial"
      component={Matrimonial}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="lookingForBride"
      component={LookingForBride}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="lookingForGroom"
      component={LookingForGroom}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="addMyDetails"
      component={AddDetails}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editMyDetails"
      component={EditDetails}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="downloadNOC"
      component={NOC}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="viewAllBusinessProposal"
      component={BusinessPropsals}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="addProposal"
      component={AddPropsal}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editProposal"
      component={EditBusinessProposal}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="editProposalForm"
      component={EditBusinessProposalForm}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="businessOpportunities"
      component={BusinessUpportunities}
      options={categoryPageOptions}
    />
    <Stack.Screen
      name="chat"
      component={ChatPage}
      options={{
        animation: 'slide_from_right',
        headerTitle: 'Chat',
        headerTitleAlign: 'center',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
    <Stack.Screen
      name="singleChat"
      component={SingleChatPage}
      options={{
        animation: 'slide_from_right',
        // headerTitleAlign: 'center',
        // headerTitle: 'Chat',
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: '#fff',
        // },
      }}
    />
    <Stack.Screen
      name="Notification"
      component={Notification}
      options={{headerShown: true}}
    />
  </Stack.Navigator>
);

const Main = () => {
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    dispatch(loadUser());
  
  }, [dispatch]);
  const {loading, isAuthenticated , error } = useSelector(state => state.auth);



  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={myTheme.colors.primary}
        barStyle="light-content"
      />
      <Drawer.Navigator drawerContent={() => <SideBar />}>
        <Drawer.Screen name="Menu" options={{headerShown: false}}>
          {() => <StackNavigator isAuthenticated={isAuthenticated} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="AboutUs"
          options={{
            headerShown: false,
          }}
          component={AboutUs}
        />
        <Drawer.Screen
          name="Advertise"
          options={{
            headerShown: false,
          }}
          component={AdvertiseWithUs}
        />
        <Drawer.Screen
          name="TermsAndConditions"
          options={{
            headerShown: false,
          }}
          component={TermsAndConditions}
        />
        <Drawer.Screen
          name="EventsGallery"
          options={{
            headerShown: false,
          }}
          component={EventsAndGallery}
        />
        <Drawer.Screen
          name="Associates"
          options={{
            headerShown: false,
          }}
          component={Associates}
        />
        <Drawer.Screen
          name="MembershipCard"
          options={{
            headerShown: false,
          }}
          component={MemberShipCard}
        />
        <Drawer.Screen
          name="ContactUs"
          options={{
            headerShown: false,
          }}
          component={ContactUs}
        />
        <Drawer.Screen name="Testing" component={Testing} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
