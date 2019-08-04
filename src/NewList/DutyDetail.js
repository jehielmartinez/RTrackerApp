import React, { Component } from 'react';
import { Text, Container, Header, Content, Form, Item, Input, Textarea, Picker, Button, Body, Title, Left, Icon, Right, List, ListItem } from 'native-base';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import moment from 'moment'
import { newDuty, editDuty, cloneDuties } from '../functions/dutyFunctions';
import { Overlay } from 'react-native-elements';

export default class DutyDetail extends Component {
  state = {
    description: '',
    amount: '',
    notes: '',
    monthHalf: 'firstH',
    _id: '',
    showActivity: false,
    editing: false,
    pickerOverlayVisible: false,
    month: ''
  }

  componentDidMount(){
    this.props.navigation.addListener('didFocus', this.loadState)
  }

  loadState = () => {
    const duty = this.props.navigation.getParam('duty', '')
    const month = this.props.navigation.getParam('month')
    const {description, notes, monthHalf, _id} = duty
    const amount = JSON.stringify(duty.amount)

    console.log(Object.keys(duty).length)
    
    if(Object.keys(duty).length === 0){
      this.setState({editing: false})
    } else {
      this.setState({editing: true})
    }
    
    this.setState({
      description,
      amount,
      notes,
      monthHalf,
      _id,
      month
    })
  }

  saveDuty = async() => {
    const {description, amount, notes, monthHalf, _id} = this.state
    const currentMonth = this.state.month

    let duty = {}
    let response = ''

    this.setState({showActivity: true})
    
    if(this.state.editing){
      duty = {
        description,
        amount,
        notes,
        monthHalf,
      }
      response = await editDuty(_id, duty)
    } else {
      duty = {
        description,
        amount,
        notes,
        monthHalf,
        month: currentMonth
      }
      response = await newDuty(duty)
    }

    console.log(response)
    this.setState({showActivity: false})

    this.props.navigation.goBack()
  }

  transferAllDuties = async(item) => {
    this.setState({pickerOverlayVisible: false, showActivity: true})
    try {
      const response = await cloneDuties(item)
      console.log('CLONED', response)
      this.setState({showActivity: false})
      this.props.navigation.goBack()
    } catch (error) {
      console.log('ERROR', error)
      this.setState({showActivity: false})
    }
  }

  _renderPickerRow = (item) => {
    return (
      <ListItem key={item} button onPress={() => this.transferAllDuties(item)}>
        <Text>{moment(item, 'MM').format('MMMM')}</Text>
      </ListItem>
    )
  }
  
  render() {
    const months=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>New Duty</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.setState({pickerOverlayVisible: true})}>
              <Icon name='copy'/>
            </Button>
          </Right>
        </Header>
        <Content padder>
            <Form>
                <Item bordered regular style={styles.inputStyle}> 
                  <Input 
                    placeholder='Description'
                    value={this.state.description}
                    onChangeText={(text) => this.setState({description: text})}
                  />
                </Item>
              
                <Item bordered regular style={styles.inputStyle}>
                  <Input 
                    placeholder='Amount' 
                    keyboardType='numeric'
                    value={this.state.amount}
                    onChangeText={(text) => this.setState({amount: text})}
                  />
                </Item>
               
                <Item bordered regular style={styles.inputStyle}>
                    <Textarea 
                      placeholder='Notes' 
                      rowSpan={5}
                      value={this.state.notes}
                      onChangeText={(text) => this.setState({notes: text})}
                    />
                </Item>

                <Item bordered regular picker style={styles.inputStyle}>
                    <Picker
                        mode='dropdown'
                        placeholder='Paying Quarter'
                        onValueChange={(value) => this.setState({monthHalf: value})}
                        selectedValue={this.state.monthHalf}
                    >
                        <Picker.Item label='First Half' value='firstH'/>
                        <Picker.Item label='Second Half' value='secondH'/>
                    </Picker>
                </Item>

                <Button 
                  style={styles.buttonStyle} 
                  block 
                  primary
                  onPress={this.saveDuty}
                >
                  <Text>Save</Text>
                </Button>

                <Button 
                  style={styles.buttonStyle} 
                  block 
                  danger
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Text>Cancel</Text>
                </Button>
            </Form>
            <Overlay
                isVisible={this.state.pickerOverlayVisible}
                onBackdropPress={() => this.setState({pickerOverlayVisible: false})}
              >
                <View>
                  <List 
                    scrollEnabled 
                    dataArray={months}
                    renderRow={this._renderPickerRow}>
                  </List>
                </View>
              </Overlay>
        </Content>
        
        {/* Activity Indicator */}
        <Overlay 
          width='auto'
          height='auto'
          isVisible={this.state.showActivity}
        >
          <ActivityIndicator size='large'/>
        </Overlay >

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    marginVertical: 5,
    borderRadius: 10
  },
  buttonStyle: {
    marginVertical: 5,
    borderRadius: 10,
  }
});