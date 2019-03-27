import { contain } from 'react-container-helper';

import TodoPanel from './component';

const initState = () => ({
	imageUrl: null,
	hasImage: false,
	files: null,
});

const mapSetStateToProps = ({ imageUrl, hasImage, files }, { className, id }, setState) => ({
	// state
	imageUrl,
	hasImage,
	files,

	// props
	className,
	id,

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

	submitFile() {
		// axios
		// axios.post('/img', imageUrl);
		// multpart
		// cost form = new formData();
		// form.append(files)
		// axios.post('/img', {form});
	},
});

export default contain(initState, mapSetStateToProps)(TodoPanel);
