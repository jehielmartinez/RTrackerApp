import React, { Component } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Container, Text, Header, Left, Body, Title, Button, Icon, Content, Fab, Accordion, Tabs, Tab} from 'native-base';
import moment from 'moment';
import { getDuties, deleteDuty, payDuty, transferDuty } from '../functions/dutyFunctions';

export default class Dashboard extends Component {
  state={
    firstHalfDuties:[],
    secondHalfDuties:[],
    month: moment().format('MM'),
    refreshing: false
  }

  componentDidMount(){
    this.props.navigation.addListener('didFocus', this.getAllDuties)
  }

  getAllDuties = async() => {
    const {month} = this.state
    this.setState({refreshing: true})
    try {

      const responseFirstHalf = await getDuties(month, 'firstH')
      this.setState({firstHalfDuties: responseFirstHalf.data})
      console.log('FIRST HALF DUTIES', responseFirstHalf)

      const responseSecondHalf = await getDuties(month, 'secondH')
      this.setState({secondHalfDuties: responseSecondHalf.data})
      console.log('SECOND HALF DUTIES', responseSecondHalf)

      this.setState({refreshing: false})
      
    } catch (error) {
      console.log('ERROR', error)
      this.setState({refreshing: false})
    }

  }

  deleteOneDuty = async(id) => {
    try {
      response = await deleteDuty(id)
      console.log('DELETED', response)
      this.getAllDuties()
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  payOneDuty = async(id) => {
    try {
      response = await payDuty(id)
      console.log('PAID', response)
      this.getAllDuties()
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  transferOneDuty = async(id, currentHalf) => {
    let half = ''
    
    if(currentHalf === 'firstH'){
      half = 'secondH'
    } else if(currentHalf === 'secondH'){
      half = 'firstH'
    }

    try {
      const response = await transferDuty(id, half)
      console.log('TRANSFERED', response)
      this.getAllDuties()
    } catch (error) {
      console.log('ERROR', error)
    }
  }

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
          <Button small success onPress={() => this.payOneDuty(item._id)}>
            <Icon name='checkmark-circle'/>
          </Button>
          <Button small info onPress={() => this.transferOneDuty(item._id, item.monthHalf)}>
            <Icon name='redo'/>
          </Button>
          <Button small warning onPress={() => this.props.navigation.navigate('DutyDetail', {duty: item})}>
            <Icon name='create'/>
          </Button>
          <Button small danger onPress={() => this.deleteOneDuty(item._id)}>
            <Icon name='trash'/>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    const monthName = moment(this.state.month, 'MM').format('MMMM')
    return (
      <Container>

        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>{monthName}</Title>
          </Body>
        </Header>

        <Tabs>
          <Tab heading='First Half'>
          <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing} 
                  onRefresh={this.getAllDuties}
                />
              }
            >
              <Accordion
                dataArray={this.state.firstHalfDuties}
                animation={true}
                expanded={true}
                renderContent={this._renderContent.bind(this)}
                renderHeader={this._renderHeader}
              />
            </Content>
          </Tab>

          <Tab heading='Second Half'>
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing} 
                  onRefresh={this.getAllDuties}
                />
              }
            >
              <Accordion
                dataArray={this.state.secondHalfDuties}
                animation={true}
                expanded={true}
                renderContent={this._renderContent.bind(this)}
                renderHeader={this._renderHeader}
              />
            </Content>
          </Tab>
        </Tabs>

        <Fab 
          direction='up' 
          position='bottomRight' 
          style={{backgroundColor:'green'}}
          onPress={() => this.props.navigation.navigate('DutyDetail', {duty: {}})}>
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