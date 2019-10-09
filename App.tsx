import React, {Component} from "react";
import {AppLoading} from "expo";
import {StyleSheet, Text, View, Button, Dimensions} from "react-native";
import {TopBar} from "./Components/TopBar";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import SearchBar from "./Components/Searchbar";
import FooterTabs from "./Components/Footer";
import {Provider} from "mobx-react";
import {store} from "./Lib/Store/RootStore";
import ButtonIcon from "./Components/Button";
import {Header, Content, Container} from "native-base";
import MainContainer from "./Components/MainContainer";

interface AppState {
  isReady: boolean;
}

export default class App extends Component<{}, AppState> {
  state = {
    isReady: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({isReady: true});
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Container style={styles.container}>
          <MainContainer />
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "green"
  }
});
