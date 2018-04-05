import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet,TextInput, FlatList,Alert } from 'react-native';
import { Divider } from './Templates';
import { saveCoffeeSettings } from '../actions/coffeeSettings.js'

class BeanCategory extends React.Component {
  static navigationOptions = {
    title: '请选择咖啡豆种类',
  };

  onPressItem = ({item}) => {
    // this.props.onSaveCoffeeSetting({
    //   category: item.key
    // });
    this.props.navigation.goBack();
  };

  data = [
    {key: '曼特宁'},
    {key: '危地马拉'},
    {key: '巴西'},
    {key: '哥伦比亚'},
    {key: '耶加雪菲'},
    {key: '西达摩'},
    {key: '墨西哥'},
    {key: '云南'},
    {key: '帕卡马拉'},
    {key: '肯尼亚'},
    {key: '蓝山'},
    {key: '瑰夏'},
    {key: '可娜'},
  ]

  render() {
    return (
      <View style={{flexDirection: 'column',paddingTop: 15, flex: 1 }}>
      	<View style={{backgroundColor: 'white',height:60 }}>
      		<TextInput
            style={styles.beanInput}
            value={this.props.coffeeSettings.category}
            onChangeText={category => this.props.onSaveCoffeeSetting({category:category})}
            placeholder='请输入咖啡豆种类'
            underlineColorAndroid='transparent'
          />
      	</View>
      	<View style={{flexDirection:'row',justifyContent: 'center' }}>
      		<Text style={{lineHeight:41.5,fontSize: 12,color:'#8f8f8f'}}>或选择已有种类</Text>
      	</View>
        <FlatList
          style={{backgroundColor: '#fff',flex: 1}}
          data={this.data}
          ItemSeparatorComponent={() => <Divider/> }
          renderItem={({item}) => <Text style={styles.categoryList} onPress={this.onPressItem()}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	beanInput: {
		height:24,
		marginTop:16.5,
		marginRight:22,
		marginBottom:19.5,
		marginLeft:22,
		lineHeight:24,
		fontSize:17,
		color:'#232323',
	},
  categoryList: {
    lineHeight:53,
    paddingLeft:44,
    fontSize:17,
    color:'#232323',
  }
});

const mapStateToProps = state => {
  return {
    coffeeSettings: state.coffeeSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveCoffeeSetting: settings => {
      dispatch(saveCoffeeSettings(settings))
    }
  }
}

const BeanCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BeanCategory)

export default BeanCategoryContainer
