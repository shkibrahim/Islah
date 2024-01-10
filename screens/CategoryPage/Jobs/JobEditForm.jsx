import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomDropDown from '../../../Components/CustomDropDown';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';

const JobEditForm = ({route}) => {
  const {id} = route.params;
  const [title, setTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [jobProfile, setJobProfile] = useState('');
  const [isJobProfileEmpty, setIsJobProfileEmpty] = useState(false);
  const [concernPersonname, setConcernPersonname] = useState('');
  const [isConcernPersonnameEmpty, setIsConcernPersonnameEmpty] =
    useState(false);
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [isSalaryEmpty, setIsSalaryEmpty] = useState(false);
  const [isLocationEmpty, setIsLocationEmpty] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [isContactNumberEmpty, setIsContactNumberEmpty] = useState(false);

  const options = [
    'Select Experience',
    'Fresher',
    '1 Month',
    '2 Months',
    '3 Months',
    '4 Months',
    'More than 4 Month',
  ];

  const [experience, setExperience] = useState(options[0]);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <BackButton label={'Jobs'} />
      <Text style={styles.heading}>Edit Job</Text>

      <View style={styles.form_container}>
        <CustomTextInput
          setError={setIsTitleEmpty}
          required={true}
          error={isTitleEmpty}
          value={title}
          onChange={setTitle}
          label="Job Title"
        />
        <CustomTextInput
          setError={setIsJobProfileEmpty}
          required={true}
          error={isJobProfileEmpty}
          value={jobProfile}
          onChange={setJobProfile}
          label="Job Profile"
        />
        <CustomDropDown
          options={options}
          selectedOption={experience}
          setSelectedOption={setExperience}
          label="Experience"
        />
        <CustomTextInput
          setError={setIsSalaryEmpty}
          required={true}
          error={isSalaryEmpty}
          value={salary}
          onChange={setSalary}
          label="Salary offered"
        />
        <CustomTextInput
          setError={setIsLocationEmpty}
          required={true}
          error={isLocationEmpty}
          value={location}
          onChange={setLocation}
          label="Location"
        />
        <CustomTextInput
          setError={setIsConcernPersonnameEmpty}
          required={true}
          error={isConcernPersonnameEmpty}
          value={concernPersonname}
          onChange={setConcernPersonname}
          label="Concern Person Name"
        />
        <CustomTextInput
          setError={setIsContactNumberEmpty}
          required={true}
          error={isContactNumberEmpty}
          value={contactNumber}
          onChange={setContactNumber}
          label="Contact Number"
        />

        <CustomButton label="Save" />
      </View>
    </ScrollView>
  );
};

export default JobEditForm;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  form_container: {
    marginHorizontal: 20,
  },
});
