import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import gStyles from "../../static/styles";
import StackHeader from "../../shared/StackHeader";
import { routeNames, themeColor } from "../../static";

const links = [
  { title: "登录", navigate: routeNames.login },
  { title: "主题", navigate: routeNames.theme },
  { title: "国际化", navigate: "" },
  { title: "账号和密码", navigate: "" },
  { title: "关于", navigate: "" }
];

export default class PersonPage extends React.Component {
  to = where => {
    this.props.navigation.navigate(where);
  };
  render() {
    return (
      <View style={gStyles.container}>
        <StackHeader
          leftTitle={"设置"}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <FlatList
          style={{ marginTop: 20 }}
          data={links}
          renderItem={this.renderOption}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  renderOption = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.to(item.navigate)}>
        <View style={{ alignItems: "center", height: 56 }}>
          <Text
            style={{
              color: themeColor.primaryText,
              fontWeight: "400",
              fontSize: 18
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
}
