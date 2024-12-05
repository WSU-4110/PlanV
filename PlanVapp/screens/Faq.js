import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import ExitDoorIcon from '../assets/exit-door.png'; // Exit door icon
import { useNavigation } from '@react-navigation/native';

const faqData = [
    { question: "How do we contact you?", answer: "Use the contact us page." },
    { question: "What is the refund policy?", answer: "Please check with your service that you are buying from." },
    { question: "How do I change my payment method?", answer: "Go to the payment section in settings." },
    { question: "Is the app available in multiple languages?", answer: "We currently support English only." },
    { question: "Can I cancel my booking?", answer: "Yes, however, some bookings cannot be cancelled." },
    { question: "Is there a dark mode option?", answer: "PlanV does not have a dark mode option, however, you can travel to your mobile device settings and turn on Dark Mode there." }
];

const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const navigation = useNavigation();

    const toggleAnswer = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Exit button */}
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Settings')}>
                <Image source={ExitDoorIcon} style={styles.exitIcon} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Frequently Asked Questions</Text>

            {/* FAQ List */}
            {faqData.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                    <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionContainer}>
                        <Text style={styles.question}>{faq.question}</Text>
                        <Text style={styles.arrow}>{expandedIndex === index ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {expandedIndex === index && (
                        <View style={styles.answerContainer}>
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#d0eefe', // Light pink background for cuteness
    },
    exitButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    exitIcon: {
        width: 30,
        height: 30,
        tintColor: '#d0eefe',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0572ad', 
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'Gotham-Light', 
    },
    faqItem: {
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFF',
    },
    question: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    arrow: {
        fontSize: 16,
        color: '#1892d3',
        fontWeight: 'bold',
    },
    answerContainer: {
        backgroundColor: '#b0dff8',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#FAD4E0', 
    },
    answer: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
});

export default FAQ;
