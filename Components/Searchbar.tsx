import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {Container, Header, Item, Input, Icon, Button, Text} from "native-base";
import {observer, inject} from "mobx-react";
import {StoreProps} from "../Lib/Store/RootStore";
import {Store} from "../Lib/interfaces";

interface SearchBarProps extends Store {
  update: () => void;
}

@inject("store")
@observer
export default class SearchBar extends Component<any> {
  private search = (phrase: string) => {
    const {setSearchPhrase} = this.props.store.apiClient;
    const {update} = this.props;

    setSearchPhrase(phrase);
    update();
  };
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChange={e => this.search(e.nativeEvent.text)}
            />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative"
  }
});
