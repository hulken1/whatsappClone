import base64 from 'react-native-base64';
import * as firebase from 'firebase';
import _ from 'lodash';

import { 
  MODIFICA_ADICIONA_CONTATO_EMAIL, 
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  LISTA_CONTATO_USUARIO,
  MODIFICA_MENSAGEM,
  LISTA_CONVERSA_USUARIO,
  ENVIA_MENSAGEM_SUCESSO,
  LISTA_CONVERSAS_USUARIO
} from './types';

export const modificaAdicionaContatoEmail = texto => ({
    type: MODIFICA_ADICIONA_CONTATO_EMAIL,
    payload: texto
  })
;

export const adicionaContato = email => dispatch => {
    const emailb64 = base64.encode(email);
  firebase.database().ref(`/contatos/${emailb64}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
          //email do contato que queremos adicionar
          const dadosDoUsuario = _.first(_.values(snapshot.val()));
          //email do usuario autenticado
          const { currentUser } = firebase.auth();
          const emailUsuario64 = base64.encode(currentUser.email);

          firebase.database().ref(`/usuario_contatos/${emailUsuario64}`)
            .push({ email, nome: dadosDoUsuario.nome })
            .then(() => adicionaContatoSucesso(dispatch))
            .catch(erro => adicionaContatoErro(erro.message, dispatch));
        } else {
        dispatch(
          { 
          type: ADICIONA_CONTATO_ERRO,
          payload: 'E-mail informado não existe, verifique!' 
          }
        );
      }
    });
  };
const adicionaContatoErro = (erro, dispatch) => {
  dispatch(
    {
      type: ADICIONA_CONTATO_ERRO,
      payload: erro
    }
  );
}
;
const adicionaContatoSucesso = dispatch => (
  dispatch(
    {
      type: ADICIONA_CONTATO_SUCESSO,
      payload: true
    }
  )
)
;
export const habilitaInclusaoContato = () => (
  {
    type: ADICIONA_CONTATO_SUCESSO,
    payload: false
  }
)
;
export const contatosUsuarioFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
      const emailUsuarioB64 = base64.encode(currentUser.email);

      firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
          .on('value', snapshot => {
              dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() });
          });
  };
};

export const modificaMensagem = texto => ({
    type: MODIFICA_MENSAGEM,
    payload: texto
  })   
; 

export const enviaMensagem = (mensagem, contatoNome, contatoEmail) => {
  //dados contato(contatoNome, contatoEmail)
  const { currentUser } = firebase.auth();
  const usuarioEmail = currentUser.email;
  
  return dispatch => {
    //conversão para base 64
    const usuarioEmailB64 = base64.encode(usuarioEmail);
    const contatoEmailB64 = base64.encode(contatoEmail);

    firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
        .push({ mensagem, tipo: 'e' })
        .then(() => {
            firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                .push({ mensagem, tipo: 'r' })
                .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }));
        })
        .then(() => { //armazenar o cabeçalho de conversa do usuário autenticado
            firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                .set({ nome: contatoNome, email: contatoEmail });
        })
        .then(() => { //armazenar o cabeçalho de conversa do contato
            firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                .once('value')
                .then(snapshot => {
                    const dadosUsuario = _.first(_.values(snapshot.val()));
                    firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                        .set({ nome: dadosUsuario.nome, email: usuarioEmail });
                });
        });
};
};

export const conversaUsuarioFetch = contatoEmail => {
  const { currentUser } = firebase.auth();

  //compor os emails na base64
  const usuarioEmailB64 = base64.encode(currentUser.email);
  const contatoEmailB64 = base64.encode(contatoEmail);

  return dispatch => {
      firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
          .on('value', snapshot => {
              dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() });
          });
  };
};

export const conversasUsuarioFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const usuarioEmailB64 = base64.encode(currentUser.email);

      firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
          .on('value', snapshot => {
              dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() });
          });
  };
};
