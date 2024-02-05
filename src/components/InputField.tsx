import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface InputField {
  placeholder: string;
  secureTextEntry: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}: InputField) => {
  return (
    <>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});
