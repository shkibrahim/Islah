import {StyleSheet, Text, View, ScrollView, TextInput,Keyboard,Pressable,ActivityIndicator} from 'react-native';
import React, {useState,useEffect} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';
import {myTheme} from '../../../theme';
import {Icon} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const AddPropsal = () => {

  const [user,setuser] = useState()
  
  useEffect(() => {
    getEmailFromStorage();
    
  }, []);
  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userName');
      setuser(storedEmail);
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
    }
  };
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardActive(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardActive(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);



const [Loading,setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessDetails, setBusinessDetails] = useState('');
  const [location, setLocation] = useState('');
  const [investmentNeeded, setInvestmentNeeded] = useState('');
  const [returnOnInvestment, setReturnOnInvestment] = useState('');
  const [GuarantorDetails1, setGuarantorDetails1] = useState('');
  const [GuarantorDetails2, setGuarantorDetails2] = useState('');
  const [GuarantorDetails3, setGuarantorDetails3] = useState('');
  const [BusinessName,setBusinessName] = useState('')
  const [isnameEmpty, setIsnameEmpty] = useState(false);
  const [isbusinessCategoryEmpty, setIsbusinessCategoryEmpty] =
    useState(false);
  const [isbusinessDetailsEmpty, setIsbusinessDetailsEmpty] =
    useState(false);
  const [islocationEmpty, setIslocationEmpty] = useState(false);
  const [isinvestmentNeededEmpty, setIsinvestmentNeededEmpty] =
    useState(false);
  const [isreturnOnInvestmentEmpty, setIsreturnOnInvestmentEmpty] =
    useState(false);
  const [isGuarantorDetails1Empty, setIsGuarantorDetails1Empty] =
    useState(false);
  const [isGuarantorDetails2Empty, setIsGuarantorDetails2Empty] =
    useState(false);
  const [isGuarantorDetails3Empty, setIsGuarantorDetails3Empty] =
    useState(false);
    useEffect(() => {
      // Reset error state
      setError(false);
    
      // Check for non-empty fields and update error state
      if (businessCategory !== '' && businessDetails !== '' && location !== '' && investmentNeeded !== ''&& returnOnInvestment !== ''  && GuarantorDetails1 !== '' && BusinessName !=='') {
     setError(false)
      } else {
        setError(true);
      }
    }, [businessCategory, businessDetails, location, investmentNeeded,returnOnInvestment,GuarantorDetails1,BusinessName]);
    
 const Register =async()=>{
  if ( BusinessName== '') {
    setIsnameEmpty(true)
      setError(true)
}

    if ( businessCategory== '') {
      setIsbusinessCategoryEmpty(true)
        setError(true)
  }
  
  if (businessDetails == '') {
    setIsbusinessDetailsEmpty(true)
      setError(true)
  }
  
  if (location == '') {
    setIslocationEmpty(true)
      setError(true)
  }
  
  
  if (investmentNeeded == '') {
    setIsinvestmentNeededEmpty(true)
      setError(true)
  }
  
  
  if (returnOnInvestment == '') {
    setIsreturnOnInvestmentEmpty(true)
      setError(true)
  }
  
  if (GuarantorDetails1 == '') {
    setIsGuarantorDetails1Empty(true)
      setError(true)
  }
  

  if (error == false ) {
    setLoading(true)
    console.log('agf')
    try {
          
     
   
      await firestore()
        .collection('BusinessProposal')
        .doc(user)
      
        .set({
          BusinessName:BusinessName,
          BusinessCategory:businessCategory,
          BusinessDetails:businessDetails,
          Location:location,
          InvestmentNeeded:investmentNeeded,
          ReturnOnInvestment:returnOnInvestment,
          GuarantorDetails1:GuarantorDetails1,
          GuarantorDetails2:GuarantorDetails2,
          GuarantorDetails3:GuarantorDetails3,
   
       
          // ... (rest of the data)
        });
  
        setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  
  
  
  
    
         
        }
        
  }







  return (
    <View style={{flex:1}}>
    <ScrollView>
      <BackButton />
      <View style={styles.form_container}>
        <Text style={styles.heading}>Add Business Proposal</Text>

        <CustomTextInput
          setError={setIsnameEmpty}
          required={true}
          error={isnameEmpty}
          value={BusinessName}
          onChange={setBusinessName}
          label="Business Name"
        />
        <CustomTextInput
          setError={setIsbusinessCategoryEmpty}
          required={true}
          error={isbusinessCategoryEmpty}
          value={businessCategory}
          onChange={setBusinessCategory}
          label="Business Category"
        />
        <CustomTextInput
          setError={setIsbusinessDetailsEmpty}
          required={true}
          error={isbusinessDetailsEmpty}
          value={businessDetails}
          onChange={setBusinessDetails}
          label="Business Details"
        />
        <CustomTextInput
          setError={setIslocationEmpty}
          required={true}
          error={islocationEmpty}
          value={location}
          onChange={setLocation}
          label="Location"
        />
        <CustomTextInput
          setError={setIsinvestmentNeededEmpty}
          keyboarType="numeric"
          required={true}
          error={isinvestmentNeededEmpty}
          value={investmentNeeded}
          onChange={setInvestmentNeeded}
          label="Investment Needed"
        />
        <CustomTextInput
          setError={setIsreturnOnInvestmentEmpty}
          required={true}
          error={isreturnOnInvestmentEmpty}
          value={returnOnInvestment}
          onChange={setReturnOnInvestment}
          label="Return On Investment"
        />
        <CustomTextInput
          setError={setIsGuarantorDetails1Empty}
          required={true}
          error={isGuarantorDetails1Empty}
          value={GuarantorDetails1}
          onChange={setGuarantorDetails1}
          label="Guarantor Details 1  ( Name and Number )"
        />
        <CustomTextInput
          setError={setIsGuarantorDetails2Empty}
          required={false}
          error={isGuarantorDetails2Empty}
          value={GuarantorDetails2}
          onChange={setGuarantorDetails2}
          label="Guarantor Details 2 ( Name and Number )"
        />
        <CustomTextInput
          setError={setIsGuarantorDetails3Empty}
          required={false}
          error={isGuarantorDetails3Empty}
          value={GuarantorDetails3}
          onChange={setGuarantorDetails3}
          label="Guarantor Details 3  ( Name and Number )"
        />

      
      </View>
      {error ? (
          <Text style={{color: 'red', alignSelf:'center',}}>
            All fields with * are mandatory
          </Text>
        ) : null}
          {isKeyboardActive ? (
                <Text style={{ height: 100}}></Text>
              ) : null}
    </ScrollView>
    <Pressable
  style={{
    borderRadius: 32,
    padding: 10,bottom:30,
    alignItems: "center",width:'90%',
    alignSelf:'center',
    justifyContent: "center",
    backgroundColor: "#197739",
  }}
  onPress={Register}
   // Disable the button while loading
>
  {Loading ? (
    <ActivityIndicator size="small" color="white" style={{ alignSelf: "center" }} />
  ) : (
    <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
  )}
</Pressable>
    </View>
  );
};

export default AddPropsal;

const styles = StyleSheet.create({
  form_container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: myTheme.colors.primary,
    width: '100%',
    textAlign: 'center',
  },
});
