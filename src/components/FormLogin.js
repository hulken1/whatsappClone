import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight,TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

class formLogin extends Component {
  _autenticarUsuario() {
    const { email, senha } = this.props;

    this.props.autenticarUsuario({ email, senha });
  }
  renderBtnAcessar() {
    if (this.props.loadingLogin) {
      return (
        <ActivityIndicator size={60} />
      );
    }
    return (
      <TouchableOpacity 
      onPress={() => this._autenticarUsuario()} 
      style={[styles.button]}>
          <Text style={[styles.text]}>
              Acessar
          </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/maxresdefault.jpg')}>
    <View style={{ flex: 1, padding: 10 }} >

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, color: '#fff' }}>ChatZapp</Text>
      </View>

      <View style={{ flex: 2}}>
        <TextInput 
        value={this.props.email} 
        style={{backgroundColor: '#000',borderRadius: 10, fontSize: 20, height: 50, color: '#fff' }} 
        placeholder='E-Mail' 
        placeholderTextColor='#CEC9C9' 
        onChangeText={texto => this.props.modificaEmail(texto)} 
        />

        <TextInput 
        secureTextEntry 
        value={this.props.senha} 
        style={{backgroundColor: '#000',marginTop: 5, borderRadius: 10, fontSize: 20, height: 50, color: '#fff' }} 
        placeholder='Senha' 
        placeholderTextColor='#CEC9C9' 
        onChangeText={texto => this.props.modificaSenha(texto)} 
        />
        <Text style={{ color: '#ff0000', fontSize: 20 }}>
          { this.props.erroLogin}
        </Text>
          <TouchableHighlight 
          onPress={() => { Actions.formCadastro(); }}
          > 
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: '#fff', marginTop: 10 }}>
            Ainda não tem cadastro ?
            </Text>
            <Text style={{ fontSize: 18, color: '#3dd', marginTop: 10, marginLeft: 10 }}>Cadastre-se</Text>
          </View>
          </TouchableHighlight> 
      </View>

      <View style={{ flex: 2}}>
        {this.renderBtnAcessar()}
      </View>
    </View>
  </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  button: {
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      shadowColor: '#fff',
      shadowOpacity: 0.4,
      shadowOffset: { height: 10, width: 0 },
      shadowRadius: 20,
  },
  text: {
      fontSize: 16,
      textTransform: 'uppercase',
      color: '#FFFFFF',
  },
});
const mapStateToProps = state => (
  {
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroLogin: state.AutenticacaoReducer.erroLogin,
  loadingLogin: state.AutenticacaoReducer.loadingLogin
}
);

export default connect(
  mapStateToProps, 
  { 
    modificaEmail, 
    modificaSenha,
    autenticarUsuario 
  }
  )(formLogin);
