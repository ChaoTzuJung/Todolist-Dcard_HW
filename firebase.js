import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyAiy-dCNCFw38ym1rQn-86Tn1OBxWlTriQ',
	authDomain: 'todolist-dcard-2019.firebaseapp.com',
	databaseURL: 'https://todolist-dcard-2019.firebaseio.com',
	projectId: 'todolist-dcard-2019',
	storageBucket: 'todolist-dcard-2019.appspot.com',
	messagingSenderId: '760711316755',
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
const firebaseSort = firebaseDB.ref('sort');
export { firebase, firebaseDB, firebaseTodos, firebaseSort, firebaseLooper };
