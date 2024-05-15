// CategoryPage.tsx

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {myTheme} from '../../theme';
import subCategories from '../../utils/subCategories';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryPage = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(null);

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    // Handle logic for displaying content based on the selected category
  };

  const [Category, setCategory] = useState();
  const [Image,setImage] = useState()
  const [surname,setsurname] = useState()
  const [name,setname]=useState()
  console.log('my name is',name)
  const [userID,setuserID]=useState()
  const [fatherName,setfatherName] =useState()
  const[Status,setStatus] = useState()
  const[motherName,setmotherName] = useState()
  const [HusbandName,setHusbandName] = useState()
  const [grandFatherName,setgrandFatherName]= useState()
  const [grandFatherNameNana,setgrandFatherNameNana]= useState()
  const[gender,setgender] = useState()
  const[dob,setdob] = useState()
  const [maritalStatus,setmaritalStatus]=useState()
  const [country,setcountry] = useState()
  const [state,setstate] =useState()
  const [city,setcity]= useState()
  const[district,setdistrict] =useState()
  const [postalCode,setpostalCode] =useState()
  const [Address,setAddress] =useState()
  const [Street,setStreet] =useState()
  const [email,setemail]=useState()
  const [password,setpassword] =useState()
  const[nationality,setnationality] =useState()
  const [phoneNumber,setphoneNumber] =useState()
  const[partnerName,setpartnerName] =useState()
  const [Token,setToken] =useState()


  console.log('aSLI CATEGORY IS ', Category)
  useEffect(() => {
    const getCategory = async () => {
      const data = await AsyncStorage.getItem('UserData');
      console.log('user data is ',data)
      const mydat = JSON.parse(data)
      const category = mydat?.Category
      const Image =mydat?.Image
      setImage(Image)
      const surname = mydat?.surname
      setsurname(surname)

      const name = mydat?.name
      setname(name)

      const userID = mydat?.userID
      setuserID(userID)

      const fathername = mydat?.fatherName
      setfatherName(fathername)

      const Status = mydat?.Status
      setStatus(Status)

      const motherName = mydat?.motherName
      setmotherName(motherName)

      const HusbandName = mydat?.HusbandName
      setHusbandName(HusbandName)

      const grandFatherName = mydat?.grandFatherName
      setgrandFatherName(grandFatherName)

      const grandFatherNameNana = mydat?.grandFatherNameNana
      setgrandFatherNameNana(grandFatherNameNana)
      
      const gender = mydat?.gender
      setgender(gender)
      
      const dob = mydat?.dob
      setdob(dob)

      const maritalStatus = mydat?.maritalStatus
      setmaritalStatus(maritalStatus)

      const country = mydat?.country
      setcountry(country)

      const city = mydat?.city
      setcity(city)

      const district = mydat?.district
      setdistrict(district)

      const postalCode = mydat?.postalCode
      setpostalCode(postalCode)

      const Address = mydat?.Address
      setAddress(Address)

      const Street = mydat?.Street
      setStreet(Street)

      const email = mydat?.email
      setemail(email)

      const nationality = mydat?.nationality
      setnationality(nationality)

      const phoneNumber = mydat?.phoneNumber
      setphoneNumber(phoneNumber)

      const partnerName = mydat?.partnerName
      setpartnerName(partnerName)

      const Token = mydat?.Token
      setToken(Token)
      setCategory(category);
    };
    getCategory();
  
    console.log('bhai my category is',Category);
  }, []);


  useEffect(() => {
 
    a();

  }, [Category]);
  console.log(Category)
  const categories = [
    'Offers',
    'Education',
    'Jobs',
    'Business Listed',
    'Matrimonial',
    'NOC',
    'Business Proposal',
    'Business Opportunity',
  ];

  const a = async () => {
    // Assuming you have a category variable

    if (Category == 'business') {
      setSubCategories([
        [
          {
            name: 'View All',
            path: 'viewAllOffers',
          },
          {
            name: 'Add Deals',
            path: 'addDeals',
          },
          {
            name: 'Edit Deals',
            path: 'editDeals',
          },
        ],
        [
          {
            name: 'View All Students',
            path: 'viewAllStudents',
          },
        ],
        [
          {
            name: 'I am a job Seeker',
            path: 'jobSeekers',
          },
         
          {
            name: 'Post New Job',
            path: 'postJob',
          },
          {
            name: 'Edit Job',
            path: 'editJob',
          },
        ],
        [
          {
            name: 'View All ',
            path: 'singleBusinessDetails',
          },
          {
            name: 'Add New Business',
            path: 'businessData1',
          },
          {
            name: 'Edit Businses Details',
            path: 'editBusinessDetails',
          },
        ],
        [
          // {
          //   name: 'Matrimonial',
          //   path: 'matrimonial',
          // },
          {
            name: 'Looking For Bride',
            path: 'lookingForBride',
          },
          {
            name: 'Looking For Groom',
            path: 'lookingForGroom',
          },
          {
            name: 'Add My Details',
            path: 'addMyDetails',
          },
          {
            name: 'Edit My Details',
            path: 'editMyDetails',
          },
        ],
        [
          {
            name: 'Download NOC',
            path: 'downloadNOC',
          },
        ],
        [
          {
            name: 'View All',
            path: 'viewAllBusinessProposal',
          },
          {
            name: 'Add Proposal',
            path: 'addProposal',
          },
          {
            name: 'Edit Proposal',
            path: 'editProposal',
          },
        ],
        [
          {
            name: 'Business \n Opportunities',
            path: 'businessOpportunities',
          },
        ],
      ]);
    }

    if (Category !== 'business') {
      setSubCategories([
        [
          {
            name: 'View All',
            path: 'viewAllOffers',
          },
          {
            name: 'Add Deals',
            path: 'addDeals',
          },
          {
            name: 'Edit Deals',
            path: 'editDeals',
          },
        ],
        [
          {
            name: 'View All Students',
            path: 'viewAllStudents',
          },
        ],
        [
          {
            name: 'I am a job Seeker',
            path: 'jobSeekers',
          },
         
          {
            name: 'Post New Job',
            path: 'postJob',
          },
          {
            name: 'Edit Job',
            path: 'editJob',
          },
        ],
        [
          {
            name: 'View All ',
            path: 'singleBusinessDetails',
          },
        ],
        [
          
          {
            name: 'Looking For Bride',
            path: 'lookingForBride',
          },
          {
            name: 'Looking For Groom',
            path: 'lookingForGroom',
          },
          {
            name: 'Add My Details',
            path: 'addMyDetails',
          },
          {
            name: 'Edit My Details',
            path: 'editMyDetails',
          },
        ],
        [
          {
            name: 'Download NOC',
            path: 'downloadNOC',
          },
        ],
        [
          {
            name: 'View All',
            path: 'viewAllBusinessProposal',
          },
          {
            name: 'Add Proposal',
            path: 'addProposal',
          },
          {
            name: 'Edit Proposal',
            path: 'editProposal',
          },
        ],
        [
          {
            name: 'Business \n Opportunities',
            path: 'businessOpportunities',
          },
        ],
      ]);
    }
  };

  // const subCategories = [
  //   [{
  //     name: 'View All',
  //     path: 'viewAllOffers'
  //   },
  //   {
  //     name: "Add Deals",
  //     path: "addDeals"
  //   },
  //   {
  //     name: "Edit Deals",
  //     path: "editDeals"
  //   },
  //   ],
  //   [{
  //     name: 'View All Students',
  //     path: 'viewAllStudents'
  //   },
  //   ],
  //   [{
  //     name: 'I am a job Seeker',
  //     path: 'jobSeekers'
  //   },
  //   {
  //     name: 'I am a job Provider',
  //     path: 'viewAllStudents'
  //   },
  //   {
  //     name: 'Post New Job',
  //     path: 'postJob'
  //   },
  //   {
  //     name: 'Edit Job',
  //     path: 'editJob'
  //   },
  //   ],
  //   [{
  //     name: 'Viw All ',
  //     path: 'businessListed'
  //   }, {
  //     name: 'Add New Business',
  //     path: 'businessData1'
  //   },
  //   {
  //     name: 'Edit Businses Details',
  //     path: 'editBusinessDetails'
  //   },
  //   ],
  //   [{
  //     name: 'Matrimonial',
  //     path: 'matrimonial'
  //   },
  //   {
  //     name: 'Looking For Bride',
  //     path: 'lookingForBride'
  //   },
  //   {
  //     name: 'Looking For Groom',
  //     path: 'lookingForGroom'
  //   },
  //   {
  //     name: 'Add My Details',
  //     path: 'addMyDetails'
  //   },
  //   {
  //     name: 'Edit My Details',
  //     path: 'editMyDetails'
  //   }
  //   ],
  //   [
  //     {
  //       name: 'Download NOC',
  //       path: 'downloadNOC'
  //     }
  //   ],
  //   [
  //     {
  //       name: 'View All',
  //       path: 'viewAllBusinessProposal'
  //     },
  //     {
  //       name: 'Add Proposal',
  //       path: 'addProposal'
  //     },
  //     {
  //       name: 'Edit Proposal',
  //       path: 'editProposal'
  //     },
  //   ],
  //   [
  //     {
  //       name: 'Business \n Opportunities',
  //       path: 'businessOpportunities'
  //     },
  //   ]
  //   ,

  // ]

  const [subCategories, setSubCategories] = useState([]);

  return (
    <ScrollView>
      <View>
        {/* Main Page Heading */}
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: myTheme.colors.primary,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              backgroundColor: myTheme.colors.primary,
              color: '#fff',
              textAlign: 'center',
              paddingBottom: 8,
            }}>
            Categories
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {/* Left side - Vertical Slide Upwards Categories List */}
          <ScrollView style={{flex: 1, paddingVertical: 16}}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  setCurrentScreenIndex(categories.indexOf(category));
                  handleCategorySelect(category);
                }}
                style={{
                  justifyContent: 'center',
                  padding: 10,
                  borderWidth:
                    currentScreenIndex === categories.indexOf(category) ? 1 : 0,
                  borderColor:
                    currentScreenIndex === categories.indexOf(category)
                      ? myTheme.colors.primary
                      : '#ccc',
                  backgroundColor:
                    currentScreenIndex === categories.indexOf(category)
                      ? '#f0f0f0'
                      : myTheme.colors.primary,
                  alignItems: 'center',
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 32,
                  marginBottom: 4,
                  height: 72,
                }}>
                <Text
                  style={{
                    fontSize:
                      currentScreenIndex === categories.indexOf(category)
                        ? 16
                        : 14,
                    fontWeight: 'bold',
                    color:
                      currentScreenIndex === categories.indexOf(category)
                        ? myTheme.colors.primary
                        : '#fff',
                  }}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Right side - Display selected category content */}
          <View
  style={{ flex: 2, paddingHorizontal: 8, justifyContent: 'center' }}
