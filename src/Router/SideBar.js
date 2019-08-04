import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container} from 'native-base';

export default class SideBar extends Component {
  
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.brandBar}>
          <Text style={styles.brandText}>Rtracker App v1.0</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start'
  },
  brandBar: {
    backgroundColor: '#3F51B5',
    height: 50,
    alignItems: 'center',
    marginVertical: 30
  },
  brandText: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    fontWeight: 'bold'
  }
});