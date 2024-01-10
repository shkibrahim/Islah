import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button, Paragraph, Text, Title} from 'react-native-paper';
import CustomTextInput from '../../../../Components/CustomTextInput';

const {height} = Dimensions.get('window');

const BusinessData2 = React.memo(({route ,props,navigation}) => {
  const [error, setError] = React.useState(false);
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

  const signupHandler = () => {
    setError(false);
      navigation.navigate('imagePcikerForBusiness');
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
          {error ? (
            <Text style={{color: 'red', marginTop: 4}}>
              All fields with * are mandatory
            </Text>
          ) : null}

          <Button
            mode="contained"
            style={styles.button}
            onPress={signupHandler}>
            Next
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
