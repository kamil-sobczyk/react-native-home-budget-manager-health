import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  View,
  Left,
  Body,
  Title,
  Right
} from "native-base";
import {StyleSheet} from "react-native";
import FooterTabs from "../Footer";

@inject("store")
@observer
export default class TopHeaderMain extends Component<any, any> {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Nutri</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f1fcf0"
  }
});
