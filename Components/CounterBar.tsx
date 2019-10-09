import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {AppLoading} from "expo";
import {Container, Button, Text} from "native-base";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import {inject, observer} from "mobx-react";
import SearchBar from "./Searchbar";

interface CounterBarProps {
  style?: {
    position: string;
    top: number;
  };
}

@inject("store")
@observer
export class CounterBar extends Component<any> {
  render() {
    return (
      <View style={styles.container}>
        <Button rounded light style={styles.counter}>
          <Text>66%</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: 0
  },
  counter: {
    alignSelf: "center",
    marginTop: 20
  }
});
