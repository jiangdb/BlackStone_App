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

  _renderItem = (item) => {
    console.log(item.index);
    return (
      <TouchableWithoutFeedback onPress={() => {
        this.props.navigation.navigate('HistoryDetail', {
          itemIndex: item.index
        })
      }}>
        <View style={styles.singleList}>
          <View style={{flexDirection:'column'}}>
            <Text style={styles.listTitle}>{item.item.category}</Text>
            <Text style={styles.listTime}>{item.item.date}</Text>
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
    if(this.props.history.historyList.length === 0) {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.noHistory}>还没有记录</Text>
        </View>
      )
    } else {
      return (
        <View style={{backgroundColor: '#fff'}}>
          <FlatList
            data={this.props.history.historyList}
            ItemSeparatorComponent={() => <Divider/> }
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  noHistory: {
    height:25,
    marginTop:10,
    lineHeight:25,
    fontSize:16,
    color:'#232323'
  },
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
    history:state.history
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