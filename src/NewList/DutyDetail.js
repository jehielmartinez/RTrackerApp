import React, { Component } from 'react';
import { Text, Container, Header, Content, Form, Item, Label, Input, Textarea, Picker, DatePicker, Button, Body, Title, Left, Icon } from 'native-base';
import {StyleSheet, ActivityIndicator} from 'react-native';
import moment from 'moment'
import { newDuty, editDuty } from '../functions/dutyFunctions';
import { Overlay } from 'react-native-elements';

export default class DutyDetail extends Component {
  state = {
    description: '',
    amount: '',
    notes: '',
    monthHalf: 'firstH',
    _id: '',
    showActivity: false,
    editing: false
  }

  componentDidMount(){
    this.props.navigation.addListener('didFocus', this.loadState)
  }

  loadState = () => {
    const duty = this.props.navigation.getParam('duty', '')
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
      _id
    })
  }

  saveDuty = async() => {
    const {description, amount, notes, monthHalf, _id} = this.state
    const currentMonth = moment().format('MM')

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
  
  render() {
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