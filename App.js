import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import TodoItem from './components/TodoItem';

export default function App() {

  const [todo, setTodo] = useState([
    {text: 'Go to the gym', key: '1'},
    {text: 'Buy Coffee', key: '2'},
    {text: 'Paint the house', key: '3'},
    {text: 'Wash My clothe', key: '4'}
  ])

  const pressHandler = (key)=>{
    setTodo(prev=> prev.filter(item=> item.key !== key))
  }

  const addTodo = (text)=>{
    if(text.length > 3){
      setTodo(prev=>[...prev, {text, key: Math.random().toString()}])
    }else{
      Alert.alert('OOPS', 'Todos must be over 3 characters long', [{
        text: 'Understood', onPress: ()=> console.log('closed')
      }])
    }
    
  }

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View style={styles.container}>
        
        <Header />
        <View style={styles.content}>
          <AddTodo addTodo={addTodo} />
          <View style={styles.list}>
            <FlatList
              data={todo}
              renderItem={({item})=>(
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 40
  },
  list: {
    marginTop: 20
  }
 
 
});
