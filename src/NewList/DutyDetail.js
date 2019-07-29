import React, { Component } from 'react';
import { Text, Container, Header, Content, Form, Item, Label, Input, Textarea, Picker, DatePicker, Button } from 'native-base';
import {StyleSheet} from 'react-native';

export default class DutyDetail extends Component {
  
  render() {
    return (
      <Container>
        <Header/>
        <Content padder>
            <Form>
                <Item bordered regular style={styles.inputStyle}> 
                  <Input placeholder='Descripción'/>
                </Item>
              
                <Item bordered regular style={styles.inputStyle}>
                  <Input placeholder='Monto' keyboardType='numeric'/>
                </Item>
               
                <Item bordered regular style={styles.inputStyle}>
                    <Textarea placeholder='Notas' rowSpan={5}/>
                </Item>

                <Item bordered regular picker style={styles.inputStyle}>
                    <Picker
                        mode='dropdown'
                        placeholder='Pagar en'
                    >
                        <Picker.Item label='Primera Quincena' value='firstQ'/>
                        <Picker.Item label='Segunda Quincena' value='lastQ'/>
                    </Picker>
                </Item>
                <Button style={styles.buttonStyle} block primary><Text>Almacenar</Text></Button>
                <Button style={styles.buttonStyle} block danger><Text>Cancelar</Text></Button>
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