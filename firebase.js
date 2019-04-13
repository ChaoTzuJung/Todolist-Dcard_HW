import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyAlfcqvm6d472M4WQx7yZwsAF5krTBbTks',
	authDomain: 'todolist-dcard-hw.firebaseapp.com',
	databaseURL: 'https://todolist-dcard-hw.firebaseio.com',
	projectId: 'todolist-dcard-hw',
	storageBucket: 'todolist-dcard-hw.appspot.com',
	messagingSenderId: '78399305798',
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
