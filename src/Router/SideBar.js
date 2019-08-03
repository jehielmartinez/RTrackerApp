import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, List, ListItem } from 'native-base';
import moment from 'moment'

export default class SideBar extends Component {
  _renderRow = (item) => {
    return (
      <ListItem button onPress={() => console.log(item)}>
        <Text>{moment(item, 'MM').format('MMMM')}</Text>
      </ListItem>
    )
  }
  render() {
    const months=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    return (
      <Container style={styles.container}>
        <View style={styles.brandBar}>
          <Text style={styles.brandText}>Rtracker App v1.0</Text>
        </View>
        <View style={styles.monthsList}>
          <List 
            scrollEnabled 
            dataArray={months}
            renderRow={this._renderRow}>
          </List>
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
  },
  monthsList:{
    maxHeight: 400
  }
});