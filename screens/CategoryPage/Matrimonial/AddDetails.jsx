import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../../Components/BackButton/BackButton';
import CustomDropDown from '../../../Components/CustomDropDown';
import CustomTextInput from '../../../Components/CustomTextInput';
import CustomButton from '../../../Components/CustomButton';

const AddDetails = () => {
  const [grandFatherNanaName, setGrandFatherNanaName] = useState('');
  const [isGrandFatherNameEmpty, setIsGrandFatherNameEmpty] = useState(false);
  const [parentContactNumberFather, setParentContactNumberFather] =
    useState('');
  const [isPCNFE, setIsPCNFE] = useState(false);
  // PCNF = Parent Contact Number Father empty
  const [parentContactNumberBrother, setParentContactNumberBrother] =
    useState('');
  const [isPCNBE, setIsPCNBE] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState('');

  const submitHandler = () => {
    console.log('submitHandler');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <BackButton label={'Add Details'} />
      <View style={styles.form_container}>
        <Text style={styles.heading}>Matrimonial Details</Text>
        <CustomTextInput
          setError={setIsGrandFatherNameEmpty}
          required={true}
          error={isGrandFatherNameEmpty}
          value={grandFatherNanaName}
          onChange={setGrandFatherNanaName}
          label="Grandfather Name ( Nana )"
        />
        <CustomTextInput
          setError={setIsPCNFE}
          required={true}
          error={isPCNFE}
          value={parentContactNumberFather}
          onChange={setParentContactNumberFather}
          label="Parent Contact Number Father"
        />
        <CustomTextInput
          setError={setIsPCNBE}
          required={true}
          error={isPCNBE}
          value={parentContactNumberBrother}
          onChange={setParentContactNumberBrother}
          label="Parent Contact Number Brother"
        />

        <CustomDropDown
          options={[
            'Choose Marital Status',
            'Single',
            'Married',
            'Divorced',
            'Widowed',
            'Engagement Called off',
          ]}
          selectedOption={maritalStatus}
          setSelectedOption={setMaritalStatus}
        />
        <CustomButton
          label="Add My Details"
          onPress={submitHandler}
        />
      </View>
    </View>
  );
};

export default AddDetails;

const styles = StyleSheet.create({
  form_container: {
    marginHorizontal: 20,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
