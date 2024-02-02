import React, { useState ,useEffect} from 'react';
import {FlatList, StyleSheet, View,Text,ActivityIndicator} from 'react-native';
import BackButton from '../../../Components/BackButton/BackButton';
import OfferCard from '../../../Components/OfferCard/OfferCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {myTheme} from '../../../theme';
const Offers = () => {
  function convertDateFormat(oldFormat) {
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
  
    // Extract day, month, and year from oldFormat
    const [, day, monthAbbr, year] = /(\d+),\s*([a-zA-Z]+)\s*(\d+)/.exec(oldFormat);
  
    // Convert month abbreviation to numeric format
    const month = months[monthAbbr];
  
    // Return the formatted date
    return `${year}-${month}-${day.padStart(2, '0')}`;
  }
  async function deleteDocuments() {
    try {
      console.log('Starting deletion process...');
      
      const today = new Date().toISOString().split('T')[0]; // Get today's date in the format "YYYY-MM-DD"
  
      const querySnapshot = await firestore()
        .collectionGroup('OffersIndividual')
        .get();
        
      console.log('Query snapshot received:', querySnapshot.size, 'documents found.');
  
      // Delete the documents
      querySnapshot.forEach(async (doc) => {
        const endDate = doc.data().EndDate;
        const ali = 'Thu 30, Nov 2023'
        const ahmad = convertDateFormat(ali);
        console.log('me hu ',ahmad)
        const formattedEndDate =  await convertDateFormat(endDate);
        console.log('today is',today)
        console.log('end date is' , formattedEndDate)


        if (formattedEndDate > today) {
          console.log('abhi din ha')
        
        }


        if (formattedEndDate <= today) {
          
          console.log('Deleting document with ID:', doc.id);
          await doc.ref.delete();
          console.log(`Document with ID ${doc.id} deleted successfully.`);
        }
      });
  
      console.log('Deletion process completed.');
    } catch (error) {
      console.error('Error during deletion process:', error);
    }
  }
  
  const[Loading,setLoading] = useState(false)
  const [OfferData, setOfferData] = useState([]);
  const fetchData = async () => {
    setLoading(true)
    await deleteDocuments()
    console.log('fsf')
    try {
      const querySnapshot = await firestore()
        .collectionGroup('OffersIndividual')
        .get();
  
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      // Check if data.docs is defined before mapping
      if (data && Array.isArray(data)) {
        setLoading(false);
        setOfferData(data)
        console.log(data)
     
  
        // You can set other states here if needed
        // setData2(data);
        // setoriginalData(data);
  
        // console.log('Data1:', data); // Log the fetched data
      } else {
        console.log('No documents found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {



    fetchData();
  }, []);
    
  const offersData = [
    {
      id: '1',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    {
      id: '2',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    {
      id: '3',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    {
      id: '4',
      title: 'Offer Title 1',
      category: 'Category 1',
      offerDetails: 'Offer Details 1',
      dateFrom: '12/12/2021',
      dateTo: '12/18/2021',
      timeFrom: '12:00 PM',
      timeTo: '5:00 PM',
      city: 'City 1',
      area: 'Area 1',
      postalCode: '12345',
      contact: '03001234567',
    },
    // Add more offer data objects as needed
  ];
  const main = '#197739';
  const renderItem = ({item}) => (
 <View style={{ borderWidth: .5,
  borderColor: '#ddd',
  borderRadius: 10,
  elevation: 2,
  marginHorizontal: 16,
  marginVertical: 6,
  backgroundColor: '#fff',
  paddingHorizontal: 16,
  paddingVertical: 12,}}>


<View>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.category}>{item.Category}</Text>
          <Text style={{color:main, fontSize:17,fontWeight:'bold' ,alignSelf:'center', marginBottom:12}}> OFFER DETAILS</Text>
          <Text style={styles.detail}>{item.OffersDetails}</Text>
          {/* Offer date start to end */}
          <Text style={styles.detail}>Valid: {item.StartDate} - {item.EndDate}</Text>
          {/* offer timings */}
          <Text
            style={styles.detail}>Timings: {item.StartTime}  -  {item.EndTime}</Text>


          <Text style={styles.detail}>
            Location :{' '}
            <Text style={styles.detail}>
              {item.City} {item.Area} {item.PostalCode}{' '}
            </Text>
          </Text>
          <Text style={styles.detail}>{`Contact: ${item.ContactDetails}`}</Text>
        </View>





 </View>
  );

  return (
    <View style={styles.container}>
      <BackButton label="Offers" />

      {Loading ? (
              <ActivityIndicator
                size="large"
                color= '#197739'
                style={{
                  flex: 1,
                  alignSelf:"center",
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
      <View style={{flex: 1, paddingHorizontal: 4, paddingVertical: 4}}>
        <FlatList
          data={OfferData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
            )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: myTheme.colors.primary,
  },
  category: {
    fontSize: 16,
    color: '#555',
    // marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 3,
    color: 'black',
  },
});

export default Offers;
