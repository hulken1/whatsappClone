import React, { Component } from 'react';
import { View, TextInput, Button, ImageBackground, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { 
  modificaEmail, 
  modificaSenha, 
  modificaNome, 
  cadastraUsuario 
} from '../actions/AutenticacaoActions';

class formCadastro extends Component {
  _cadastraUsuario() {
    const { nome, email, senha } = this.props;
    
    this.props.cadastraUsuario({ nome, email, senha });
  }
  renderBtnCadastro() {
    if (this.props.loadingCadastro) {
      return (
         <ActivityIndicator size={60} />
      );
    }
    return (
      <Button 
            title='Cadastrar' 
            color='#000' 
            onPress={() => this._cadastraUsuario()}
      />
    );
  }
  render() {
    return (
      <ImageBackground style={{ flex: 1, widht: null }} source={require('../imgs/background.jpg')}>
      <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <TextInput 
            value={this.props.nome} 
            placeholder='Nome'
            placeholderTextColor='#CEC9C9' 
            style={{ fontSize: 20, height: 45, color: '#fff' }} 
            onChangeText={texto => this.props.modificaNome(texto)}
            />

            <TextInput 
            value={this.props.email} 
            placeholder='E-Mail' 
            placeholderTextColor='#CEC9C9' 
            style={{ fontSize: 20, height: 45, color: '#fff' }} 
            onChangeText={texto => this.props.modificaEmail(texto)}
            />
            
            <TextInput
            secureTextEntry 
            value={this.props.senha} 
            placeholder='Senha' 
            placeholderTextColor='#CEC9C9'
            style={{ fontSize: 20, height: 45, color: '#fff' }} 
            onChangeText={texto => this.props.modificaSenha(texto)}
            />
            <Text style={{ color: '#ff0000', fontSize: 25 }}>{this.props.erroCadastro}</Text>
          </View>

          <View style={{ flex: 1 }}>
            {this.renderBtnCadastro()}
          </View>

      </View>
  </ImageBackground>
    );
  }
}

const mapStateToProps = state => (
    {
  nome: state.AutenticacaoReducer.nome,
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroCadastro: state.AutenticacaoReducer.erroCadastro,
  loadingCadastro: state.AutenticacaoReducer.loadingCadastro
    }
  );
export default connect(
  mapStateToProps, 
    { 
      modificaEmail, 
      modificaSenha,
      modificaNome, 
      cadastraUsuario 
    }
  )(formCadastro);
