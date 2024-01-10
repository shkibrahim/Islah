import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import CustomDropDown from '../../Components/CustomDropDown';
import CustomTextInput from '../../Components/CustomTextInput';
import BackButton from '../../Components/BackButton/BackButton';
import Map from '../../Components/Map/Map';


const ContactUs = () => {
  const navigation = useNavigation();
  const [message, setMessage] = React.useState<string>("")
  const [subject, setSubject] = React.useState<string>("")
  const [ismessageEmpty, setIsmessageEmpty] = React.useState<boolean>(false)

  const subjects = [
    'Subject',
    'Enquiry',
    'Feedback',
    'Suggestion',
  ]

  return (
    <ScrollView >
      <BackButton label='Contact Us' />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={styles.heading}>Head Office</Text>
        <View style={styles.map_container}>
          {/* <Map /> */}
        </View>
        <View>
          <Text style={{ fontWeight: "600" }}>
            <Text style={{ fontWeight: "bold" }}>
              Email :
            </Text>
            example@email.com
          </Text>
        </View>
        <View style={styles.contactus_form}>
          <Text style={styles.heading}>Contact Us</Text>

          <CustomDropDown
            options={subjects}
            selectedOption={subject}
            setSelectedOption={setSubject}
          />
          <CustomTextInput setError={setIsmessageEmpty} required={true} error={ismessageEmpty} value={message} onChange={setMessage} label="Message" />
          <CustomButton onPress={() => { }} label="Submit" />


        </View>
        <View>

        </View>
      </View>
    </ScrollView>

  )
}

export default ContactUs

const styles = StyleSheet.create({
  heading: {
    flex: .1,
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 8
  },
  map_container: {
    height: 200,
    backgroundColor: 'gray',
    marginVertical: 8
  },
  contactus_form: {
    flex: .6,
  }
})