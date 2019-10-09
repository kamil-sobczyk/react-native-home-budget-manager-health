import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { AppLoading } from "expo";
import { Container, Button, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

interface TopBarState {
  isReady: boolean;
}

interface TopBarProps {
  style?: {
    position: string;
    top: number;
  };
}

export class TopBar extends Component<TopBarProps, TopBarState> {
  render() {
    return (
      <View style={styles.container}>
        <Button>
          <Text>Dupa</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0
  }
});
