import React from 'react';
import classnames from 'classnames';
import List from 'components/molecules/List';
import TodoPanel from 'components/molecules/TodoPanel';

import styles from './index.css';

const TodoItem = ({
	id,
	text,
	deadline,
	file,
	comment,
	checked,
	star,
	edit,
	...other,
}) => (
	<div className={classnames(styles.todoItem, styles.todo)}>
		<List
			id={id}
			text={text}
			deadline={deadline}
			file={file}
			comment={comment}
			checked={checked}
			star={star}
			edit={edit}
			{...other}
		/>
		{edit && (<TodoPanel />)}
	</div>
);

export default TodoItem;
