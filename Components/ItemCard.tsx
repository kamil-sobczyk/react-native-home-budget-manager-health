import React, {Component} from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body
} from "native-base";
import {inject, observer} from "mobx-react";

@inject("store")
@observer
export default class ItemCard extends Component<any> {
  shouldComponentUpdate = newProps => {
    console.log(newProps.store.apiClient.getItemData());
    console.log(this.props.store.apiClient.getItemData());
    return (
      newProps.store.apiClient.getItemData() !==
      this.props.store.apiClient.getItemData()
    );
  };
  render() {
    const {getItemData} = this.props.store.apiClient;
    const {name, carbohydrate, kcal, lactose} = getItemData();
    console.log("n", name, "l", lactose, "kcal", kcal, "carbs", carbohydrate);
    return (
      name.length > 0 && (
        <Container>
          <Header />
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>{name.lenght > 0 ? name : "No name kurwa"}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>kcal: {kcal}</Text>
                  <Text>lactose: {lactose}</Text>
                  <Text>carbs: {carbohydrate}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      )
    );
  }
}
