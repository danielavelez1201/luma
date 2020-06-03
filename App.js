import React, { useState, Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchBar } from 'react-native-elements';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, text: '', dataSource: null };
        this.arrayholder = [];
    }


    componentDidMount() {
        return fetch("https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms?format=json&language=en-gb",
            {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
                "x-rapidapi-key": "f80e4f1ea8msh0d10a400438b6f7p123755jsn75fcd60495da"
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        dataSource: responseJson
                    },
                    function () {
                        var i;
                        for (i = 0; i < 270; i++) {
                            this.arrayholder.push(responseJson[i])
                        }
                    }
                    
                );
                console.log(this.arrayholder)
            })
            .catch(error => {
                console.error(error);
            });
    }
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar

            const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        console.log("HERE")
        console.log(newData)
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            
            dataSource: newData,
            text: text,
        });
    }
    ListViewItemSeparator = () => {
        //Item sparator view
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                    backgroundColor: '#080808',
                }}
            />
        );
    };
    render() {
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            //ListView to show with textinput used as search bar

            <View style={styles.loggerStyle}>
                <View style={styles.titleStyle}>
                    <Text style={{ fontSize: 30 }}>Welcome to Luma.</Text>
                    <Text syle={{ fontSize: 20 }}>Log your symptoms for today.</Text>
                </View>
                <View style={styles.listStyle}>
                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="Search Here"
                    />
                    <FlatList style={styles.listStyle}
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        renderItem={({ item }) => (
                            <Text style={styles.textStyle}>{item.Name}</Text>
                        )}
                        enableEmptySections={true}
                        style={{ marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    loggerStyle: {
        backgroundColor: "#FFFFFF",
        flex: 1,
    },
    titleStyle: {
        paddingTop: 100,
        padding: 50,
        fontSize: 100
    },
    viewStyle: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 40,
        padding: 16,
    },
    textStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    listStyle: {
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
        padding: 10,
        paddingTop: 0,
        marginTop: 50,

    }
});


/*
export default function App() {

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
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
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
*/

