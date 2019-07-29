import React, { Component } from 'react';
import { Text, Container, Header, Content, Form, Item, Label, Input, Textarea, Picker, DatePicker, Button, Body, Title, Left, Icon } from 'native-base';
import {StyleSheet} from 'react-native';

export default class DutyDetail extends Component {
  
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
                  <Input placeholder='Description'/>
                </Item>
              
                <Item bordered regular style={styles.inputStyle}>
                  <Input placeholder='Amount' keyboardType='numeric'/>
                </Item>
               
                <Item bordered regular style={styles.inputStyle}>
                    <Textarea placeholder='Notes' rowSpan={5}/>
                </Item>

                <Item bordered regular picker style={styles.inputStyle}>
                    <Picker
                        mode='dropdown'
                        placeholder='Paying Quarter'
                    >
                        <Picker.Item label='First Quarter' value='firstQ'/>
                        <Picker.Item label='Second Quarter' value='lastQ'/>
                    </Picker>
                </Item>
                <Button style={styles.buttonStyle} block primary><Text>Save</Text></Button>
                <Button style={styles.buttonStyle} block danger><Text>Cancel</Text></Button>
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