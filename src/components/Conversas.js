import React from 'react';
import { View, Text, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { conversasUsuarioFetch } from '../actions/AppActions';


class Conversas extends React.Component {
    componentDidMount() {
      this.props.conversasUsuarioFetch();
    }
    renderItem = ({ item }) => (
      <TouchableHighlight 
          onPress={() => Actions.conversa({ 
            title: item.nome, 
            contatoNome: item.nome, 
            contatoEmail: item.email }
            )}
      >
              <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderBottomColor: '#CCC' }}>
                <Text style={{ fontSize: 20 }}>{item.nome}</Text>
              </View>
      </TouchableHighlight>
    );
           render() {
                  return (
              <SafeAreaView >
              <FlatList
                data={this.props.conversas}
                renderItem={this.renderItem}
              />
              </SafeAreaView>
        );
    }
}
const mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => ({ ...val, uid }));
    return { conversas };
};

const ConnectedComponent = connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);
export default ConnectedComponent;
