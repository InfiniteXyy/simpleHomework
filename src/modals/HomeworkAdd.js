import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import gStyles from "../static/styles";
import StackHeader from "../shared/StackHeader";
import MyTextInput from "../shared/MyTextInput";
import { colors, themeColor } from "../static";
import { Icon } from "react-native-elements";
import ActionSheet from 'react-native-actionsheet'

export default class HomeworkAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  buttons = [
    {
      icon: { type: "material", name: "access-time" },
      title: "设置截止时间",
      onClick: () => {}
    },
    {
      icon: { type: "material", name: "event" },
      title: "添加提醒",
      onClick: () => {}
    }
  ];

  render() {
    let options = this.props.navigation.getParam("courses", ["无"])

    return (
      <View style={gStyles.container}>
        <StackHeader
          rightTitle={"选择课程"}
          onPressLeft={this.goBack}
          onPressRight={() => this.ActionSheet.show()}
        />
        <ScrollView style={{marginHorizontal: 24}}>
          <MyTextInput
            style={{ fontSize: 36, color: themeColor.primaryText, marginTop: 80 }}
            placeholder="作业内容..."
            returnKeyType="done"
            onChangeText={text => {
              this.setState({ content: text });
            }}
          />
          <View style={styles.buttonContainer}>
            {this.buttons.map(this.renderButton)}
          </View>
          <Text style={{ fontSize: 18, color: themeColor.primaryText }}>
            备注
          </Text>
          <TouchableWithoutFeedback>
            <View style={styles.tagButton}>
              <Text style={{ color: themeColor.secondaryText }}>点击添加</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          options={options}
          onPress={(index) => {alert(options[index])}}
        />
      </View>
    );
  }

  renderButton = (item, index) => {
    return (
      <TouchableOpacity onPress={item.onClick} key={index.toString()}>
        <View style={styles.button}>
          <Icon {...item.icon} size={24} color={themeColor.activeIcon} />
          <Text style={{ color: themeColor.activeIcon, marginTop: 15 }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: 150,
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowRadius: 2,
    shadowColor: "#cccccc",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.38
  },
  tagButton: {
    marginTop: 16,
    height: 40,
    backgroundColor: "white",
    borderStyle: "dashed",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: themeColor.inactiveIcon,
    alignItems: "center",
    justifyContent: "center"
  }
});
