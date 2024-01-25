import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text
} from 'react-native';
import QuizCard from '../../components/QuizCard/QuizCard';
import QuestionData from '../../utils/question.json';
import { Button } from 'react-native-paper';
import QuizBar from '../../components/QuizBar/QuizBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QuestionItem {
  questionText: string;
  answers: string[];
  correctAnswer: number | string;
}

const QuizScreen: React.FC = () => {
  const navigator = useNavigation<any>();
  const [questions, setQuestions] = useState<QuestionItem[]>(QuestionData);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    new Array(QuestionData.length).fill(null)
  );
  const [successCount, setSuccessCount] = useState<number>(0);

  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  };

  const loadQuestions = useCallback(() => {
    const shuffledQuestions = shuffleArray([...QuestionData]).map((q) => ({
      ...q,
      answers: shuffleArray([...q.answers])
    }));

    setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
    setSuccessCount(0);
    setSelectedAnswers(new Array(QuestionData.length).fill(null));
    loadQuestions();
  }, [loadQuestions]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Reset the selected answers and success count
    setSelectedAnswers(new Array(QuestionData.length).fill(null));
    setSuccessCount(0);

    // Shuffle and load new questions
    loadQuestions();

    setRefreshing(false);
  }, [loadQuestions]);

  const onAnswerSelect = (questionIndex: number, answer: string) => {
    const newSelectedAnswers = [...selectedAnswers];

    console.log(questionIndex, answer);
    newSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);

    if (answer === questions[questionIndex].correctAnswer) {
      setSuccessCount((prevCount) => prevCount + 1);
    } else if (
      selectedAnswers[questionIndex] === questions[questionIndex].correctAnswer
    ) {
      setSuccessCount((prevCount) => prevCount - 1);
    }
  };

  const handleRefreshPress = () => {
    onRefresh();
  };

  const handleLeaderboardPress = () => {
    navigator.navigate('Leaderboard' as never);
  };

  const onScoreSubmit = async () => {
    const scoreEntry = {
      username: 'Anonymous',
      score: successCount,
      date: new Date()
    };
    try {
      const scoresString = await AsyncStorage.getItem('scores');
      const scoresArray = scoresString ? JSON.parse(scoresString) : [];
      scoresArray.push(scoreEntry);
      await AsyncStorage.setItem('scores', JSON.stringify(scoresArray));
      navigator.navigate('Leaderboard' as never, { score: successCount });
      //show message about user score and navigate to leaderboard
    } catch (error) {
      console.error('Failed to save score', error);
    }
  };

  return (
    <View style={styles.screen}>
      <QuizBar
        onRefreshPress={handleRefreshPress}
        onLeaderboardPress={handleLeaderboardPress}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!refreshing && (
          <View>
            {questions.map((questionItem, index) => (
              <QuizCard
                key={index}
                question={questionItem.questionText}
                answers={questionItem.answers}
                selectedAnswer={selectedAnswers[index]}
                onAnswerPress={(answer) => onAnswerSelect(index, answer)}
              />
            ))}
          </View>
        )}
        <Button
          mode='contained'
          onPress={onScoreSubmit}
          disabled={selectedAnswers.includes(null)}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginBottom: 40
  },
  submitButton: {
    margin: 10,
    marginBottom: 30,
    height: 50,
    justifyContent: 'center'
  }
});

export default QuizScreen;
