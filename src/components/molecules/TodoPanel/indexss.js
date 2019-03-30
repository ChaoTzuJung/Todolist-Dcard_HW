import { contain } from 'react-container-helper';

import TodoPanel from './component';

const initState = () => ({
	date: '',
	time: '',
	hasImage: false,
	imageUrl: null,
	fileName: '',
	fileType: null,
	fileData: null,
	textareaValue: '',
});

const mapSetStateToProps = (
	{ date, time, imageUrl, hasImage, fileName, fileType, fileData, textareaValue },
	{ className, onCancel = () => {}, onSave = () => {} },
	setState,
) => ({
	// state
	date,
	time,
	imageUrl,
	hasImage,
	fileName,
	fileType,
	fileData,
	textareaValue,

	// props
	className,
	onCancel,
	onSave,

	// action

	handleCancel() {
		setState({
			date: '',
			time: '',
			hasImage: false,
			imageUrl: null,
			fileName: '',
			fileType: null,
			fileData: null,
			textareaValue: '',
		});
		onCancel({
			date: '',
			time: '',
			hasImage: false,
			imageUrl: null,
			fileName: '',
			fileType: null,
			fileData: null,
			textareaValue: '',
		});
	},

	handleSave() {
		setState({
			date: '10/12',
			time: '10:10',
			hasImage: false,
			imageUrl: 'text',
			fileName: 'test',
			fileType: 'text',
			fileData: 'text',
			textareaValue: 'test',
		});

		onSave({
			date: '10/12',
			time: '10:10',
			hasImage: false,
			imageUrl: 'text',
			fileName: 'test',
			fileType: 'text',
			fileData: 'text',
			textareaValue: 'test',
		});
	},

	onUploadFile(e) {
		const file = e.target.files.item(0);

		const fr = new FileReader();

		fr.addEventListener('load', () => {
			if (file.type === 'image/png' || file.type === 'image/jpeg') {
				setState({
					imageUrl: fr.result,
					hasImage: true,
				});
			} else {
				setState({
					fileData: fr.result,
					hasImage: false,
				});
			}
		});

		fr.readAsDataURL(file);

		setState({
			fileName: file.name,
			fileType: file.type,
		});
	},
	handleChangeTextarea(e) {
		setState({
			textareaValue: e.target.value,
		});
	},
	// submitFile() {
	// 	axios
	// 	axios.post('/img', imageUrl);
	// 	multpart
	// 	const form = new formData();
	// 	form.append(files)
	// 	axios.post('/img', {form});
	// },
	onChangDate(e) {
		const year = e.getFullYear();
		const month = e.getMonth() + 1;
		const day = e.getDate();

		setState({
			date: `${year}/${month}/${day}`,
		});
	},

	onChangeTime(e) {
		const hour = e.getHours();
		const minute = e.getMinutes();

		setState({
			time: `${hour}:${minute}0`,
		});
	},
});

export default contain(initState, mapSetStateToProps)(TodoPanel);
