import React, {Component} from 'react';
import { StyleSheet, Text, View, PixelRatio, Image, Button} from 'react-native';

class Index extends Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
  };

  render() {
    return (
      <View style={styles.container}>
        <Reader/>
        <Setting/>
        <View>
          <Button title="开始冲煮"/>
        </View>
      </View>
    );
  }
}

class Reader extends Component {
  render() {
    return (
      <View>
        <Image source={require('../../images/cover.png')} />
        <View>
          <Text style={styles.readerTitle}>咖啡萃取量(g)</Text>
          <Text style={styles.reader}>200</Text>
          <Text style={styles.readerTitle}>注水总量(g)</Text>
          <Text style={styles.reader}>200</Text>
          <Text>归零</Text>
        </View>
      </View>
    );
  }
}

class Setting extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View>
          <Image style={styles.settingIcon} source={require('../../images/icon_brand.png')} />
          <Text style={styles.settingName}>咖啡豆</Text>
          <Text style={styles.settingValue}>曼特宁</Text>
        </View>

        <View>
          <Image style={styles.settingIcon} source={require('../../images/icon_beanweight.png')} />
          <Text style={styles.settingName}>粉重</Text>
          <Text style={styles.settingValue}>20g</Text>
          <Text>读秤</Text>
        </View>

        <View>
          <Image style={styles.settingIcon} source={require('../../images/icon_waterweight.png')} />
          <Text style={styles.settingName}>萃取量</Text>
          <Text style={styles.settingValue}>240g</Text>
        </View>

        <View>
          <Image style={styles.settingIcon} source={require('../../images/icon_proportion.png')} />
          <Text style={styles.settingName}>粉液比</Text>
          <Text style={styles.settingValue}>1:12</Text>
        </View>

        <View>
          <Image style={styles.settingIcon} source={require('../../images/icon_temp.png')} />
          <Text style={styles.settingName}>温度</Text>
          <Text style={styles.settingValue}>92℃</Text>
        </View>

        <View>
          <Image style={styles.settingIcon} source={require('../../images/icon_grandsize.png')} />

          <Text style={styles.settingName}>研磨度</Text>
          <Text style={styles.settingValue}>3.5</Text>
        </View>

        <View>
          <Image style={styles.settingIcon} source={require('../../images/icon_time.png')} />
          <Text style={styles.settingName}>预计时间</Text>
          <Text style={styles.settingValue}>02:30</Text>
        </View>

        <View>
          <Image style={styles.settingIcon} source={require('../../images/index_btn_setting.jpg')} />
          <Text>设置参数</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readerTitle: {
    color: '#5B5B5B',
  },
  reader: {
    fontWeight: 'bold',
    color: '#232323',
  },
  settingIcon: {
    width: 40,
    height: 44,
  },
  settingName: {
    color: '#5B5B5B',
  },
  settingValue: {
    fontWeight: 'bold',
    color: '#232323',
    overflow: 'hidden',
  },

});

export default Index

