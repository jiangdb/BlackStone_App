import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, StyleSheet,TouchableWithoutFeedback } from 'react-native';

class Step2 extends React.Component {
  static navigationOptions = {
    title: '开机向导',
    tabBarVisible: false,
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column', alignItems: 'center', backgroundColor: 'white'}}>
        <Text style={{fontSize: 24,color: '#232323',marginTop: 59}}>2/4 第二步</Text>
        <Text style={{fontSize: 17,color: '#232323',marginTop: 18.5}}>打开电子秤电源</Text>
        <Image style={styles.image} source={require('../../images/guide_2.png')}/>
        <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('Step3')}}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>下一步</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#383838',
    height: 35,
    width:153.5,
    borderRadius: 5,
  },
  btnText: {
    color:'#FFFFFF',
    fontSize: 16,
  },
  image: {
    width:211.5,
    height:211.5,
    marginTop:48.5,
    marginBottom:60,
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

const Step2Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Step2)

export default Step2Container