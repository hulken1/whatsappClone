import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Image, TouchableHighlight } from 'react-native';
import { modificaMensagem, enviaMensagem } from '../actions/AppActions';

class Conversa extends Component {
  _enviaMensagem() {
    const { mensagem, contatoNome, contatoEmail } = this.props;

    this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
  }

  render() {
    return (
      <View style={{ marginTop: 50, flex: 1, backgroundColor: 'eee4dc', padding: 10 }}>
        <View style={{ flex: 1, paddingBottom: 20 }} />
        <View style={{ height: 60, flexDirection: 'row' }}>
          <TextInput
          value={this.props.mensagem}
          onChangeText={texto => this.props.modificaMensagem(texto)} 
          style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
          />
          <TouchableHighlight 
          onPress={this._enviaMensagem.bind(this)}
          underlayColor='transparent'
          >
          <Image 
            source={require('../imgs/enviar_mensagem.png')}
          />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  mensagem: state.AppReducer.mensagem
});

export default connect(mapStateToProps, { modificaMensagem, enviaMensagem })(Conversa)
;
