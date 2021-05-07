import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import second_page from '../screens/second_page'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Home Screen' }} />
        <Stack.Screen name='Second' component={second_page} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator