import React, { Component } from "react";
import { Image, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, View } from "react-native";

import { Button, Text } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

import ModalComponent from '../components/ModalComponent';
import logo from '../resources/logo.png';
import login from '../services/Solicitant';
import styles from '../config/Login';
import EmailInput from '../components/EmailInput';
import PasswordInput from "../components/PasswordInput";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalIsVisible: false,
      inputIsVisible: true, 
      icon: "eye-off", 
      isLoggedIn: "false",
      token: ""
    };
  }

  /*Remove header padrão*/
  static navigationOptions = {
    header: null
  };

  /*Aciona a rotina de análise de login. 
    Se tudo certo, redireciona o solicitante para a página inicial,
    senão, mostra uma mensagem de erro.*/
  onLoginButtonPress = async () => {
    const email = this.state.email;
    const password = this.state.password;

    console.log(email);

    login(email, password).then(response => {
      const {token, message} = response;

      this.saveCredentials(token);

    }).catch(response => {
      this.handleOpen();
    })
  
  }

  /*Guarda o token de acesso no armazenamento local.*/
  saveCredentials = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("logging", "true");

      this.props.navigation.navigate("HomeScreen");

    } catch (error) {
      console.debug(error);
    }
  };

  /*Abre o modal*/
  handleOpen = (value) => {
    this.setState({ modalIsVisible: true, value: value });
  };

  /*Fecha o modal*/
  handleClose = () => {
    this.setState({ modalIsVisible: false });
  };

  /*Torna a senha vísivel ou não.*/
  changePasswordVisibility = () => {
    this.setState({ 
      icon: this.state.icon === 'eye' ? 'eye-off' : 'eye', 
      inputIsVisible: !this.state.inputIsVisible,  
    }); 
  }

  render() {
    const { modalIsVisible } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS == 'ios'}
        style={styles.container}>
        <StatusBar backgroundColor="#3c8dbc" barStyle="light-content" />
        <View style={styles.header}>
          <Image style={styles.logo} source={logo}/>
          <Text style={styles.text}>Sofia</Text>
        </View>

        <EmailInput props={this} />

        <PasswordInput props={this} />

        <TouchableOpacity onPress={this.onLoginButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Button transparent onPress={() => {this.props.navigation.navigate("CPF");}}>
          <Text>Cadastrar-se</Text>
        </Button>

        {
          modalIsVisible && 
            <ModalComponent 
              modalIsVisible={this.modalIsVisible} 
              onClose={this.handleClose}
              content={
                <View style={styles.ModalContainer}>
                  <Text style={styles.ModalText}>E-mail ou senha estão incorretos!</Text>
                  <TouchableOpacity onPress={ this.handleClose } style={styles.button}>
                    <Text style={styles.buttonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              }
            />
        }

      </KeyboardAvoidingView>
    );
  }
};