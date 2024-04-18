import React from 'react';
import {
  ActivityIndicator,
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
  const [nomor, setNomor] = React.useState(data?.nomor);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = () => {
    setIsLoading(true);
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
            <InputField placeholder="NIK" editable={false} value={data?.NIK} />
            <Text style={styles.label}>Nama Lengkap</Text>
            <InputField
              placeholder="Nama Lengkap"
              editable={true}
              value={namaLengkap}
              onChangeText={text => setNamaLengkap(text)}
            />
            <Text style={styles.label}>Email</Text>
            <InputField
              placeholder="Email"
              editable={false}
              value={data?.email}
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
