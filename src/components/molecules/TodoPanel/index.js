import { contain } from 'react-container-helper';

import TodoPanel from './component';

const initState = () => ({
	imageUrl: null,
	hasImage: false,
	files: null,
	textareaValue: '',
});

const mapSetStateToProps = (
	{ imageUrl, hasImage, files, textareaValue },
	{ className, id, onCancel, onSave },
	setState,
) => ({
	// state
	imageUrl,
	hasImage,
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
		console.log(file);
		const fr = new FileReader();
		fr.addEventListener('load', () => {
			setState({
				imageUrl: fr.result,
				hasImage: true,
			});
		});
		fr.readAsDataURL(file);
		setState({
			files: file,
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
});

export default contain(initState, mapSetStateToProps)(TodoPanel);
