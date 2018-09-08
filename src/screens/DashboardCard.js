import React from "react";
import { Text, View, TouchableHighlight, Animated } from "react-native";
import gStyles from "../global/styles";
import { Icon, Badge } from "react-native-elements";
import { routeNames, themeColor } from "../global";
import DashboardCardItem from "./DashboardCardItem";
import realm from "../global/realm";
import { withNavigation } from "react-navigation";

// 计算卡片"内容高度"的函数
const getBodyHeight = num => num * 39 + 24;

class DashboardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.data
    };
  }

  componentWillMount() {
    let course = this.state.course;
    let expanding = course.expanding;
    this.setState({
      opacity: new Animated.Value(expanding ? 1 : 0),
      marginBottomAnim: new Animated.Value(
        expanding ? 0 : -getBodyHeight(course.homeworkList.length)
      )
    });
  }

  componentDidMount() {
    // this.state.course.homeworkList.addListener(this.updateListener);
  }

  componentWillUnmount() {
    // this.state.course.homeworkList.removeListener(this.updateListener);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.course !== this.state.course;
  }

  componentDidUpdate() {
    console.log(this.state.course.title + "updated!!");
  }

  render() {
    if (this.state.course.homeworkList.length === 0) return <View />;
    return (
      <View style={styles.cardContainer}>
        {this.cardTitle()}
        {this.homeworkList()}
      </View>
    );
  }

  cardTitle = () => {
    let course = this.state.course;
    let expanding = course.expanding;
    let icon = expanding ? (
      <Icon
        name="chevron-up"
        type="entypo"
        size={18}
        color={themeColor.inactiveIcon}
      />
    ) : (
      <Badge
        value={course.homeworkList.length}
        containerStyle={{
          backgroundColor: themeColor.underlayColor
        }}
      />
    );

    return (
      <TouchableHighlight
        onPress={this.setCardExpand}
        onLongPress={this.toCourseDetail}
        underlayColor={themeColor.backgroundColor}
      >
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{course.title}</Text>
          <View style={gStyles.rightIconContainer}>{icon}</View>
        </View>
      </TouchableHighlight>
    );
  };

  homeworkList = () => {
    let animProp = {
      opacity: this.state.opacity,
      marginBottom: this.state.marginBottomAnim
    };
    return (
      <Animated.View style={[styles.contentContainer, { ...animProp }]}>
        {this.state.course.homeworkList.map((item, index) => {
          return <DashboardCardItem item={item} key={index} />;
        })}
      </Animated.View>
    );
  };

  setCardExpand = () => {
    let course = this.state.course;
    let expanding = course.expanding;
    let expandHeight = getBodyHeight(course.homeworkList.length);
    realm.write(() => {
      course.expanding = !expanding;
      this.forceUpdate();
    });
    Animated.parallel([
      Animated.spring(this.state.marginBottomAnim, {
        toValue: expanding ? -expandHeight : 0
      }),
      Animated.spring(this.state.opacity, {
        toValue: expanding ? 0 : 1
      })
    ]).start();
  };

  toCourseDetail = () => {
    this.props.navigation.navigate(routeNames.courseDetail, {
      course: this.state.course
    });
  };
}

export default withNavigation(DashboardCard);

const styles = {
  cardContainer: {
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: "white",
    //TODO: android beautify
    shadowColor: "#CCCCCC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2
  },
  cardTitleContainer: {
    height: 45,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center"
  },
  cardTitle: {
    color: themeColor.primaryText,
    fontSize: 16,
    fontWeight: "bold"
  },
  contentContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#DDDDDD",
    paddingVertical: 12,
    overflow: "hidden"
  }
};
