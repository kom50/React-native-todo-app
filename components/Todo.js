import { View, Text, TextInput, StyleSheet, Keyboard, TouchableOpacity, FlatList, Alert, ToastAndroid, useColorScheme } from 'react-native'
import React, { useState, useReducer } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { initialState, reducer } from '../helpers/reducer';

// 🔥🔥🔥🔥🔥🔥
const Todo = () => {
    const colorScheme = useColorScheme();
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer
    console.log(themeTextStyle)
    console.log(themeContainerStyle)

    const [todos, dispatch] = useReducer(reducer, initialState)
    const [value, setValue] = useState('')

    const deleteHandler = function (id) {
        Alert.alert(
            "Alert msg",
            "Do you really want to delete.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        dispatch({ type: "DELETE", id })
                        ToastAndroid.showWithGravity(
                            "Task is deleted",
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER
                        );
                    }
                },
            ],
            // {
            //     cancelable: true,
            // }
        );
    }

    const Item = ({ title, id, complete }) => (
        <View style={[styles.item, themeContainerStyle]}>
            <Text onPress={() => dispatch({ type: "COMPLETE", id })} style={[styles.title, { textDecorationLine: complete ? 'line-through' : 'none' }, themeTextStyle]}>{title} </Text>
            <TouchableOpacity style={{ padding: 6 }} onPress={() => deleteHandler(id)} >
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View >
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} id={item.id} complete={item.complete} />
    );

    return (
        <View style={[styles.container, themeContainerStyle]}>
            <View style={[styles.header, themeContainerStyle]}>
                <Text style={[styles.headerText, themeTextStyle, { fontVariant: ['small-caps'] }]}>Todo List</Text>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={todos.todos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={[styles.bottomContainer]}>
                <TextInput
                    style={[styles.input]}
                    placeholder='Enter your task...'
                    defaultValue={value}
                    onChangeText={(value) => setValue(value)}
                    onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        dispatch({ type: 'ADD', value });
                        setValue('')

                    }}
                >
                    <Ionicons name="add-circle" size={54} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Todo


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    header: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 6,
        zIndex: 999,
    },
    headerText: {
        fontSize: 25,
        fontVariant: ['small-caps'],
        fontWeight: 'bold',
    },
    list: {
        height: '78%',
        marginTop: 10,
    },
    input: {
        borderColor: 'white',
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        padding: 15,
        borderWidth: 0.5,
        borderRadius: 50,
        marginTop: 10
    },
    button: {
        width: '20%',
        padding: 5,
        marginLeft: 5,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    bottomContainer: {
        backgroundColor: '#e5e7eb',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

    },
    // Flat list items
    item: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 5,

        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // 
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 2,
    },
    title: {
        fontSize: 26,
        flex: 1,
    },

    // 
    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: '#242c40',
    },
    lightThemeText: {
        color: '#242c40',
    },
    darkThemeText: {
        color: '#d0d0c0',
    },
})