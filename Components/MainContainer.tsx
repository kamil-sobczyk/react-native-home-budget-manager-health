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
  Right,
  DatePicker
} from "native-base";
import {StyleSheet} from "react-native";
import FooterTabs from "./Footer";
import TopHeaderMain from "./Headers/TopHeaderMain";
import {CounterBar} from "./CounterBar";
import {Col, Row, Grid} from "react-native-easy-grid";
import SearchBar from "./Searchbar";
import ItemCard from "./ItemCard";

@inject("store")
@observer
export default class MainContainer extends Component<any, any> {
  componentDidMount = () => {
    this.props.store.apiClient.getSearchData();
  };

  update = () => this.forceUpdate();
  render() {
    const {getSearchPhrase, getItemData} = this.props.store.apiClient;
    return (
      <Container style={styles.container}>
        <TopHeaderMain />
        <Grid>
          <Row size={0.5}>
            <SearchBar update={this.update} />
          </Row>
          <Row size={2} style={styles.counterBack}>
            <View style={styles.counterRow}>
              <CounterBar />
            </View>
          </Row>
          <Row size={5} style={styles.contentRow}>
            <Text>{getSearchPhrase()}</Text>
            <ItemCard />

            {/*<
            DatePicker />*/}
          </Row>
        </Grid>
        <FooterTabs update={this.update} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1fcf0"
  },
  content: {
    padding: 15
  },
  counterBack: {
    backgroundColor: "blue",
    width: "100%",
    zIndex: 0
  },
  counterRow: {
    backgroundColor: "blue",
    height: 200,
    width: "100%",
    // borderBottomLeftRadius: 350,
    // borderBottomRightRadius: 350,
    zIndex: 1
  },
  contentRow: {
    backgroundColor: "lightgrey"
  },
  foodButton: {
    flexDirection: "column"
  }
});
