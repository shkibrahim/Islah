import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height} = Dimensions.get('window');

const BusinessData2 = React.memo(({route, props, navigation}) => {
  const [error, setError] = React.useState(false);
  const [isBstateEmpty, setIsBstateEmpty] = React.useState(false);
  const [Bpostalcode, setBpostalcode] = React.useState('');
  const [isPostelcodeEmpty, setIsPostelCodeEmpty] = React.useState(false);
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);
  const [Baddress, setBAddress] = useState('');
  const [isBcityEmpty, setIsBcityEmpty] = useState(false);
  const [Bcity, setBcity] = useState('');
  const [Bstate, setBstate] = useState('');
  const [isBcountryEmpty, setIsBcountryEmpty] = useState(false);
  const [Bcountry, setBcountry] = useState('');
  const [fromtimepickerOpen, setFromTimePickerOpen] = useState(false);
  const [totimepickerOpen, setToTimePickerOpen] = useState(false);
  const [fromtime, setFromTime] = useState(new Date());
  const [totime, setToTime] = useState(new Date());
  const [area, setArea] = useState('');
  const [isAreaEmpty, setIsAreaEmpty] = useState(false);

  // const signupHandler = () => {
  //   setError(false);
  //     navigation.navigate('imagePcikerForBusiness');
  // };
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
  const [category, setCategory] = useState('');
  useEffect(() => {
    const getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
    };
    getCategory();
  }, []);

  const {
    
    surname,
    name,
    fatherName,
    motherName,
    grandFatherName,
    grandFatherNameNana,
    gender,
    dob,
    maritalStatus,
    country,
    state,
    city,
    district,
    postalCode,
    Address,
    Street,
    email,
    password,
    nationality,
    phoneNumber,
    partnerName,
    BusinessName,
    BusinessCatergory,
    BusinessDescription,
    BusinesContact,
    BusinessEducation,
    WorkingFrom,
    WorkingTo,
    Bimage1,
    Bimage2,
    Bimage3,
    PImage,
  } = route.params;

  useEffect(() => {
    console.log('svsv');
    console.log('arhi ',Bimage1)
    console.log(maritalStatus);
    // Check for non-empty fields and update error Bstate
    if (
      Bcountry !== '' &&
      Bstate !== '' &&
      Bcity !== '' &&
      area !== '' &&
      Bpostalcode !== '' &&
      Baddress !== ''
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [error, Bcountry, Bstate, Bcity, area, Bpostalcode, Baddress]); // Include all relevant dependencies

  const stringBtimeto = totime.toISOString();
  const stringBtimefrom = fromtime.toISOString();
  const signupHandler = async () => {
    // if (password != confirmPassword ){
    //   setwrongpassword(true)
    //   setError(true)
    // }

    if (Bpostalcode === '') {
      setIsPostelCodeEmpty(true);
      setError(true);
    }
    if (Bcountry === '') {
      setIsBcountryEmpty(true);
      setError(true);
    }
    if (Bstate === '') {
      setIsBstateEmpty(true);
      setError(true);
    }
    if (Bcity === '') {
      setIsBcityEmpty(true);
      setError(true);
    }

    if (area === '') {
      setIsAreaEmpty(true);
      setError(true);
    }

    if (Baddress === '') {
      setIsAddressEmpty(true);
      setError(true);
    }

    //   if (from === 'from') {

    //     setError(true)
    // }

    // if (to === 'to') {
    //   setError(true)
    // }

    if (error == false) {
      // await AsyncStorage.setItem('userName', userName);
      console.log('transfering data from data');
      //       navigation.navigate('imagePcikerForBusiness', {
      //         surname:surname,
      //         name:name,
      //         fatherName:fatherName,
      //         motherName:motherName,
      //         grandFatherName:grandFatherName,
      //         grandFatherNameNana:grandFatherNameNana,
      //         gender:gender,
      //         dob:dob,
      //         partnerName:partnerName,
      //         maritalStatus:maritalStatus,
      //         country:country,
      //         state:state,
      //        city:city,
      //       district:district,
      //       postalCode:postalCode,
      //       Address:Address,
      //       Street:Street,
      //   PImage:Image,
      //       email:email,
      //       password:password,
      //       nationality:nationality,
      //       partnerName:partnerName,
      //       phoneNumber:phoneNumber,

      //       BusinessName:BusinessName,
      //   BusinessCatergory:BusinessCatergory,
      //   BusinessDescription:BusinessDescription,
      //   BusinesContact:BusinesContact,
      //   BusinessEducation:BusinessEducation,
      //   WorkingFrom:WorkingFrom,
      //   WorkingTo:WorkingTo,

      //   Bcountry:Bcountry,
      //   Bstate:Bstate,
      //   Bcity:Bcity,
      //   Barea:area,
      //   Bpostalcode:Bpostalcode,
      //   Baddress:Baddress,
      //   Btimefrom:stringBtimefrom,
      // Btimeto:stringBtimeto

      //       })
      await fetchdata();
    }
  };

  const fetchdata = async () => {
    try {
      // await uploadimage1();
      // await uploadimage2();

      // await uploadimage3();
      console.log('data transfering');
      await firestore()
        .collection('BusinessPerson')
        .doc(user).collection('Business').doc()

        .set({
          // Profile: Pimage,
          // Name: name,
          // FatherName: fatherName,
          // GrandFatherName: grandFatherName,
          // MotherName: motherName,
          // Nana:grandFatherNameNana,
          // Surname:surname,
          // Gender :gender,
          // Dob: dob,
          // MaritalStatus: maritalStatus,
          // Country: country,
          // State: state,
          // City: city,
          // District: district,
          // PostalCode: postalCode,
          // Address: Address,
          // Street: Street,
          // Email: email,
          // Nationality: nationality,
          // PhoneNumber: phoneNumber,
          // PartnerName: partnerName,

          // surname: surname,
          // name: name,
          // fatherName: fatherName,
          // motherName: motherName,
          // grandFatherName: grandFatherName,
          // grandFatherNameNana: grandFatherNameNana,
          // gender: gender,
          // dob: dob,
          // partnerName: partnerName,
          // maritalStatus: maritalStatus,
          // country: country,
          // state: state,
          // city: city,
          // district: district,
          // postalCode: postalCode,
          // Address: Address,
          // Street: Street,
          // PImage: PImage,
          // email: email,
          // password: password,
          // nationality: nationality,
          // partnerName: partnerName,
          // phoneNumber: phoneNumber,
category:category,
          BusinessName: BusinessName,
          BusinessCatergory: BusinessCatergory,
          BusinessDescription: BusinessDescription,
          BusinesContact: BusinesContact,
          BusinessEducation: BusinessEducation,
          WorkingFrom: WorkingFrom,
          WorkingTo: WorkingTo,

          Bcountry: Bcountry,
          Bstate: Bstate,
          Bcity: Bcity,
          Barea: area,
          Bpostalcode: Bpostalcode,
          Baddress: Baddress,
          Btimefrom: stringBtimefrom,
          Btimeto: stringBtimeto,
          Bimage1: Bimage1,
          Bimage2: Bimage2,
          Bimage3: Bimage3,

          // ... (rest of the data)
        });

      // setIsLoading(false);
      // alert('Product Added Successfully');
      navigation.replace('home');
    } catch (error) {
      // setIsLoading(false);
      console.log('Error addinfsf product:', error);
      // Handle any error that might occur during the process
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Title style={styles.heading}> Business Details </Title>
          <Paragraph style={{marginBottom: 8}}>
            ( All fields with * are mandatory )
          </Paragraph>

          <Paragraph
            style={{
              color: '#197739',
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 8,
              marginTop: 16,
              width: '100%',
              textAlign: 'left',
            }}>
            Working Time
          </Paragraph>

          {/* Time Picker  */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '48%',
              }}>
              <Paragraph style={styles.label}>From</Paragraph>
              <TouchableOpacity
                onPress={() => setFromTimePickerOpen(true)}
                style={{
                  width: '100%',
                  backgroundColor: '#ddd',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#555',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  {
                    // With am and pm
                    fromtime.getHours() > 12
                      ? fromtime.getHours() - 12
                      : fromtime.getHours()
                  }{' '}
                  : {fromtime.getMinutes()}{' '}
                  {fromtime.getHours() > 12 ? 'pm' : 'am'}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '48%',
              }}>
              <Paragraph style={styles.label}>To</Paragraph>
              <TouchableOpacity
                onPress={() => setToTimePickerOpen(true)}
                style={{
                  width: '100%',
                  backgroundColor: '#ddd',
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#555',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  {
                    // With am and pm
                    totime.getHours() > 12
                      ? totime.getHours() - 12
                      : totime.getHours()
                  }{' '}
                  : {totime.getMinutes()} {totime.getHours() > 12 ? 'pm' : 'am'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <DatePicker
            modal
            mode="time"
            open={fromtimepickerOpen}
            date={fromtime}
            onConfirm={date => {
              setFromTimePickerOpen(false);
              setFromTime(date);
            }}
            onCancel={() => setFromTimePickerOpen(false)}
          />
          <DatePicker
            modal
            mode="time"
            open={totimepickerOpen}
            date={totime}
            onConfirm={date => {
              setToTimePickerOpen(false);
              setToTime(date);
            }}
            onCancel={() => setToTimePickerOpen(false)}
          />
          <CustomTextInput
            setError={setIsBcountryEmpty}
            required={true}
            error={isBcountryEmpty}
            value={Bcountry}
            onChange={setBcountry}
            label="Country"
          />
          <CustomTextInput
            setError={setIsBstateEmpty}
            required={true}
            error={isBstateEmpty}
            value={Bstate}
            onChange={setBstate}
            label="State"
          />
          <CustomTextInput
            setError={setIsBcityEmpty}
            required={true}
            error={isBcityEmpty}
            value={Bcity}
            onChange={setBcity}
            label="City / Village name"
          />
          <CustomTextInput
            setError={setIsAreaEmpty}
            required={true}
            error={isAreaEmpty}
            value={area}
            onChange={setArea}
            label="Area / District name"
          />
          <CustomTextInput
            setError={setIsPostelCodeEmpty}
            keyboarType="numeric"
            required={true}
            error={isPostelcodeEmpty}
            value={Bpostalcode}
            onChange={setBpostalcode}
            label="Postal code"
          />
          <CustomTextInput
            setError={setIsAddressEmpty}
            required={true}
            error={isAddressEmpty}
            value={Baddress}
            onChange={setBAddress}
            label="Business Address"
          />
          {error ? (
            <Text style={{color: 'red', marginTop: 4}}>
              All fields with * are mandatory
            </Text>
          ) : null}

          <Button
            mode="contained"
            style={styles.button}
            onPress={signupHandler}>
            Sign Up
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
});

export default BusinessData2;

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
  },
  heading: {
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: '#197739',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    objectFit: 'cover',
  },
  input: {
    width: '100%',
    marginBottom: 4,
    backgroundColor: '#ddd',
  },
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#197739',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#197739',
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Roboto',
    marginLeft: 4,
  },
});
