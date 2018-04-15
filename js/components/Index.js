import React from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Button, Text, View } from 'react-native';
import bleService from '../services/bleServices.js'

class Index extends React.Component {
  static navigationOptions = {
    title: 'TIMEMORE Labs',
  };

  componentDidMount() {
    console.log('index ==> componentDidMount');
  }



  render() {
    return (
      <View style={styles.container}>
        <Text>BLE state: {this.props.ble.btState}</Text>
        <Text>BLE scan: {this.props.ble.scan?'YES':'NO'}</Text>
        { this.props.ble.deviceScanned.map((device,i) => {
            return (
              <Text style={styles.item}
                key={device.id}
                onPress={ () => { bleService.deviceConnect(device) }}>
                {device.localName?device.localName:device.name} : {device.id}
              </Text>
            )
          }
        )}
        {
          this.props.ble.scan && 
            <Button style={styles.action} title='stop scan' onPress={bleService.deviceScanStop}>
              STOP SCAN
            </Button>
        }
        {
          !this.props.ble.scan && 
            <Button style={styles.action} title='scan' onPress={bleService.deviceScanStart}>
              SCAN
            </Button>
        }
        <Text>Connection state: {this.props.ble.connectionState}</Text>
        {
          this.props.ble.connectionState == 'connected' && 
            <Text style={styles.item}>
              name: {this.props.ble.deviceInfo.name}
            </Text>
        }
        {
          this.props.ble.connectionState == 'connected' && 
            <Text style={styles.item}>
              manufacturer: {this.props.ble.deviceInfo.manufacturerName}
            </Text>
        }
        {
          this.props.ble.connectionState == 'connected' && 
            <Text style={styles.item}>
              model: {this.props.ble.deviceInfo.modelNum}
            </Text>
        }
        {
          this.props.ble.connectionState == 'connected' && 
            <Text style={styles.item}>
              serial: {this.props.ble.deviceInfo.serialNum}
            </Text>
        }
        {
          this.props.ble.connectionState == 'connected' && 
            <Text style={styles.item}>
              fw version: {this.props.ble.deviceInfo.fwVersion}
            </Text>
        }
        {
          this.props.ble.connectionState == 'connected' && 
            <Text style={styles.item}>
              wifi status: {this.props.ble.deviceInfo.wifiStatus}
            </Text>
        }
        {
          this.props.ble.connectionState == 'connected' && 
            <Text style={styles.item}>
              wifi ssid: {this.props.ble.deviceInfo.wifiSSID}
            </Text>
        }
        {
          this.props.ble.connectionState == 'connected' && 
            <Button style={styles.action} title='disconnect' onPress={ ()=> {bleService.deviceDisconnect(this.props.ble.device) }}>
              DISCONNECT
            </Button>
        }
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
  item: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  action: {
    marginTop: 10,
  }
});

const mapStateToProps = state => {
  return {
    ble: state.ble,
    coffeeSettings: state.coffeeSettings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveCoffeeSetting: settings => {
      dispatch(saveCoffeeSettings({
        category: 'new one',
        beanWeight: 100
      }))
    },
  }
}

const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)

export default IndexContainer
