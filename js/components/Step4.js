import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { Divider } from './Templates';

class Step4 extends React.Component {
  static navigationOptions = {
    title: '开机向导',
    tabBarVisible: false,
  };

  state= {
    wifiName: '',
    wifiPsw: ''
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'columns', alignContent:'center'}}>
        <View style={{marginTop: 59}}>
          <Text style={{fontSize: 24,color: '#232323'}}>4/4 第四步</Text>
        </View>
        <View style={{marginTop: 18.5}}>
          <Text style={{fontSize: 17,color: '#232323'}}>输入WiFi信息</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>名称</Text>
            <TextInput
              style={styles.input}
              value={this.state.wifiName}
              onChangeText={(text) => this.setState({wifiName: text})}
              // onSubmitEditing={this._submitBeanWeight}
              // onBlur={this._submitBeanWeight}
              underlineColorAndroid='transparent'
            />
          </View>
          <Divider />
          <View style={styles.choiceBar}>
            <Text style={styles.choiceTitle}>密码</Text>
            <TextInput
              style={styles.input}
              value={this.state.wifiPsw}
              onChangeText={(text) => this.setState({wifiPsw: text})}
              // onSubmitEditing={this._submitBeanWeight}
              // onBlur={this._submitBeanWeight}
              underlineColorAndroid='transparent'
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Home');}>
            <View style={[styles.btn, styles.btnOutline]}>
              <Text style={[styles.btnText, styles.btnOutlineText]}>略过</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.btn}>
              <Text style={styles.btnText}>连接</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop:138.5,
    flexDirection:'row',
    marginLeft: 27,
    marginRight: 27,
    justifyContent: 'space-between'
  },
  btn: {
    display:flex,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor: '#383838',
    height: 35,
    width:153.5,
    borderRadius: 5,
  },
  btnText: {
    color:'#FFFFFF',
    fontSize: 16,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor:'#353535',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  },
  btnOutlineText: {
    color: '#353535',
  },
  choiceBar: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft:18,
    paddingRight: 16,
  },
  choiceTitle: {
    fontSize:17,
    color:'#232323',
    marginLeft:14,
  },
  input:{
    width:250,
    fontSize:17;
    color:'#878787',
  }
});

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const Step4Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step4)

export default Step4Container