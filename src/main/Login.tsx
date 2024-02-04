import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from '../components/Header';
import Logo from '../assets/svg/login.svg';

const Login = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <Header title="Login" />
        <View style={styles.svgContainer}>
          <Logo width={300} height={300} />
        </View>
        <View style={styles.loginFieldContainer}>
          <Text style={styles.loginTitle}>Welcome Back!</Text>
          <View>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: '#EEEDEB',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
              }}
              placeholder="Email"
            />
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: '#EEEDEB',
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
              }}
              placeholder="Password"
              secureTextEntry={true}
            />
            <View>
              <Text
                style={{
                  textAlign: 'right',
                  color: '#AAC8A7',
                  fontSize: 12,
                }}>
                Forgot Password?
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 20,
              padding: 15,
              width: '100%',
              backgroundColor: '#AAC8A7',
              borderRadius: 15,
            }}>
            <Pressable>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: '600',
                  color: 'white',
                }}>
                Login
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: '#6F7789'}}>Belum punya akun?</Text>
            <Pressable>
              <Text style={{color: '#AAC8A7', marginLeft: 5}}>Register</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  svgContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  loginFieldContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6F7789',
  },
});
