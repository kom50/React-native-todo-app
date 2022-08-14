import { StyleSheet, StatusBar, View } from 'react-native';
import Todo from './components/Todo';

export default function App() {
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
