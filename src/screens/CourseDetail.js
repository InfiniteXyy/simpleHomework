import React from "react";
import { View, ScrollView } from "react-native";
import gStyles from "../global/styles";
import StackHeader from "../shared/StackHeader";
import TabBar from "../shared/TabBar";
import ScrollableTabView from "@bam.tech/react-native-scrollable-tab-view";
import CourseNews from "./CourseNews";
import CourseHistory from "./CourseHistory";
import Modal from "react-native-modal";
import WebPage from "./WebPage";

export default class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.navigation.getParam("course"),
      webUrl: ""
    };
  }

  setWebUrl = url => {
    this.setState({ webUrl: url });
  };

  render() {
    return (
      <View style={gStyles.container}>
        <StackHeader
          leftTitle={this.state.course.title}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <ScrollableTabView renderTabBar={() => <TabBar />}>
          <CourseHistory tabLabel="详情" course={this.state.course} />
          <CourseNews tabLabel="动态" urlCallback={this.setWebUrl} />
          <ScrollView tabLabel="群组" />
          <ScrollView tabLabel="成就" />
        </ScrollableTabView>
        <Modal visible={this.state.webUrl !== ""} style={{
            flex: 1,
            margin: 0

        }}>
          <WebPage
            webUrl={this.state.webUrl}
            back={() => this.setState({ webUrl: "" })}
          />
        </Modal>
      </View>
    );
  }
}
