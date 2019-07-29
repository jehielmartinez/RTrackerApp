import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Header, Left, Body, Title, Button, Icon, Content, Fab, Accordion, Card, CardItem } from 'native-base';

const duties =[
  {description: 'Electrical Bill', amount: 2543, notes: 'Clave Primaria: 120032', quarter: 'firstQ', status: 'pending'},
  {description: 'Internet Bill', amount: 885, notes: 'Client Num: 2345521', quarter: 'firstQ', status: 'pending'}
]

export default class Dashboard extends Component {

  _renderHeader(item, expanded){
    return(
      <View style={styles.dutyHeader}>
        <Text>{item.description}</Text>
        {expanded 
          ? <Icon name='arrow-dropup'/>
          : <Icon name='arrow-dropdown'/>
        }
      </View>
    );
  }

  _renderContent(item) {  
    return (
      <View >
        <View style={styles.dutyContent}>
          <Text style={styles.dutyContentAmount}>L. {item.amount}</Text>
          <Text style={styles.dutyContentNotes}>{item.notes}</Text>
        </View>
        <View style={styles.dutyContentActions}>
          <Button small success>
            <Icon name='checkmark-circle'/>
          </Button>
          <Button small info>
            <Icon name='redo'/>
          </Button>
          <Button small warning>
            <Icon name='create'/>
          </Button>
          <Button small danger>
            <Icon name='trash'/>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>RTracker</Title>
          </Body>
        </Header>
        <Content padder>
          <Accordion
            dataArray={duties}
            animation={true}
            expanded={true}
            renderContent={this._renderContent}
            renderHeader={this._renderHeader}
          />
        </Content>
        <Fab 
          direction='up' 
          position='bottomRight' 
          style={{backgroundColor:'red'}}
          onPress={() => this.props.navigation.navigate('DutyDetail')}>
          <Icon name='add'/>
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  dutyHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderBottomWidth: 0.3,
  },
  dutyContent: {
    flex:1,
    padding: 5,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dutyContentAmount: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  dutyContentNotes:{
    color: 'grey'
  },
  dutyContentActions:{
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '20%',
    marginVertical: 10,
  }
});