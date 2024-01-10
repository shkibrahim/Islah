import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../Components/BackButton/BackButton';
import AuthorizedMemberCard from '../../Components/AuthorizedMemberCard/AuthorizedMemberCard';
const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButton label={'About Us'} />
      <ScrollView>
        <View style={styles.container}>
          {/* Vision Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vision</Text>
            <Text style={styles.sectionText}>
              "An Effort to Unite the Community - Unity paves way for Reform…"
            </Text>
          </View>
          {/* Mission Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mission</Text>
            <Text style={styles.sectionText}>
              " Our mission is to Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla quam velit,"
            </Text>
          </View>
        </View>
        {/* Founders Members Section */}
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#444',
            }}>
            Authorized Members
          </Text>

          <AuthorizedMemberCard />
          <AuthorizedMemberCard />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'justify',
  },
});

export default AboutUs;
