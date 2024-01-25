import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface LeaderboardCardProps {
  rank: number;
  username: string;
  score: number;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ rank, username, score }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.rank}>{rank}</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.score}>{score}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaderboardCard;
