import React, {Component} from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from "native-base";
import {observer, inject} from "mobx-react";
import {StoreProps} from "../Lib/Store/RootStore";
import {observable} from "mobx";
import {bool} from "prop-types";
import {StyleSheet, AlertAndroid, Alert} from "react-native";
import {FooterSingleTab} from "../Lib/Store/Stores/ScreenManager";

@inject("store")
@observer
export default class FooterTabs extends Component<any, any> {
  private tabs: FooterSingleTab[] = this.props.store.screenController
    .footerTabs;

  private onTabPress = (index: number) => {
    this.setActiveTab(index);
    this.props.store.apiClient.getInfo();
    this.props.update();
    // Alert.alert(
    //   `Bang, bang!!!`,
    //   `Tab number ${index + 1} clicked!`,
    //   [
    //     {
    //       text: "Ask me later",
    //       onPress: () => console.log("Ask me later pressed")
    //     },
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     {text: "OK", onPress: () => console.log("Ok Pressed")}
    //   ],
    //   {cancelable: false}
    // );
  };

  private setActiveTab = (index: number) => {
    this.tabs.map((tab: FooterSingleTab, i: number) => {
      if (index === i) {
        tab.active = true;
        tab.onPress();
      } else {
        tab.active = false;
      }
    });
  };

  render() {
    return (
      <Footer style={styles.footer}>
        <FooterTab>
          {this.tabs.map((tab: FooterSingleTab, index: number) => (
            <Button
              vertical
              key={tab.icon}
              onPress={() => this.onTabPress(index)}
              active={tab.active}
            >
              <Icon name={tab.icon} />
            </Button>
          ))}
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0
  }
});
