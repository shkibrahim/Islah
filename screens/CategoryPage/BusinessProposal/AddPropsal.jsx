import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';
import {myTheme} from '../../../theme';
import {Icon} from 'react-native-paper';

const AddPropsal = () => {
  const [name, setName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessDetails, setBusinessDetails] = useState('');
  const [location, setLocation] = useState('');
  const [investmentNeeded, setInvestmentNeeded] = useState('');
  const [returnOnInvestment, setReturnOnInvestment] = useState('');
  const [GuarantorDetails1, setGuarantorDetails1] = useState('');
  const [GuarantorDetails2, setGuarantorDetails2] = useState('');
  const [GuarantorDetails3, setGuarantorDetails3] = useState('');
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

  return (
    <ScrollView>
      <BackButton />
      <View style={styles.form_container}>
        <Text style={styles.heading}>Add Business Proposal</Text>
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

        <CustomButton label="Submit  " onPress={() => {}} />
      </View>
    </ScrollView>
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
