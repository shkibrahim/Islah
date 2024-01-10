import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from '../../Components/BackButton/BackButton'
import NewsCard from '../../Components/NewsCard/NewsCard'

const NewsPage = () => {
  return (
    <View>
      <BackButton label={'News'} />
      <NewsCard/>
      <NewsCard/>
      <NewsCard/>
      <NewsCard/>
      <NewsCard/>
      <NewsCard/>
      <NewsCard/>
      <NewsCard/>
    </View>
  )
}

export default NewsPage

const styles = StyleSheet.create({})