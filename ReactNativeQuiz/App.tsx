import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizScreen from './features/Quiz/QuizScreen';
import LeaderboardScreen from './features/Leaderboard/LeaderboardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
      AsyncStorage.setItem(
        'scores',
        JSON.stringify([
          {
            username: 'John Doe',
            score: 10
          },
          {
            username: 'Jane Doe',
            score: 20
          },
          {
            username: 'Anonymous',
            score: 5
          }
        ])
      );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Quiz'>
        <Stack.Screen name='Quiz' component={QuizScreen} />
        <Stack.Screen name='Leaderboard' component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
