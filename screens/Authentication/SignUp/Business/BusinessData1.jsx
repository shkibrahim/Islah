import React, { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Paragraph, Text, Title } from 'react-native-paper';
import CustomDropDown from '../../../../Components/CustomDropDown';
import CustomTextInput from '../../../../Components/CustomTextInput';



const BusinessData1=  React.memo(({route ,props,navigation}) => {

  const [error, setError] = React.useState(false)
  const [isBusinessNameEmpty, setIsBusinessNameEmpty] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [isdescriptionEmpty, setIsdescriptionEmpty] = useState(false)
  const [description, setdescription] = useState('')
  const [isBusinessCatergory, setIsBusinessCatergory] = useState(false)
  const [businessCatergory, setBusinessCatergory] = useState('')
  const [isbusinesContactEmpty, setIsbusinesContactEmpty] = useState(false)
  const [businesContact, setBusinesContact] = useState('')
  const [isEducationEmpty, setIsEducationEmpty] = useState(false)
  const [education, setEducation] = useState('')
  const weekdayFrom = [
    'From',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const weekdayTo = [
    'To',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const [from, setFrom] = useState(weekdayFrom[0])
  const [to, setTo] = useState(weekdayTo[0])
  // Onpress handler
  const onpressHandler = () => {
    setError(false)
      navigation.navigate('businessData2')
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Title style={styles.heading}> Business Details </Title>
        <Paragraph style={{ marginBottom: 8 }}>
          ( All fields with * are mandatory )
        </Paragraph>
        <CustomTextInput setError={setIsBusinessNameEmpty} required={true} error={isBusinessNameEmpty} value={businessName} onChange={setBusinessName} label="Business Name" />
        <CustomTextInput setError={setIsBusinessCatergory} required={true} error={isBusinessCatergory} value={businessCatergory} onChange={setBusinessCatergory} label="Business Category" />
        <CustomTextInput setError={setIsdescriptionEmpty} required={true} error={isdescriptionEmpty} value={description} onChange={setdescription} label="Business Description" />
        <CustomTextInput setError={setIsbusinesContactEmpty} required={true} error={isbusinesContactEmpty} value={businesContact} onChange={setBusinesContact} label="Business Contact Number" />
        <CustomTextInput setError={setIsEducationEmpty} required={false} error={isEducationEmpty} value={education} onChange={setEducation} label=" Business Owner Educational Qualification" />
        {/* Working days picker */}
        <Text style={styles.label}>
          Working Days
        </Text>
        <CustomDropDown options={weekdayFrom} setSelectedOption={setFrom} selectedOption={from} />
        <CustomDropDown options={weekdayTo} setSelectedOption={setTo} selectedOption={to} />
        {
          error ? <Text style={{ color: 'red', marginTop: 4 }}>All fields with * are mandatory</Text> : null
        }

        <Button
          mode="contained"
          style={styles.button}
          onPress={onpressHandler}
        >
          Next
        </Button>
      </View>
    </TouchableWithoutFeedback>


  )
})
export default BusinessData1

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontFamily: 'Roboto',
  },
  heading: {
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    color: "#197739"

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
    backgroundColor: "#ddd",
  },
  button: {
    width: '100%',
    marginVertical: 16,
    backgroundColor: "#197739"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#197739",
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Roboto',
    marginLeft: 4
  },
});