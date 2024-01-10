import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const initialRegion = {
    latitude: 37.78825, // Set the initial latitude for your map
    longitude: -122.4324, // Set the initial longitude for your map
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markerCoordinate = {
    latitude: 37.78825, // Set the latitude for your marker
    longitude: -122.4324, // Set the longitude for your marker
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker coordinate={markerCoordinate} title="Marker Title" description="Marker Description" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
