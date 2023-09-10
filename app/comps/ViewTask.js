import { useState } from "react";

const ViewTask = ({
	currentValue,
	handleDelete,
	selectedTodo,
	handleEdit,
}) => {
	return (
		<div className="delete-edit">
			<div>
				<p className="viewTaskValue">{currentValue}</p>
			</div>
			<div className="btn-wraper">
				<button className="delete" onClick={() => handleDelete(selectedTodo)}>
					Delete
				</button>
				<button className="edit" onClick={handleEdit}>
					Edit
				</button>
			</div>
		</div>
	);
};

export default ViewTask;
