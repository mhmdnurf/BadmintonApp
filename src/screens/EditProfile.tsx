import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ImageProfile from '../components/profile/ImageProfile';
import BottomSpace from '../components/BottomSpace';
import firestore from '@react-native-firebase/firestore';

interface PembayaranBerhasil {
  navigation: any;
  route: any;
}

const EditProfile = ({navigation, route}: PembayaranBerhasil) => {
  const {data} = route.params;
  const [namaLengkap, setNamaLengkap] = React.useState(data?.namaLengkap);
  const [NIK, setNIK] = React.useState(data?.NIK);
  const [nomor, setNomor] = React.useState(data?.nomor);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = async () => {
    setIsLoading(true);
    const nomorSnapshot = await firestore()
      .collection('users')
      .where('nomor', '==', nomor)
      .get();
    if (!nomorSnapshot.empty) {
      // Check if the document with the same 'nomor' is the current user's document
      const isCurrentUserDoc = nomorSnapshot.docs.some(
        doc => doc.id === data?.user_uid,
      );
      if (!isCurrentUserDoc) {
        Alert.alert('Error', 'Nomor telah terdaftar');
        setIsLoading(false);
        return;
      }
    }

    const NIKSnapshot = await firestore()
      .collection('users')
      .where('NIK', '==', NIK)
      .get();
    if (!NIKSnapshot.empty) {
      // Check if the document with the same 'NIK' is the current user's document
      const isCurrentUserDoc = NIKSnapshot.docs.some(
        doc => doc.id === data?.user_uid,
      );
      if (!isCurrentUserDoc) {
        Alert.alert('Error', 'NIK telah terdaftar');
        setIsLoading(false);
        return;
      }
    }
    try {
      firestore().collection('users').doc(data?.user_uid).update({
        namaLengkap: namaLengkap,
        nomor: nomor,
      });
    } catch (error) {
      console.log('Error updating data: ', error);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <View style={styles.container}>
          <Header title="Edit Profile" />
          <ImageProfile uri={data?.fotoUser} />
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>NIK</Text>
            <InputField
              placeholder="NIK"
              value={NIK}
              onChangeText={text => setNIK(text)}
            />
            <Text style={styles.label}>Nama Lengkap</Text>
            <InputField
              placeholder="Nama Lengkap"
              editable={true}
              value={namaLengkap}
              onChangeText={text => setNamaLengkap(text)}
            />
            <Text style={styles.label}>Nomor Telepon</Text>
            <InputField
              placeholder="Nomor Telepon"
              editable={true}
              value={nomor}
              onChangeText={text => setNomor(text)}
            />
          </View>
          <Pressable style={styles.btnContainer} onPress={handleEdit}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.btnText}>Edit</Text>
            )}
          </Pressable>
        </View>
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  fieldContainer: {
    marginTop: 40,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Poppins SemiBold',
  },
  btnContainer: {
    width: Dimensions.get('window').width - 40,
    padding: 15,
    backgroundColor: '#AAC8A7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins SemiBold',
  },
});
