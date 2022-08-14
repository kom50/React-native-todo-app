import { useEffect } from 'react';
import { StyleSheet, StatusBar, View, Alert, BackHandler } from 'react-native';
import Todo from './components/Todo';

export default function App() {


  useEffect(() => {
    // Back button press
    const backAction = () => {
      Alert.alert('Hold on!', "Are you sure you want to go back?",
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel'
          },
          {
            text: 'YES',
            onPress: () => BackHandler.exitApp()
          }
        ]);
      return true;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [])

  return (
    <View style={styles.container}>
      <Todo />
      <StatusBar backgroundColor='#f8fafc' barStyle='dark-content' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
