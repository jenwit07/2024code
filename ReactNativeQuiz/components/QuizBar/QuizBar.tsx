import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface QuizBarProps {
  onRefreshPress: () => void;
  onLeaderboardPress: () => void;
}

const QuizBar: React.FC<QuizBarProps> = ({
  onRefreshPress,
  onLeaderboardPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onRefreshPress}>
        <Icon name="refresh" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Quiz App</Text>
      <TouchableOpacity onPress={onLeaderboardPress}>
        <Icon name="trophy" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QuizBar;
