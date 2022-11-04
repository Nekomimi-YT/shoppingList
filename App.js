import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
const firebase = require('firebase');
require('firebase/firestore');

  export default class App extends Component {
    constructor() {
      super();
      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyAtxv7-Zb2QEFC8m8X9GXmTUStVKeLEdwc",
        authDomain: "test1-firestore-9c2af.firebaseapp.com",
        projectId: "test1-firestore-9c2af",
        storageBucket: "test1-firestore-9c2af.appspot.com",
        messagingSenderId: "766452589307",
        appId: "1:766452589307:web:a8165d68fb7697ff09865e"
      };

      // Initialize Firebase
      if (!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        }

      // reference the specific colletion, shoppinglists
      this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
      this.state = {
        lists: [],
      }
    }

    componentDidMount() {
      this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)
    }
    
    componentWillUnmount() {
      this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
      const lists = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        var data = doc.data();
        lists.push({
          name: data.name,
          items: data.items.toString(),
        });
      });
      this.setState({
        lists,
      });
    };

    addList() {
      this.referenceShoppingLists.add({
        name: 'TestList',
        items: ['eggs', 'pasta', 'veggies'],
      });
    }    

    render () { 
      return (
        <View style={styles.container}>
        <Text style={styles.text}>Shopping Lists</Text>
        <FlatList
          data={this.state.lists}
          renderItem={({ item }) =>
          <Text style={styles.item}>{item.name}: {item.items}</Text>}
        />
        <Button 
          title="Add an Item"
          onPress={this.addList()}>
        </Button>
      <StatusBar style="auto" />
    </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 40,     
    },
    item: {
      fontSize: 16,
      color: 'blue',
    },
    text: {
      fontSize: 30,
    }
  });
