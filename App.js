import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainStackNavigator from './src/navigation/MainStackNavigator'

export default function App() {
  return <MainStackNavigator />
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Main app page</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
