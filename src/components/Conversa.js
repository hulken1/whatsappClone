import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Text, TextInput, Image, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import { modificaMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppActions';

class Conversa extends Component {
  componentDidMount() {
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
  }

  _enviaMensagem() {
    const { mensagem, contatoNome, contatoEmail } = this.props;

    this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
  }

  renderItem = ({ item }) => {
    if (item.tipo === 'e') {
      return (
        <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
          <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#dbf5b4', elevation: 1 }}>{item.mensagem}</Text>
        </View>
      );
    }
      return (
        <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
          <Text style={{ fontSize: 18, color: '#000', padding: 10, backgroundColor: '#f7f7f7', elevation: 1 }}>{item.mensagem}</Text>
        </View>
      );
  }
  render() {
    return (
      <View style={{ marginTop: 50, flex: 1, backgroundColor: 'eee4dc', padding: 10 }}>
        <View style={{ flex: 1, paddingBottom: 20 }}>
        <SafeAreaView >
              <FlatList
                data={this.props.conversa}
                //keyExtractor={item => item.mensagem}
                renderItem={this.renderItem}
              />
              </SafeAreaView>
        </View>
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
const mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => ({ ...val, uid }));
    return { conversa, mensagem: state.AppReducer.mensagem };
};

const ConnectedComponent = connect(mapStateToProps, { modificaMensagem, enviaMensagem, conversaUsuarioFetch })(Conversa);
export default ConnectedComponent;
