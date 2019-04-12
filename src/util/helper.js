export const isExist = value => value !== null && value !== '' && typeof value !== 'undefined';

export const transDateToDay = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();

	return {
		day: `${year}/${month}/${day}`,
		time: `${hour}:${minute}0`,
	};
};

export const transDayToDate = value => {
	const now = new Date(value);
	return now;
};

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};
