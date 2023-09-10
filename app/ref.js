import React from 'react'

const TodoRef = () => {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleClick = () => {
        setTodos((todos) =>
            todos.concat({
                value: value,
                id: Math.floor(Math.random() * 10),
            })
        );
        setValue("");
    };

    const removeTodo = (id) =>
        setTodos((todos) => todos.filter((t) => t.id !== id));

  return (
      <div>
        <h1>Todo</h1>
            <section>
                <input
                    type="text"
                    value={value}
                    placeholder="New Todo"
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={handleClick}>Add Todo</button>
            </section>

        <ul className="todo-list">
            {todos.map(({ id, value }) => (
                <div className="td-cont" key={id}>
                    <h1 className="items">Items</h1>
                    <li className={`todo ${todos.includes(value)? "checked" : "" }`}>
                        {value}
                        <button
                            className="close"
                            onClick={() => removeTodo(id)}
                        >
                            X
                        </button>
                    </li>
                    <p className="todo">Date Added: {getDate()}</p>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default TodoRef