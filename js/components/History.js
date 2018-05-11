import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet,ScrollView ,FlatList,Image, TouchableWithoutFeedback, Modal} from 'react-native';
import { ChoiceBar, Divider } from './Templates';
import ActionSheet from 'react-native-actionsheet'
import Toast from 'react-native-root-toast';
import { removeRecord } from '../actions/coffeeBuilder.js';

class History extends React.Component {
  static navigationOptions = {
    title: '冲煮记录',
    tabBarVisible: false,
  };

  state = {
    modalVisible: false,
    toastVisible: false,
    deleteItemIndex: null,
  };

  _deleteItem = () => {
    this.setState({modalVisible: false});

    this.props.onRemoveRecord(this.state.deleteItemIndex);

    let toast = Toast.show('成功', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: false,
      animation: false,
      hideOnPress: true,
    });

    console.log(this.props.history.historyList)
  };

  _renderItem = (item) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate('HistoryDetail', {
            itemIndex: item.index
          })
        }}
        onLongPress={() => {
          this.setState({deleteItemIndex: item.index})
          this.ActionSheet.show()
        }}
      >
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
            keyExtractor={(item, index) => index.toString()}
          />
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={['删除', '取消']}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={(index) => {
              if(index == 0 )
              this.setState({modalVisible: true})
           }}
          />
          <Modal
            animationType="fade"
            transparent={true}
            presentationStyle='overFullScreen'
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}
          >
            <View style={styles.modalMask}>
              <View style={styles.modalContent}>
                <View style={styles.modalTitle}>
                  <Text style={{fontSize: 18, color: '#0c0c0c', lineHeight: 30,}}>删除记录</Text>
                  <Text style={{fontSize: 16, lineHeight: 30,}}>是否要删除此记录</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback onPress={() => {this.setState({modalVisible:false})}}>
                    <View style={[styles.modalBtn,styles.withBorderRight]}>
                      <Text style={{fontSize: 18}}>取消</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={ () => this._deleteItem()}>
                    <View style={styles.modalBtn}>
                      <Text style={{fontSize: 18, color:'#3CC51F'}}>确认</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </Modal>
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
  },
  modalTitle: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: 17,
    paddingBottom: 17,
  },
  modalMask: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent:{
    backgroundColor:'#fff',
    width:300,
    borderRadius:1.5,
  },
  modalBtn: {
    display: 'flex',
    height:50,
    borderTopWidth:0.5,
    borderStyle:'solid',
    borderTopColor: '#E8E8EA',
    justifyContent: 'center',
    alignItems:'center',
    width: 150,
  },
  withBorderRight: {
    borderStyle: 'solid',
    borderRightWidth: 0.5,
    borderRightColor: '#E8E8EA',
  },
})

const mapStateToProps = state => {
  return {
    history:state.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveRecord: recordIndex => {
      dispatch(removeRecord(recordIndex))
    }
  }
}

const HistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(History)

export default HistoryContainer