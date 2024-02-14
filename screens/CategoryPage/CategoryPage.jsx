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

  const [category, setCategory] = useState('');
  useEffect(() => {
    const getCategory = async () => {
      const category = await AsyncStorage.getItem('category');
      setCategory(category);
    };
    getCategory();
    a();
    console.log('my category is',category);
  }, []);

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

    if (category == 'business') {
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
            path: 'businessListed',
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
          {
            name: 'Matrimonial',
            path: 'matrimonial',
          },
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
          // {
          //   name: 'Edit Proposal',
          //   path: 'editProposal',
          // },
        ],
        [
          {
            name: 'Business \n Opportunities',
            path: 'businessOpportunities',
          },
        ],
      ]);
    }

    if (category != 'business') {
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
            path: 'businessListed',
          },
        ],
        [
          {
            name: 'Matrimonial',
            path: 'matrimonial',
          },
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
          // {
          //   name: 'Edit Proposal',
          //   path: 'editProposal',
          // },
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
            style={{flex: 2, paddingHorizontal: 8, justifyContent: 'center'}}>
            {selectedCategory ? (
              <>
                {subCategories[categories.indexOf(selectedCategory)] ? (
                  subCategories[categories.indexOf(selectedCategory)].map(
                    subCategory => (
                      <TouchableOpacity
                        key={subCategory.name}
                        onPress={() => navigation.navigate(subCategory.path)}
                        style={styles.subcategoryButton}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333',
                          }}>
                          {subCategory.name}{' '}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )
                ) : (
                  <Text
                    style={{fontSize: 16, textAlign: 'center', color: '#333'}}>
                    No subcategories found for the selected category
                  </Text>
                )}
              </>
            ) : (
              <Text style={{fontSize: 16, textAlign: 'center', color: '#333'}}>
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
