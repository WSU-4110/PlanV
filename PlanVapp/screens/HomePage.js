import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import BottomModal from 'react-native-modals'; // Ensure you have this library installed
import { ModalFooter, ModalButton, ModalTitle, ModalContent } from 'react-native-modals'; // Update imports as necessary
import { SlideAnimation } from 'react-native-modals'; // Update imports as necessary
import Dubai from '../assets/Dubai.png';
import Paris from '../assets/Paris.png';
import Japan from '../assets/Japan.png';

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Plan Your Vacation today!</Text>

            <Text style={{ marginHorizontal: 20, fontSize: 17, fontWeight: '500' }}>
                Find the best offers!
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/* Japan */}
                <Pressable
                    style={styles.imageContainer}
                >
                    <Image
                        source={require('../assets/Japan.png')}
                        style={styles.image}
                    />
                    <View style={styles.textOverlay}>
                        <Text style={styles.imageTitle}>Japan</Text>
                    </View>
                </Pressable>

                {/* France */}
                <Pressable
                    style={styles.imageContainer}
                >
                    <Image
                        source={require('../assets/Paris.png')}
                        style={styles.image}
                    />
                    <View style={styles.textOverlay}>
                        <Text style={styles.imageTitle}>Paris</Text>
                    </View>
                </Pressable>

                {/* Dubai */}
                <Pressable
                    style={styles.imageContainer}
                >
                    <Image
                        source={require('../assets/Dubai.png')}
                        style={styles.image}
                    />
                    <View style={styles.textOverlay}>
                        <Text style={styles.imageTitle}>Dubai</Text>
                    </View>
                </Pressable>
            </ScrollView>

            <Pressable
                style={{
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => setModalVisibsle(true)} // Open modal on press
            >
        
            </Pressable>

            <BottomModal
                swipeThreshold={200}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={['up', 'down']}
                footer={
                    <ModalFooter>
                        <ModalButton
                            text="Apply"
                            style={{
                                marginBottom: 20,
                                color: 'white',
                                backgroundColor: '#003580',
                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </ModalFooter>
                }
                modalTitle={<ModalTitle title="Select rooms and guests" />}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: 'bottom',
                    })
                }
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
            </BottomModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 200,
        height: 150,
        marginTop: 10,
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // For positioning the text on top of the image
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    textOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background for readability
        borderRadius: 10,
    },
    imageTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
