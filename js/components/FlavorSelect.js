import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet, ScrollView, Alert, Modal,TouchableWithoutFeedback, TextInput } from 'react-native';
import { saveFlavor } from '../actions/coffeeBuilder.js'

class FlavorSelect extends React.Component {
  static navigationOptions = {
    title: '选择风味',
    tabBarVisible: false,
  };

  state = {
    modalVisible: false,
    newFlavor:'',
    flavorOption: this.props.flavor.flavorOption,
  };

  _addFlavor = (text) => {
    if(text !== '') {
      this.state.flavorOption.push({
        key: this.state.flavorOption.length+1,
        name: text,
        selected: true
      });
    }
    this._setModalVisible(false);
    this.setState({newFlavor:''});
  };

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  _togglePress = (key) => {
    this.setState({
      flavorOption: this.state.flavorOption.map((flavor) => {
        if(flavor.key === key) {
          let selectedFlavor = Object.assign({}, flavor, {
            ...flavor,
            selected: !flavor.selected
          });
          return selectedFlavor;
        } else {
          return flavor;
        }
      })
    });
  };

  _saveFlavor = () => {
    this.props.onSaveFlavor(this.state.flavorOption);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.flavorSelect}>
          <TouchableWithoutFeedback onPress={() => {this._setModalVisible(true)}}>
            <View style={styles.flavorContainer}>
              <Text style={styles.addFlavor}>+添加风味</Text>
            </View>
          </TouchableWithoutFeedback>
          <Modal
            animationType="fade"
            transparent={true}
            presentationStyle='overFullScreen'
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={styles.modalMask}>
              <View style={styles.modalContent}>
                <View style={styles.modalTitle}>
                  <Text style={{fontSize: 18}}>添加风味</Text>
                </View>
                <View style={styles.modalInput}>
                  <TextInput
                    style={{fontSize: 18, padding: 0}}
                    onChangeText={(text) => this.setState({newFlavor: text})}
                    value={this.state.newFlavor}
                    placeholder='新的风味'
                    underlineColorAndroid='transparent'
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableWithoutFeedback onPress={() => {this._setModalVisible(false)}}>
                    <View style={[styles.modalBtn,styles.withBorderRight]}>
                      <Text style={{fontSize: 18}}>取消</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={ () => this._addFlavor(this.state.newFlavor)}>
                    <View style={styles.modalBtn}>
                      <Text style={{fontSize: 18, color:'#3CC51F'}}>确认</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </Modal>
          {
            this.state.flavorOption.map((data) => {
              return (
                <TouchableWithoutFeedback
                  key={data.key}
                  onPress={this._togglePress.bind(this, data.key)}
                >
                  <View style={[styles.flavorContainer,data.selected? {borderColor: '#DFB86F', backgroundColor:'rgba(223,184,111,0.50)'} : {}]}>
                    <Text style={[styles.flavorName, data.selected? {color: '#76510C',} : {}]} >{data.name}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </ScrollView>
        <TouchableWithoutFeedback onPress={this._saveFlavor}>
          <View style={styles.btnSave}>
            <Text style={styles.btnSaveText}>确认</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  flavorSelect: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    paddingTop:15,
    paddingRight:2.5,
    paddingBottom:15,
    paddingLeft:12.5,
  },
  flavorContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:30,
    width: 'auto',
    marginRight: 10,
    marginBottom: 10,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor:'#F8F8F8',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(5,5,5,0.10)',
    borderRadius:3,
  },
  flavorName: {
    fontSize:13,
    color:'#353535',
  },
  addFlavor: {
    fontSize:13,
    color:'#53B2F0',
  },
  btnSave: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height: 55,
    backgroundColor: '#383838',
  },
  btnSaveText: {
    color: '#fff',
    fontSize: 18,
  },
  modalTitle: {
    display: 'flex',
    height:50,
    justifyContent: 'center',
    alignItems:'center',
  },
  modalMask: {
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent:{
    backgroundColor:'#fff',
    width:300,
    borderRadius:1.5,
  },
  modalInput: {
    height:40,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
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
  }
});

const mapStateToProps = state => {
  return {
    flavor: state.flavorSelect
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveFlavor: flavor => {
      dispatch(saveFlavor(flavor))
    }
  }
}

const FlavorSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorSelect)

export default FlavorSelectContainer