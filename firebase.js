import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyAVVOLPADcxTk6k1W53YMtuz1mZNyGf670',
	authDomain: 'todolistdcardhw.firebaseapp.com',
	databaseURL: 'https://todolistdcardhw.firebaseio.com',
	projectId: 'todolistdcardhw',
	storageBucket: 'todolistdcardhw.appspot.com',
	messagingSenderId: '81149812474',
};

firebase.initializeApp(config);

const firebaseLooper = snapshot => {
	const data = [];
	snapshot.forEach(childSnapshot => {
		data.push({
			...childSnapshot.val(),
			id: childSnapshot.key,
		});
	});
	return data;
};

const firebaseDB = firebase.database();
const firebaseTodos = firebaseDB.ref('todos');
export { firebase, firebaseDB, firebaseTodos, firebaseLooper };
