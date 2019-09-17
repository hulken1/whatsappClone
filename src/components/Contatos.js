import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { contatosUsuarioFetch } from '../actions/AppActions';

class Contatos extends Component {
    componentDidMount() { //executado antes da montagme dos components (render)
        this.props.contatosUsuarioFetch();
    }
    renderItem = ({ item }) => (
      <TouchableHighlight 
          onPress={() => Actions.conversa({ title: item.nome, contatoNome: item.nome, contatoEmail: item.email })}
      >
              <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderBottomColor: '#CCC' }}>
                <Text style={{ fontSize: 25 }}>{item.nome}</Text>
                <Text style={{ fontSize: 20 }}>{item.email}</Text>
              </View>
      </TouchableHighlight>
    );
           render() {
                  return (
              <SafeAreaView >
              <FlatList
                data={this.props.contatos}
                keyExtractor={item => item.email}
                renderItem={this.renderItem}
              />
              </SafeAreaView>
        );
    }
}
const mapStateToProps = state => {
    const contatos = _.map(state.ListaContatoReducer, (val, uid) => ({ ...val, uid }));
    return { contatos };
};

const ConnectedComponent = connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);
export default ConnectedComponent;
