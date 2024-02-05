import React from 'react';
import InputField from '../InputField';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, View} from 'react-native';

interface RegisterField {
  nameValue: string;
  onChangeTextName: (text: string) => void;
  nikValue: string;
  onChangeTextNIK: (text: string) => void;
  emailValue: string;
  onChangeTextEmail: (text: string) => void;
  passwordValue: string;
  onChangeTextPassword: (text: string) => void;
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  nomorValue: string;
  onChangeTextNomor: (text: string) => void;
}

const RegisterField = ({
  nameValue,
  onChangeTextName,
  nikValue,
  onChangeTextNIK,
  emailValue,
  onChangeTextEmail,
  passwordValue,
  onChangeTextPassword,
  selectedValue,
  onValueChange,
  nomorValue,
  onChangeTextNomor,
}: RegisterField) => {
  return (
    <>
      <InputField
        placeholder="Full Name"
        secureTextEntry={false}
        value={nameValue}
        onChangeText={onChangeTextName}
      />
      <InputField
        placeholder="NIK"
        secureTextEntry={false}
        value={nikValue}
        onChangeText={onChangeTextNIK}
      />
      <View style={styles.picker}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          <Picker.Item label="Laki - Laki" value="Laki - Laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
      </View>
      <InputField
        placeholder="Email"
        secureTextEntry={false}
        value={emailValue}
        onChangeText={onChangeTextEmail}
      />
      <InputField
        placeholder="Password"
        secureTextEntry={true}
        value={passwordValue}
        onChangeText={onChangeTextPassword}
      />
      <InputField
        placeholder="Nomor HP"
        secureTextEntry={false}
        value={nomorValue}
        onChangeText={onChangeTextNomor}
      />
    </>
  );
};

export default RegisterField;

const styles = StyleSheet.create({
  picker: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
    marginVertical: 5,
  },
});
