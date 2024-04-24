import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface InputField {
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  marginBottom?: number;
  maxLength?: number;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
}

const InputField = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  editable,
  marginBottom,
  maxLength,
  keyboardType,
}: InputField) => {
  return (
    <>
      <TextInput
        style={[styles.inputField, {marginBottom}]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        maxLength={maxLength}
        keyboardType={keyboardType}
        placeholderTextColor={'#4F4F4F'}
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
    fontFamily: 'Poppins Regular',
    color: '#4F4F4F',
  },
});
