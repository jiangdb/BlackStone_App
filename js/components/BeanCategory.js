import React from 'react';
import { connect } from 'react-redux'
import { Text, View,StyleSheet,TextInput, FlatList,Alert } from 'react-native';
import { Divider } from './Templates';
import { saveCoffeeSettings } from '../actions/coffeeSettings.js'
import { saveBeanCategory } from '../actions/coffeeSettings.js'

class BeanCategory extends React.Component {
  static navigationOptions = {
    title: '请选择咖啡豆种类',
    tabBarVisible: false,
  };

  _onPressItem = (key) => {
    this.props.onSaveCoffeeSetting({category: key});
    this.props.navigation.goBack();
  };

  _submitEditing = (event) => {
    if (event.nativeEvent.text!='') {
      this.props.onSaveBeanCategory({key: event.nativeEvent.text});
      this.props.onSaveCoffeeSetting({category: event.nativeEvent.text });
    }
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{flexDirection: 'column',paddingTop: 15, flex: 1 }}>
      	<View style={{backgroundColor: 'white',height:60 }}>
        <TextInput
          style={styles.beanInput}
          onSubmitEditing={this._submitEditing}
          placeholder='请输入咖啡豆种类'
          underlineColorAndroid='transparent'
        />
      	</View>
      	<View style={{flexDirection:'row',justifyContent: 'center' }}>
          <Text style={{lineHeight:41.5,fontSize: 12,color:'#8f8f8f'}}>或选择已有种类</Text>
      	</View>
        <FlatList
          style={{backgroundColor: '#fff',flex: 1}}
          data={this.props.beanCategory.data}
          ItemSeparatorComponent={() => <Divider/> }
          renderItem={({item}) => <Text style={styles.categoryList} onPress={this._onPressItem.bind(this, item.key)}>{item.key}</Text>}
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
    coffeeSettings: state.coffeeSettings,
    beanCategory: state.beanCategory,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveCoffeeSetting: settings => {
      dispatch(saveCoffeeSettings(settings))
    },
    onSaveBeanCategory: category => {
      dispatch(saveBeanCategory(category))
    }
  }
}

const BeanCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BeanCategory)

export default BeanCategoryContainer
