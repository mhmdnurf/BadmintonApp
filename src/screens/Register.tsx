import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import RegisterField from '../components/register/RegisterField';
import RegisterButton from '../components/register/RegisterButton';
import Footer from '../components/Footer';
import BottomSpace from '../components/BottomSpace';
import RootContainer from '../components/RootContainer';

interface Register {
  navigation: any;
}

const Register = ({navigation}: Register) => {
  const [fullName, setFullName] = React.useState('');
  const [nik, setNik] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('Laki - Laki');
  const [nomor, setNomor] = React.useState('');

  const handleNavigateLogin = () => {
    navigation.navigate('Login');
  };

  const handleSubmit = () => {
    const data = {
      fullName,
      nik,
      email,
      password,
      selectedGender,
      nomor,
    };
    console.log(data);
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
          <RegisterButton onPress={handleSubmit} />
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
    fontWeight: '600',
    marginVertical: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
});
