import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Container, Header, Content, Form, Item, Label, Input, Textarea, Picker, DatePicker, Button } from 'native-base';

export default class DutyDetail extends Component {
  

  render() {
    return (
      <Container>
        <Header/>
        <Content>
            <Form padder>
                <Item floatingLabel>
                    <Label>Descripción</Label>
                    <Input/>
                </Item>

                <Item floatingLabel>
                    <Label>Monto</Label>
                    <Input keyboardType='numeric'/>
                </Item>
               
                <Item floatingLabel>
                    <Label>Notas</Label>
                    <Textarea rowSpan={5}/>
                </Item>

                <Item picker>
                    <Picker
                        mode='dropdown'
                        placeholder='Pagar en'
                    >
                        <Picker.Item label='Primera Quincena' value='firstQ'/>
                        <Picker.Item label='Segunda Quincena' value='lastQ'/>
                    </Picker>
                </Item>
                <Button block primary><Text>Almacenar</Text></Button>
                <Button block danger><Text>Cancelar</Text></Button>

            </Form>
        </Content>
      </Container>
    );
  }
}
