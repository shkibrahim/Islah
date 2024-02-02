import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { format } from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomTextInput from '../../../Components/CustomTextInput';
import {Button, Paragraph} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

const AddDeals = () => {
  const [user, setuser] = useState();

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
  const [category, setCategory] = useState('');
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const [title, setTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [offersDetails, setOffersDetails] = useState('');
  const [isOffersDetailsEmpty, setIsOffersDetailsEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [city, setCity] = useState('');
  const [isCityEmpty, setIsCityEmpty] = useState(false);
  const [areaName, setAreaName] = useState('');
  const [isAreaNameEmpty, setIsAreaNameEmpty] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [isPostalCodeEmpty, setIsPostalCodeEmpty] = useState(false);
  const [contactDetails, setContactDetails] = useState('');
  const [isContactDetailsEmpty, setIsContactDetailsEmpty] = useState(false);
  const [fromtimepickerOpen, setFromTimePickerOpen] = useState(false);
  const [totimepickerOpen, setToTimePickerOpen] = useState(false);
  const [fromtime, setFromTime] = useState(new Date());
  const [totime, setToTime] = useState(new Date());
  const [fromDatePickerOpen, setFromDatePickerOpen] = useState(false);
  const [toDatePickerOpen, setToDatePickerOpen] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [Loading, setLoading] = useState();



  const formattedStartDate = format(fromDate, "EEE dd, MMM yyyy");
  const formattedEndDate = format(toDate, "EEE dd, MMM yyyy");

  const formattedStartTime = format(fromtime, "hh:mm a");
  const formattedEndTime = format(totime, "hh:mm a");




  const Register = async () => {
    if (category == '') {
      setIsCategoryEmpty(true);
      setError(true);
    }

    if (title == '') {
      setIsTitleEmpty(true);
      setError(true);
    }

    if (offersDetails == '') {
      setIsOffersDetailsEmpty(true);
      setError(true);
    }

    if (city == '') {
      setIsCityEmpty(true);
      setError(true);
    }

    if (areaName == '') {
      setIsAreaNameEmpty(true);
      setError(true);
    }

    if (postalCode == '') {
      setIsPostalCodeEmpty(true);
      setError(true);
    }

    if (contactDetails == '') {
      setIsContactDetailsEmpty(true);
      setError(true);
    }

    if (error == false) {
      setLoading(true);
      console.log('agf');
      try {
        await firestore()
          .collection('Offers')
          .doc(user).collection('OffersIndividual')
.doc()
          .set({
            Category: category,
            Title: title,
            OffersDetails: offersDetails,
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            StartTime: formattedStartTime,
            EndTime: formattedEndTime,
            City: city,
            Area: areaName,
            PostalCode: postalCode,
            ContactDetails: contactDetails,
            myid:user
            // ... (rest of the data)
          });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error addinfsf product:', error);
        // Handle any error that might occur during the process
      }

      // navigation.navigate('imagepickerpage', {
      //   surname:surname,
      //   name:name,
      //   fatherName:fatherName,
      //   motherName:motherName,
      //   grandFatherName:grandFatherName,
      //   grandFatherNameNana:grandFatherNameNana,
      //   gender:gender,
      //   dob:dob,

      //   maritalStatus:maritalStatus,
      //   country:country,
      //   state:state,
      //   city:city,
      // district:district,
      // postalCode:postalCode,
      // Address:Address,
      // Street:Street,

      // email:email,
      // password:password,
      // nationality:indian,
      // phoneNumber:phoneNumber

      // })
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <BackButton label="Add Deals" />
      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingBottom: 32,
        }}>
        <Text style={styles.main_heading}>Add deal details</Text>

        <CustomTextInput
          setError={setIsCategoryEmpty}
          required={true}
          error={isCategoryEmpty}
          value={category}
          onChange={setCategory}
          label="Category"
        />
        <CustomTextInput
          setError={setIsTitleEmpty}
          required={true}
          error={isTitleEmpty}
          value={title}
          onChange={setTitle}
          label="Title"
        />
        <CustomTextInput
          setError={setIsOffersDetailsEmpty}
          required={true}
          error={isOffersDetailsEmpty}
          value={offersDetails}
          onChange={setOffersDetails}
          label="Offers Details"
        />

        {/* Date Pickers */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '48%'}}>
            <Paragraph style={styles.label}>Start Date</Paragraph>
            <TouchableOpacity
              onPress={() => setFromDatePickerOpen(true)}
              style={{
                width: '100%',
                backgroundColor: '#ddd',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}>
              <Text style={{color: '#555', fontSize: 14, textAlign: 'center'}}>
                {fromDate.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '48%'}}>
            <Paragraph style={styles.label}>End Date</Paragraph>
            <TouchableOpacity
              onPress={() => setToDatePickerOpen(true)}
              style={{
                width: '100%',
                backgroundColor: '#ddd',
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}>
              <Text style={{color: '#555', fontSize: 14, textAlign: 'center'}}>
                {toDate.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
        <DatePicker
          modal
          mode="date"
          open={fromDatePickerOpen}
          date={fromDate}
          onConfirm={date => {
            setFromDatePickerOpen(false);
            setFromDate(date);
          }}
          onCancel={() => setFromDatePickerOpen(false)}
        />

        <DatePicker
          modal
          mode="date"
          open={toDatePickerOpen}
          date={toDate}
          onConfirm={date => {
            setToDatePickerOpen(false);
            setToDate(date);
          }}
          onCancel={() => setToDatePickerOpen(false)}
        />
        <CustomTextInput
          setError={setIsCityEmpty}
          required={true}
          error={isCityEmpty}
          value={city}
          onChange={setCity}
          label="City"
        />
        <CustomTextInput
          setError={setIsAreaNameEmpty}
          required={true}
          error={isAreaNameEmpty}
          value={areaName}
          onChange={setAreaName}
          label="Area Name"
        />
        <CustomTextInput
          keyboarType="numeric"
          setError={setIsPostalCodeEmpty}
          required={true}
          error={isPostalCodeEmpty}
          value={postalCode}
          onChange={setPostalCode}
          label="Postal Code"
        />
        <CustomTextInput
          setError={setIsContactDetailsEmpty}
          required={true}
          error={isContactDetailsEmpty}
          value={contactDetails}
          onChange={setContactDetails}
          label="Contact Details"
        />
        {error ? (
          <Text style={{color: 'red', marginTop: 4}}>
            All fields with * are mandatory
          </Text>
        ) : null}
        {isKeyboardActive ? <Text style={{height: 100}}></Text> : null}
      </ScrollView>

      <Pressable
        style={{
          borderRadius: 32,
          padding: 10,
          bottom: 30,
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#197739',
        }}
        onPress={Register}
        // Disable the button while loading
      >
        {Loading ? (
          <ActivityIndicator
            size="small"
            color="white"
            style={{alignSelf: 'center'}}
          />
        ) : (
          <Text style={{color: 'white', fontSize: 16}}>Add Deal</Text>
        )}
      </Pressable>
    </View>
  );
};

export default AddDeals;

const styles = StyleSheet.create({
  main_heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#197739',
    fontFamily: 'Roboto',
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
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
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#197739',
  },
});
