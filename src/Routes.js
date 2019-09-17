import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormCadastro from './components/FormCadastro';
import FormLogin from './components/FormLogin';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

export default props => (
  <Router navigationBarStyle={{ backgroundColor: '#115E54' }} titleStyle={{ color: '#fff' }}>
    <Scene>
      <Scene key='formLogin' component={FormLogin} hideNavBar />
      <Scene key='formCadastro' component={FormCadastro} title='Cadastro' />
      <Scene key='boasVindas' component={BoasVindas} hideNavBar title='Boas Vindas' />
      <Scene key='principal' component={Principal} hideNavBar title='Principal' />
      <Scene key='adicionarcontato' title='Adicionar Contato' component={AdicionarContato} />
      <Scene key='conversa' title='Conversa' component={Conversa} />
    </Scene>
  </Router>
);
