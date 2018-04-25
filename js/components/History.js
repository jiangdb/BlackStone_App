import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet,ScrollView ,FlatList,Image, TouchableWithoutFeedback} from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import { SingleDetail } from './Index';

class History extends React.Component {
  static navigationOptions = {
    title: '冲煮记录',
    tabBarVisible: false,
  };

  onPressItem = () => {
    this.props.navigation.navigate('HistoryDetail');
  };

  renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={this.onPressItem}>
        <View style={styles.singleList}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <Text style={styles.listTime}>{item.time}</Text>
          </View>
          <Image style={styles.icon} source={require('../../images/more.png')} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  data = [
    {
      key: '1',
      title: 'history-1',
      time: '2010-02-06',
    },
    {
      key: '2',
      title: 'history-2',
      time: '2010-02-06',
    },
  ]

  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <FlatList
            data={this.data}
            ItemSeparatorComponent={() => <Divider/> }
            renderItem={this.renderItem}
          />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft:7,
    width:8,
    height:13,
  },
  singleList: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft:32,
    paddingRight: 16,
  },
  listTitle: {
    fontSize:17,
    color:'#232323',
  },
  listTime: {
    paddingTop:5,
    fontSize:12,
    color:'#878787',
  }
})

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const HistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(History)

export default HistoryContainer