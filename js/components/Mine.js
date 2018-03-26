import React from 'react';
import { StyleSheet, Button, Text, View , Image } from 'react-native';
import { ChoiceBar, Divider } from './Templates';

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
  	  		<View style={{backgroundColor:'#fff', marginBottom: 12}}>
		      	<ChoiceBar title='连接设备' value='未连接' icon='more'/>
	      	</View>
	      	<View style={{backgroundColor:'#fff', flexDirection: 'column'}}>
		      	<ChoiceBar title='冲煮记录' icon='more' />
		      	<Divider/>
		      	<ChoiceBar title='机器设置' icon='more' onPress={() => this.props.navigation.navigate('DeviceSetting')}/>
		      	<Divider/>
		      	<ChoiceBar title='关于我们' icon='more' onPress={() => this.props.navigation.navigate('About')}/>
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
		height:140,
		flexDirection: 'column',
		backgroundColor:'#fff',
		marginBottom: 12,
		justifyContent:'center',
    	alignItems:'center',
	},
	userHeader: {
		width:55,
		height:55,
		marginTop:18,
		borderRadius:28,
		resizeMode: 'cover',
	},
	userName: {
		marginTop:2,
		height:25,
		fontSize:18,
		color:'#232323',
	}
});

