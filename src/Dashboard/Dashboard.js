import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Header, Left, Body, Title, Button, Icon, Content, Fab, Accordion} from 'native-base';

const duties =[
  {description: 'Electrical Bill', amount: 2543, notes: 'Clave Primaria: 120032', quarter: 'firstQ', status: 'moved', month: '01'},
  {description: 'Internet Bill', amount: 885, notes: 'Client Num: 2345521', quarter: 'firstQ', status: 'pending', month: '01'},
  {description: 'Apartment Rent', amount: 4500, notes: 'Cuenta: 12345323 Occidente', quarter: 'firstQ', status: 'paid', month: '01'},
]

export default class Dashboard extends Component {

  _renderHeader(item, expanded){
     let iconName
     let iconColor

      switch (item.status) {
        case 'pending':
          iconName = 'alert'
          iconColor = '#d9534f'
        break;
        case 'paid':
          iconName = 'checkmark-circle-outline'
          iconColor = '#5cb85c'
        break;
        case 'moved':
          iconName = 'share-alt'
          iconColor = '#62B1F6'
        break;
        default:
          iconName = 'help'
          iconColor = '#000'
        break;
      }

    return(
      <View style={styles.dutyHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon style={{fontSize: 35, color: iconColor, marginRight: 20}} name={iconName}/>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{item.description}</Text>
        </View>
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
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>RTracker</Title>
          </Body>
        </Header>
        <Content>
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
          style={{backgroundColor:'green'}}
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
    backgroundColor: '#f4f4f4',
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