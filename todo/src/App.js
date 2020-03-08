import React from 'react';
import TodoItem from './TodoItem.js';

const jsonHeaders = () => ({
  'Content-Type': 'application/json'
});

class Todos extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      createText: ''
    };

    this.handleCheck = async (id, isComplete) => {
      const options = {
        body: JSON.stringify({ id, isComplete: !isComplete }),
        method: 'PUT',
        headers: jsonHeaders()
      };
      console.log('updateoptions -> ', options);
      const res = await fetch('http://localhost:3000/todos/update', options);
      const { todos } = await res.json();
      this.setState({ todos });
    };

    this.handleCreate = async () => {
      const options = {
        body: JSON.stringify({ task: this.state.createText }),
        method: 'POST',
        headers: jsonHeaders()
      };
      const res = await fetch('http://localhost:3000/todos/create', options);
      const { todos } = await res.json();
      console.log(todos);
      this.setState({ todos });
    };

    this.handleDelete = async (id) => {
      const options = {
        body: JSON.stringify({ id }),
        method: 'POST',
        headers: jsonHeaders()
      };
      const res = await fetch('http://localhost:3000/todos/delete', options);
      const { todos } = await res.json();
      this.setState({ todos });
    };

    this.handleType = (event = {}) => {
      const { 
        target: {
          value: createText = ''
        }
      } = event;
      this.setState({ createText });
    };
  }

  async componentDidMount() {
    const options = {
      headers: jsonHeaders()
    }
    const res = await fetch('http://localhost:3000/todos/read', options);
    const json = await res.json();
    const { todos } = json;
    console.log('json', json);
    console.log('todos', todos);
    console.log('typeof todos', typeof todos);
    this.setState({ todos });
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <header>
          Todo List App
        </header>
        <main>
          <section>
            {this.state.todos.map(({ id, task, completed }) => (
              <TodoItem
                handleCheck={() => this.handleCheck(id, completed)}
                handleDelete={() => this.handleDelete(id)}
                task={task}
                completed={completed}
                id={id}
              />
            ))}
          </section>
          <section>
            <button onClick={this.handleCreate}>
              Add Task
            </button>
            <input value={this.state.createText} type="text" onChange={this.handleType} />
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Todos;