>
  {selectedCategory ? (
    <>
      {subCategories[categories.indexOf(selectedCategory)] ? (
        subCategories[categories.indexOf(selectedCategory)].map(
          subCategory => (
            subCategory.name === 'Add New Business' ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('businessData1', {
                    surname: surname,
                    name: name,
                    fatherName: fatherName,
                    motherName: motherName,
                    grandFatherName: grandFatherName,
                    grandFatherNameNana: grandFatherNameNana,
                    gender: gender,
                    dob: dob,
                    maritalStatus: maritalStatus,
                    country: country,
                    state: state,
                    city: city,
                    district: district,
                    postalCode: postalCode,
                    Address: Address,
                    Street: Street,
                    email: email,
                    password: password,
                    nationality: nationality,
                    phoneNumber: phoneNumber,
                    Image: Image,
                    partnerName: partnerName,
                    Category: Category,
                  })
                }
                style={styles.subcategoryButton}
                key={subCategory.name}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                  {subCategory.name}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={subCategory.name}
                onPress={() => navigation.navigate(subCategory.path)}
                style={styles.subcategoryButton}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                  {subCategory.name}
                </Text>
              </TouchableOpacity>
            )
          )
        )
      ) : (
        <Text style={{ fontSize: 16, textAlign: 'center', color: '#333' }}>
          No subcategories found for the selected category
        </Text>
      )}
    </>
  ) : (
    <Text style={{ fontSize: 16, textAlign: 'center', color: '#333' }}>
      Select a category
    </Text>
  )}
</View>

        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  subcategoryButton: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    algniItems: 'center',
    padding: 10,
    alignItems: 'center',
    marginBottom: 8,
    elevation: 4,
    height: 72,
    borderRadius: 16,
  },
  categoryButton: {
    justifyContent: 'center',
    algniItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: myTheme.colors.primary,
    alignItems: 'center',
    height: 72,
  },
  btn_text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
