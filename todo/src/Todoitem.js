import React from 'react';

const normalStyle = {};
const completedStyle = {
	'text-decoration': 'line-through'
};

const TodoItem = (props) => {
	const {
		handleCheck,
		handleDelete,
		task,
		completed,
		id
	} = props;

	return (
		<div key={id}>
			<span style={(!completed) ? normalStyle: completedStyle}>
				<input type="checkbox" onChange={handleCheck} checked={completed} />
				<span>{task}</span>
			</span>
			<span onClick={handleDelete}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X</span>
		</div>
	);
};

export default TodoItem;