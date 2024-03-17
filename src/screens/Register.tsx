import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import RegisterField from '../components/register/RegisterField';
import RegisterButton from '../components/register/RegisterButton';
import Footer from '../components/Footer';
import BottomSpace from '../components/BottomSpace';
import RootContainer from '../components/RootContainer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface Register {
  navigation: any;
}

const Register = ({navigation}: Register) => {
  const [fullName, setFullName] = React.useState('');
  const [nik, setNik] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');
  const [nomor, setNomor] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNavigateLogin = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      firestore().collection('users').doc(user?.uid).set({
        namaLengkap: fullName,
        NIK: nik,
        email: email,
        jenisKelamin: selectedGender,
        nomor: nomor,
        user_uid: user?.uid,
        role: 'customer',
        fotoUser:
          'https://firebasestorage.googleapis.com/v0/b/badminton-app-dev.appspot.com/o/undraw_Drink_coffee_v3au.png?alt=media&token=e41995e8-a492-4178-89f8-d5a4eaae0103',
      });
      console.log('User account created & signed in!');
    } catch (error) {
      console.log(error);
    } finally {
      navigation.navigate('Login');
      setIsLoading(false);
    }
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Register" />
        <Text style={styles.title}>Create your account</Text>
        <View style={styles.inputContainer}>
          <RegisterField
            nameValue={fullName}
            onChangeTextName={setFullName}
            nikValue={nik}
            onChangeTextNIK={setNik}
            emailValue={email}
            onChangeTextEmail={setEmail}
            passwordValue={password}
            onChangeTextPassword={setPassword}
            selectedValue={selectedGender}
            onValueChange={itemValue => setSelectedGender(itemValue)}
            nomorValue={nomor}
            onChangeTextNomor={setNomor}
          />
          <RegisterButton onPress={handleSubmit} isLoading={isLoading} />
          <Footer
            title="Sudah punya akun?"
            subTitle="Login"
            onPress={handleNavigateLogin}
          />
          <BottomSpace marginBottom={40} />
        </View>
      </RootContainer>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
    marginTop: 50,
    fontFamily: 'Poppins SemiBold',
    marginVertical: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
});
