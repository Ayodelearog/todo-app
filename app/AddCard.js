export default function AddCard({
	newTodo,
	setNewTodo,
	editIsClicked,
	handleSave,
	handleCancel,
	addTodo,
	selectedTodo
}) {

	return (
		<div className="add-task-cont">
			<div className="title-textarea-wrapper">
				<p className="add-card-title">{editIsClicked ? "Edit" : "Add"} Task</p>
				<textarea
					name=""
					id=""
					cols="30"
					rows="10"
					className="textarea"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				></textarea>
			</div>

			<div className="cancel-add">
				<button className="cancel" onClick={handleCancel}>
					Cancel
				</button>
				{!editIsClicked && (
					<button className="add" onClick={addTodo}>
						Add
					</button>
				)}
				{editIsClicked && (
					<button className="add" onClick={() => handleSave(selectedTodo)}>
						Save
					</button>
				)}
			</div>
		</div>
	);
}
