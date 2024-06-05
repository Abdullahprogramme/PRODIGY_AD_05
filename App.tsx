import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { Text, Linking, TouchableOpacity, View, Modal, Alert, StyleSheet } from 'react-native';

const QRCodeScanner = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBarCodeScanned = ({ data }: {data: string}) => {
    setQrData(data);
    setModalVisible(true);
  };

  const openLink = () => {
    if (qrData && qrData.startsWith('http')) {
      Alert.alert(
        'Open Link',
        'Do you want to open this link?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => Linking.openURL(qrData) },
        ],
        { cancelable: false },
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Scan QR Code </Text>
      <View style={styles.cameraContainer}>
        <RNCamera
          captureAudio={false}
          onBarCodeRead={modalVisible ? undefined : handleBarCodeScanned}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{qrData}</Text>
            {qrData && qrData.startsWith('http') && (
              <TouchableOpacity style={styles.openButton} onPress={openLink}>
                <Text style={styles.textStyle}>Open Link</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                  setModalVisible(!modalVisible);
                  // if modal is being closed, enable camera
                  if (modalVisible) {
                    setQrData(null);
                  }
              }}
            >
              <Text style={styles.textStyle}>Hide QR Code Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
    flex: 1,
  },
  cameraContainer: {
    width: '70%',
    height: '40%',
    borderRadius: 30,
    flex: 1,
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: 260,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default QRCodeScanner;