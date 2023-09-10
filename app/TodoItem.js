export default function TodoItem({
	id,
	value,
	status,
	index,
	handleChecked,
	handleView,
    todos
}) {
	return (
		<div
			className={`todo-item `}
			key={id}
			onClick={() => handleView({id,index, todos })}
		>
			<div className="check-desc-wrapper">
				<input
					type="checkbox"
					name=""
					id=""
					checked={status}
					className="todo-check"
					onChange={() => handleChecked(id)}
				/>

				<div className="task-desc">
					<p className={`value-paragraph ${status ? `checked` : undefined} `}>
						{value}
					</p>
					<p className={`task-time ${status ? `checked` : undefined}`}>
						10:30am - 11:30am
					</p>
				</div>
			</div>
			<p className="task-day">Today</p>
		</div>
	);
}
