/**
 * OpenCode Mobile - React Native Entry Point
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './package.json';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OpenCode Mobile</Text>
      <Text>App is running successfully!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

AppRegistry.registerComponent(appName, () => App);
