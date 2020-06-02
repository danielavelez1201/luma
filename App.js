import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';

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
