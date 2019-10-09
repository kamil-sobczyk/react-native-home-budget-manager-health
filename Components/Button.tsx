import React, {Component} from "react";
import {Container, Header, Content, Button, Icon, Text} from "native-base";
export default class ButtonIcon extends Component {
  render() {
    return (
      <Button large>
        <Icon name='add' />
      </Button>
    );
  }
}
