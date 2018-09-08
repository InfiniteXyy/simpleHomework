import React from 'react';
import { View, ScrollView, Text, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { gStyles, routeNames, themeColor } from '../../global';
import StackHeader from '../../components/StackHeader';
import MyListItem from '../../components/MyListItem';

const df = date => {
  if (date) return moment(date).format('YYYY-M-D');
  else return '未设置';
};

export default class HomeworkDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homework: props.navigation.getParam('homework'),
      hasEdit: false
    };
  }
  static buttons = [
    { title: '完成', iconProp: { name: 'check-circle', type: 'feather' } },
    { title: '归档', iconProp: { name: 'package', type: 'feather' } },
    { title: '删除', iconProp: { name: 'delete', type: 'material' } }
  ];

  refresh = () => {
    this.setState({ hasEdit: true });
  };

  render() {
    let homework = this.state.homework;
    let listItems = [
      { title: '课程', content: homework.course.title },
      { title: '内容', content: homework.content },
      { title: '截止时间', content: df(homework.deadline) },
      { title: '备注', content: '无' }
    ];
    return (
      <View style={gStyles.container}>
        <StackHeader leftTitle={'作业'} onPressLeft={this.handleBack} />
        <ScrollView>
          <View style={gStyles.cardContainer}>{this.detailList(listItems)}</View>
          <View style={[gStyles.cardContainer, styles.buttonContainer]}>{this.buttonGroup()}</View>
        </ScrollView>
      </View>
    );
  }

  handleBack = () => {
    this.props.navigation.goBack();
    if (this.state.hasEdit) {
      this.props.navigation.getParam('refreshUI')();
    }
  };

  detailList = details => {
    return details.map((item, index) => (
      <MyListItem
        key={index}
        {...item}
        onPressRight={() => this.handleEdit(item)}
        needBottom={index !== details.length - 1}
      />
    ));
  };

  buttonGroup = () => {
    return HomeworkDetail.buttons.map((item, index) => {
      let borderProps = {
        borderTopStartRadius: index === 0 ? 5 : 0,
        borderBottomStartRadius: index === 0 ? 5 : 0,
        borderTopEndRadius: index === 2 ? 5 : 0,
        borderBottomEndRadius: index === 2 ? 5 : 0
      };
      return (
        <TouchableHighlight
          style={[styles.button, { ...borderProps }]}
          underlayColor={themeColor.underlayColor}
          key={index}
          onPress={() => this.handleButton(item)}
        >
          <View>
            <Icon {...item.iconProp} color={themeColor.activeIcon} />
            <Text style={styles.buttonTitle}>{item.title}</Text>
          </View>
        </TouchableHighlight>
      );
    });
  };

  handleButton = item => {
    showMessage({
      message: '功能还没有完善(#`O′)',
      description: item.title,
      type: 'info'
    });
    switch (item.title) {
      case '完成':
        break;
      case '归档':
        break;
      case '删除':
        break;
      default:
        break;
    }
  };

  handleEdit = item => {
    this.props.navigation.navigate(routeNames.homeworkEdit, {
      content: item.content,
      editType: item.title,
      item: this.state.homework,
      refresh: this.refresh
    });
  };
}

const styles = {
  buttonContainer: {
    height: 90,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonTitle: {
    marginTop: 12,
    color: themeColor.secondaryText,
    fontSize: 13,
    fontWeight: '500'
  },
  button: {
    flex: 1,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'
  }
};