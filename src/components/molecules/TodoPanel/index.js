import { contain } from 'react-container-helper';

import TodoPanel from './component';

const initState = () => ({
	date: '',
	time: '',
	hasImage: false,
	imageUrl: null,
	fileName: '',
	fileType: null,
	file: null,
	textareaValue: '',
});

const mapSetStateToProps = (
	{ deadline, imageUrl, hasImage, files, textareaValue },
	{ className, id, onCancel, onSave },
	setState,
) => ({
	// state
	deadline,
	hasImage,
	imageUrl,
	files,
	textareaValue,

	// props
	className,
	id,
	onCancel,
	onSave,

	// action

	onUploadFile(e) {
		const file = e.target.files.item(0);
		const fileName = file.name;
		const fileType = file.type;

		console.log(file);
		const fr = new FileReader();
		fr.addEventListener('load', () => {
			console.log(fr);
			if (fileType === 'image/png') {
				setState({
					imageUrl: fr.result,
					hasImage: true,
				});
			}

			setState({
				file: fr.result,
				hasImage: false,
			});
		});
		fr.readAsDataURL(file);
		console.log(file.name);
		setState({
			fileName,
			fileType,
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
