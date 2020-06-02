import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {
    const [enteredSymptom, setEnteredSymptom] = useState('');
    const [symptoms, setSymptoms] = useState([]);

    const symptomInputHandler = (enteredText) => {
        setEnteredSymptom(enteredText);
    }

    const addSymptomHandler = () => {
        setSymptoms(currentSymptoms => [...currentSymptoms,
        { key: Math.random().toString(), value: enteredSymptom }
        ]);
    };

    const Stack = createStackNavigator();


    function HomeScreen({ navigation }) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        );
    }

    function Details({ navigation }) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        );
    }

    function symptomLogger({ navigation }) {
        return (
            <View style={styles.screen}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Symptom"
                        style={styles.input}
                        onChangeText={symptomInputHandler}
                        value={enteredSymptom}
                    />
                    <Button title="ADD" onPress={addSymptomHandler} />
                </View>
                <FlatList
                    keyExtractor={(item, index) => item.key}
                    data={symptoms}
                    renderItem={itemData => (
                        <View style={styles.listItem}>
                            <Text>{itemData.item.value}</Text>
                        </View>
                    )} />
            </View>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
        </NavigationContainer>
    );
    

    }



         
    

const styles = StyleSheet.create({
    screen: {
        padding: 80

    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 10
    },
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    }
});

