import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Form, Item, Label, Input, Textarea, Picker, DatePicker } from 'native-base';

export default class DutyDetail extends Component {
  

  render() {
    return (
      <Container>
        <Header/>
        <Content>
            <Form padder>
                <Item>
                    <Label>Descripcion</Label>
                    <Input/>
                </Item>
                <Item picker>
                    <DatePicker
                        defaultDate={new Date()}
                        locale={'es'}
                        animationType={'fade'}
                        placeHolderText={'Fecha de Pago'}
                    />
                </Item>
                <Item>
                    <Label>Fecha de Pago</Label>
                    <Input keyboardType='numeric'/>
                </Item>
                <Item>
                    <Label>Notas</Label>
                    <Textarea rowSpan={5}/>
                </Item>
            </Form>
        </Content>
      </Container>
    );
  }
}
