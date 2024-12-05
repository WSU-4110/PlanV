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
];

const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const navigation = useNavigation(); // Hook to navigate

    const toggleAnswer = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Exit button at the top-left */}
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Settings')}>
                <Image source={ExitDoorIcon} style={styles.exitIcon} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>FAQ</Text>

            {/* FAQ Questions and Answers */}
            {faqData.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                    <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionContainer}>
                        <Text style={styles.question}>{faq.question}</Text>
                        <Text style={styles.arrow}>{expandedIndex === index ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {expandedIndex === index && (
                        <Text style={styles.answer}>{faq.answer}</Text>
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
        backgroundColor: '#f7f9fc',
    },
    exitButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    exitIcon: {
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Gotham-Light', // Use Gotham-Light font
        marginBottom: 20,
    },
    faqItem: {
        marginBottom: 15,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    question: {
        fontSize: 18,
        fontFamily: 'Gotham-Light', // Use Gotham-Light font
        color: '#333',
    },
    arrow: {
        fontSize: 18,
        color: '#333',
    },
    answer: {
        fontSize: 16,
        fontFamily: 'Gotham-Light', // Use Gotham-Light font
        color: '#555',
        paddingLeft: 20,
        paddingTop: 5,
    },
});

export default FAQ;
