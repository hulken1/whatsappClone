import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import ListaContatoReducer from './ListaContatoReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConversasReducer from './ListaConversasReducer';

export default combineReducers({
  AutenticacaoReducer,
  AppReducer,
  ListaContatoReducer,
  ListaConversaReducer,
  ListaConversasReducer
});
