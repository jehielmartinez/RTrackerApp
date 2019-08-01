import React, { Component } from 'react';
import { Text, Container, Header, Content, Form, Item, Label, Input, Textarea, Picker, DatePicker, Button, Body, Title, Left, Icon } from 'native-base';
import {StyleSheet} from 'react-native';
import moment from 'moment'
import { newDuty } from '../functions/dutyFunctions';

export default class DutyDetail extends Component {
  state={
    description: '',
    amount: '',
    notes: '',
    monthHalf: 'firstH'
  }

  saveDuty = async() => {
    const {description, amount, notes, monthHalf} = this.state
    const currentMonth = moment().format('MM')

    const duty = {
      description,
      amount,
      notes,
      monthHalf,
      month: currentMonth
    }

    const response = await newDuty(duty)
    console.log(response)

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
                        <Picker.Item label='Second Half' value='lastH'/>
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