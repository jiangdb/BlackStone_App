import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { stepStateChange } from '../../actions/getStart.js'

class Failed extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
    tabBarVisible: false,
  };

  render() {

    return (
      <View style={{flex: 1, flexDirection:'column', alignItems: 'center', backgroundColor: 'white'}}>
        <Text style={{fontSize: 24,color: '#232323',marginTop: 59}}>认证失败</Text>
        <Text style={{fontSize: 17,color: '#232323',marginTop: 18.5, width: 234}}>你也可以到“我的-连接设备”里重新连接</Text>
        <Image style={styles.image} source={require('../../../images/guide_3.png')}/>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={() => { this.props.navigation.goBack()}}>
            <View style={[styles.btn, styles.btnOutline]}>
              <Text style={[styles.btnText, styles.btnOutlineText]}>上一步</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={()=>this.props.onStepStateChange({show:false})}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>略过</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop:122,
    flexDirection:'row',
    marginLeft: 27,
    marginRight: 27,
    justifyContent: 'space-between'
  },
  btn: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#383838',
    height: 35,
    width:153,
    borderRadius: 5,
    marginLeft: 7,
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
    marginRight: 7,
  },
  btnOutlineText: {
    color: '#353535',
  },
  image: {
    width:70,
    height:115,
    marginTop: 56,
  }
});

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStepStateChange: state => {
      dispatch(stepStateChange(state))
    }
  }
}

const FailedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Failed)

export default FailedContainer