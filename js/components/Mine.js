import React from 'react';
import { StyleSheet, Button, Text, View , Image } from 'react-native';
import { ChoiceBar } from './Templates';

export default class Mine extends React.Component {
  static navigationOptions = {
    title: 'Mine',
  };

  render() {
    return (
		<View style={{ flexDirection: 'column'}}>
  	  		<View style={styles.userContainer}>
          		<Image style={styles.userHeader} source={require('../../images/user-header.png')} />
        		<Text style={styles.userName}>用户名</Text>
	      	</View>
  	  		<View style={{backgroundColor:'#fff', marginBottom: 25}}>
		      	<ChoiceBar title='连接设备' value='未连接' icon={require('../../images/more.png')}/>
	      	</View>
	      	<View style={{backgroundColor:'#fff', flexDirection: 'column'}}>
		      	<ChoiceBar title='冲煮记录' icon={require('../../images/more.png')} />
		      	<ChoiceBar title='机器设置' icon={require('../../images/more.png')}/>
		      	<ChoiceBar title='关于我们' icon={require('../../images/more.png')} onPress={() => this.props.navigation.navigate('About')}/>
	      	</View>
      	</View>
    );
  }
}

const styles = StyleSheet.create({
	withBorder: {
	    borderColor :'#E0DEDE',
	    borderStyle: 'solid',
	    borderBottomWidth: 1,
	  },
	userContainer: {
		height:280,
		flexDirection: 'column',
		backgroundColor:'#fff',
		marginBottom: 25,
		justifyContent:'center',
    	alignItems:'center',
	},
	userHeader: {
		width:110,
		height:110,
		marginTop:37,
		borderRadius:55,
		resizeMode: 'cover',
	},
	userName: {
		marginTop:4,
		height:50,
		fontSize:36,
		color:'#232323',
	}
});