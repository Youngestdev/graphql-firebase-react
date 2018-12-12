
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class FireBase {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCxvYa9MHi8E5OkmfN2JR2G4rp4jSWhofM',
      authDomain: 'react-auth0-2b280.firebaseapp.com',
      projectId: 'react-auth0-2b280'
    });

    this.realtimeDatabase = firebase.firestore();

    this.realtimeDatabase.settings({
      timestampsInSnapshots: true
    });
  }

  setTodoListener(lis) {
    this.realtimeDatabase.collection('todos').limit(10).onSnapshot(lis);
  }

  async addTodo(todo) {
    return await this.realtimeDatabase.collection('todos').doc().set((todo));
  }

}

const firebaseClient = new FireBase()

export default firebaseClient;