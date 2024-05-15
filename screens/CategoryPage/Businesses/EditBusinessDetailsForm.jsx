import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {myTheme} from '../../../theme';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomTextInput from '../../../Components/CustomTextInput';
import {Button, Title, Paragraph} from 'react-native-paper';
import CustomDropDown from '../../../Components/CustomDropDown';
import DatePicker from 'react-native-date-picker';

const EditBusinessDetailsForm = ({navigation,route}) => {
  const {Id,name,Profile,phone,user} = route.params;
  console.log('y fwfw',name,phone,user)
  const [error, setError] = useState(false);
  const [isBusinessNameEmpty, setIsBusinessNameEmpty] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [isdescriptionEmpty, setIsdescriptionEmpty] = useState(false);
  const [description, setdescription] = useState('');
  console.log('why',description)
  const [isBusinessCatergory, setIsBusinessCatergory] = useState(false);
  const [businessCatergory, setBusinessCatergory] = useState('');
  const [isbusinesContactEmpty, setIsbusinesContactEmpty] = useState(false);
  const [businesContact, setBusinesContact] = useState('');
  console.log('why contact', businesContact)
  const [isEducationEmpty, setIsEducationEmpty] = useState(false);
  const [education, setEducation] = useState('');

  const weekdayFrom = [
    'From',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const weekdayTo = [
    'To',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [from, setFrom] = useState(weekdayFrom[0]);
  const [to, setTo] = useState(weekdayTo[0]);
  // Onpress handler


  const [isstateEmpty, setIsstateEmpty] = React.useState(false);
  const [postalCode, setPostalCode] = React.useState('');
  const [isPostelcodeEmpty, setIsPostelCodeEmpty] = React.useState(false);
  const [isAddressEmpty, setIsAddressEmpty] = useState(false);
  const [address, setAddress] = useState('');
  const [isCityEmpty, setIsCityEmpty] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isCountryEmpty, setIsCountryEmpty] = useState(false);
  const [country, setCountry] = useState('');
  const [fromtimepickerOpen, setFromTimePickerOpen] = useState(false);
  const [totimepickerOpen, setToTimePickerOpen] = useState(false);
  const [fromtime, setFromTime] = useState(new Date());
  const [totime, setToTime] = useState(new Date());
  const [area, setArea] = useState('');
  const [isAreaEmpty, setIsAreaEmpty] = useState(false);
  const formattedtoTime = (new Date(totime)).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const formattedfromTime = (new Date(fromtime)).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const businessHandler = () => {
    setError(false);
      navigation.navigate('ImagePickerForBusinessEdit',{
        name:name,
        phone:phone,
        Profile:Profile,
        BusinessName:businessName,
        BusinessCategory:businessCatergory,
        BusinessDescription:description,
        BusinessContact:businesContact,
        BusinessEducation:education,
        WorkingFrom:from,
        WorkingTo:to,
        Btimefrom:formattedfromTime,
        Btimeto:formattedtoTime,
        Bcountry:country,
        Bstate:state,
        Bcity:city,
        Barea:area,
        Baddress:address,
        Bpostalcode:postalCode,
        Id:Id,
        user:user,



      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: myTheme.colors.background,
      }}>
      <BackButton label={'Edit Business Details'} />
      <ScrollView>
        <TouchableWithoutFeedback
          >
          <View style={styles.container}>
            <Title style={styles.heading}> Business Details </Title>
            <CustomTextInput
              setError={setIsBusinessNameEmpty}
              required={true}
              error={isBusinessNameEmpty}
              value={businessName}
              onChange={setBusinessName}
              label="Business Name"
            />
            <CustomTextInput
              setError={setIsBusinessCatergory}
              required={true}
              error={isBusinessCatergory}
              value={businessCatergory}
              onChange={setBusinessCatergory}
              label="Business Category"
            />
            <CustomTextInput
              setError={setIsdescriptionEmpty}
              required={true}
              error={isdescriptionEmpty}
              value={description}
              onChange={setdescription}
              label="Business Description"
            />
            <CustomTextInput
              setError={setIsbusinesContactEmpty}
              required={true}
              error={isbusinesContactEmpty}
              value={businesContact}
              onChange={setBusinesContact}
              label="Business Contact Number"
            />
            <CustomTextInput
              setError={setIsEducationEmpty}
              required={false}
              error={isEducationEmpty}
              value={education}
              onChange={setEducation}
              label=" Business Owner Educational Qualification"
            />
            {/* Working days picker */}
            <Text style={styles.label}>Working Days</Text>
            <CustomDropDown
              options={weekdayFrom}
              setSelectedOption={setFrom}
              selectedOption={from}
            />
            <CustomDropDown
              options={weekdayTo}
              setSelectedOption={setTo}
              selectedOption={to}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
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
            setError={setIsCountryEmpty}
            required={true}
            error={isCountryEmpty}
            value={country}
            onChange={setCountry}
            label="Country"
          />
          <CustomTextInput
            setError={setIsstateEmpty}
            required={true}
            error={isstateEmpty}
            value={state}
            onChange={setState}
            label="State"
          />
          <CustomTextInput
            setError={setIsCityEmpty}
            required={true}
            error={isCityEmpty}
            value={city}
            onChange={setCity}
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
            value={postalCode}
            onChange={setPostalCode}
            label="Postal code"
          />
          <CustomTextInput
            setError={setIsAddressEmpty}
            required={true}
            error={isAddressEmpty}
            value={address}
            onChange={setAddress}
            label="Business Address"
          />
        </View>

        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={businessHandler}
                style={styles.button}>
                <Text style={{color: '#fff'}}>Save</Text>
            </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditBusinessDetailsForm;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
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
