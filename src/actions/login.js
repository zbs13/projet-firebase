import { auth } from '../firebase.js';
import page from 'page';

export const loginAction = (mail, password) => {
    auth.createUserWithEmailAndPassword(mail, password)
      .then(user => {
        return page('home');
      }).catch(console.log);
}