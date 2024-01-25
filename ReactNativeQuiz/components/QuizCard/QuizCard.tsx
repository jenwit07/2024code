import React, { useState } from 'react';
import { Card, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

interface QuizCardProps {
    question: string;
    answers: string[];
    selectedAnswer: string | null;
    onAnswerPress: (answer: string) => void; 
}

const QuizCard: React.FC<QuizCardProps> = ({ question, answers, selectedAnswer, onAnswerPress }) => {

    const handleAnswerPress = (answer: string) => {
        onAnswerPress(answer);
    };

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text style={styles.questionText}>{question}</Text>
                <View style={styles.answersContainer}>
                    {answers.map((answer, index) => (
                        <View key={index} style={styles.answerRow}>
                            <Button
                                mode="contained"
                                style={answer === selectedAnswer ? styles.selectedAnswerButton : styles.answerButton}
                                labelStyle={styles.answerText}
                                onPress={() => handleAnswerPress(answer)}
                            >
                                {answer}
                            </Button>
                        </View>
                    ))}
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        padding: 16,
        elevation: 4,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    answersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    answerRow: {
        width: '48%',
        marginTop: 8,
    },
    answerButton: {
        paddingVertical: 8,
        justifyContent: 'center',
    },
    selectedAnswerButton: {
        paddingVertical: 8,
        justifyContent: 'center',
        backgroundColor: '#6200ee',
    },
    answerText: {
        fontSize: 16,
    },
});

export default QuizCard;
