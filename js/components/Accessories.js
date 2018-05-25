import React from 'react';
import { connect } from 'react-redux';
import { Text, View,StyleSheet, ScrollView, Alert, Modal,TouchableOpacity, TextInput } from 'react-native';
import { saveAccessories } from '../actions/coffeeBuilder.js';
import { saveSelectedAccessories } from '../actions/saveRecord.js'
import Toast from 'react-native-root-toast';

class Accessories extends React.Component {
  static navigationOptions = {
    title: '选择设备',
    tabBarVisible: false,
  };

  state = {
    modalVisible: false,
    modalName: '',
    toastVisible: false,
    toastName: '',
    newOption:'',
    filterOption: this.props.accessories.filterOption,
    kettleOption: this.props.accessories.kettleOption,
    selectedAccessories:[],
  };

  _addOption = (text) => {
    if(text !== '') {
      switch (this.state.modalName) {
        case '滤杯':
          this.state.filterOption.forEach((filter) => {
            filter.selected = false;
          });
          this.state.filterOption.push({
            key: this.state.filterOption.length+1,
            name: text,
            selected: true
          });

          break;
        case '手冲壶':
          this.state.kettleOption.forEach((kettle) => {
            kettle.selected = false;
          });
          this.state.kettleOption.push({
            key: this.state.kettleOption.length+1,
            name: text,
            selected: true
          });
          break;
        default:
          break;
      }
    }
    this._setModalVisible(false);
    this.setState({newOption:''});
  };

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  _showModal = (name) => {
    this.setState({
      modalVisible: true,
      modalName: name,
    });
  };

  _onPressFilter = (key) => {
    this.setState({
      filterOption: this.state.filterOption.map((filter) => {
        if(filter.key === key) {
          return Object.assign({}, filter, {
                  ...filter,
                  selected: true,
                });
        } else {
          return Object.assign({}, filter, {
                  ...filter,
                  selected: false,
                });
        }
      })
    });
  };

  _onPressKettle = (key) => {
    this.setState({
      kettleOption: this.state.kettleOption.map((kettle) => {
        if(kettle.key === key) {
          return Object.assign({}, kettle, {
                  ...kettle,
                  selected: true,
                });
        } else {
          return Object.assign({}, kettle, {
                  ...kettle,
                  selected: false,
                });
        }
      })
    });
  };

  _selectedFilterConfirm = () => {
    let selectedFilter = this.state.filterOption.filter((filter) => filter.selected);
    if(selectedFilter.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  _selectedKettleConfirm = () => {
    let selectedKettle = this.state.kettleOption.filter((kettle) => kettle.selected);
    if(selectedKettle.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  _saveAccessories = () => {
    console.log(this._selectedFilterConfirm());
    if(this._selectedFilterConfirm() && this._selectedKettleConfirm()) {
      let selectedFilter = this.state.filterOption.filter((filter) => filter.selected);
      let selectedKettle = this.state.kettleOption.filter((kettle) => kettle.selected);
      this.state.selectedAccessories.push(selectedFilter[0].name);
      this.state.selectedAccessories.push(selectedKettle[0].name);

      this.props.onSaveSelectedAccessories({
        accessories:this.state.selectedAccessories
      });
      this.props.onSaveAccessories({
        filterOption:this.state.filterOption,
        kettleOption:this.state.kettleOption
      });
      this.props.navigation.goBack();
    } else if (!this._selectedFilterConfirm()) {
      let toast = Toast.show('请选择一款滤杯', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: false,
        animation: false,
        hideOnPress: true,
      });
    } else {
      let toast = Toast.show('请选择一款手冲壶', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: false,
        animation: false,
        hideOnPress: true,
      });
    }


  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{}}>
          <View style={styles.accessoriesSelect}>
            <TouchableOpacity onPress={() => {this._showModal('滤杯')}} activeOpacity={1}>
              <View style={styles.optionContainer}>
                <Text style={styles.addOption}>+添加滤杯</Text>
              </View>
            </TouchableOpacity>
            {
              this.state.filterOption.map((data) => {
                return (
                  <TouchableOpacity
                    key={data.key}
                    onPress={this._onPressFilter.bind(this, data.key)}
                    activeOpacity={1}
                  >
                    <View style={[styles.optionContainer,data.selected? {borderColor: '#DFB86F', backgroundColor:'rgba(223,184,111,0.50)'} : {}]}>
                      <Text style={[styles.optionName, data.selected? {color: '#76510C',} : {}]} >{data.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>

          <View style={styles.accessoriesSelect}>
            <TouchableOpacity onPress={() => {this._showModal('手冲壶')}} activeOpacity={1}>
              <View style={styles.optionContainer}>
                <Text style={styles.addOption}>+添加手冲壶</Text>
              </View>
            </TouchableOpacity>
            {
              this.state.kettleOption.map((data) => {
                return (
                  <TouchableOpacity
                    key={data.key}
                    onPress={this._onPressKettle.bind(this, data.key)}
                    activeOpacity={1}
                  >
                    <View style={[styles.optionContainer,data.selected? {borderColor: '#DFB86F', backgroundColor:'rgba(223,184,111,0.50)'} : {}]}>
                      <Text style={[styles.optionName, data.selected? {color: '#76510C',} : {}]} >{data.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>

        </ScrollView>

        <TouchableOpacity onPress={this._saveAccessories} activeOpacity={1}>
          <View style={styles.btnSave}>
            <Text style={styles.btnSaveText}>确认</Text>
          </View>
        </TouchableOpacity>

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
                <Text style={{fontSize: 18}}>添加{this.state.modalName}</Text>
              </View>
              <View style={styles.modalInput}>
                <TextInput
                  style={{fontSize: 18, padding: 0}}
                  onChangeText={(text) => this.setState({newOption: text})}
                  value={this.state.newOption}
                  placeholder={'新的'+this.state.modalName}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                  onPress={() => {this._setModalVisible(false)}}
                  activeOpacity={1}
                >
                  <View style={[styles.modalBtn,styles.withBorderRight]}>
                    <Text style={{fontSize: 18}}>取消</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={ () => this._addOption(this.state.newOption)}
                  activeOpacity={1}
                >
                  <View style={styles.modalBtn}>
                    <Text style={{fontSize: 18, color:'#3CC51F'}}>确认</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  accessoriesSelect: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    paddingTop:15,
    paddingRight:2.5,
    paddingBottom:15,
    paddingLeft:12.5,
    marginTop:7.5,
    backgroundColor: '#fff'
  },
  optionContainer: {
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
  optionName: {
    fontSize:13,
    color:'#353535',
  },
  addOption: {
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
    accessories: state.accessories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveAccessories: (accessories) => {
      dispatch(saveAccessories(accessories))
    },
    onSaveSelectedAccessories: (accessories) => {
      dispatch(saveSelectedAccessories(accessories))
    }
  }
}

const AccessoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Accessories)

export default AccessoriesContainer