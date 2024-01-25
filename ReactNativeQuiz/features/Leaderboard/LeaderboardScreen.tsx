import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LeaderboardCard from '../../components/LeaderboardCard/LeaderboardCard';

interface ScoreEntry {
  username: string;
  score: number;
}

const LeaderboardScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { score } = route.params || {};
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresString = await AsyncStorage.getItem('scores');
          const scoresArray = scoresString ? JSON.parse(scoresString) : [];
          console.log(scoresArray)
        scoresArray.sort((a: ScoreEntry, b: ScoreEntry) => b.score - a.score);
        setScores(scoresArray);
      } catch (error) {
        console.error('Failed to fetch scores', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {score && <Text>Your score: {score}</Text>}
      {scores.map((entry, index) => (
        <LeaderboardCard
          key={index}
          rank={index + 1}
          username={entry.username}
          score={entry.score}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  scoreEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  username: {
    fontSize: 18
  },
  score: {
    fontSize: 18
  },
  date: {
    fontSize: 14,
    color: 'grey'
  }
});

export default LeaderboardScreen;
