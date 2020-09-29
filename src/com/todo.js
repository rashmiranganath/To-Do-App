import React from "react";
import "./todo.css";

class Todo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
    };
  }

  addItem(toDoValue) {
    if (toDoValue !== "") {
      var newItem = {
        id: Date.now(),
        value: toDoValue,
        isDone: false,
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list,
        newItem: "",
      });
    }
  }

  updateInput(input) {
    this.setState({ newItem: input });
  }

  handleChange(index) {
    const { list } = this.state;
    const copyList = [...list];
    copyList[index] = { ...copyList[index], isDone: !copyList[index].isDone };
    console.log(copyList);
    console.log(index);
    this.setState({
      list: copyList,
    });
  }

  deleteItem(id) {
    const { list } = this.state;
    const updatedList = list.filter(item => item.id !== id);
    this.setState({list: updatedList})
  }

  render() {
    return (
      <div className="mainDiv">
        <div className="subDiv">
          <div className="toDoHeading">
            <h1>My ToDo App</h1>
          </div>
          <div className="toDoInputBox">
            <div className="inputBox">
              <input
                type="text"
                placeholder="write something..."
                required
                value={this.state.newItem}
                onChange={(e) => this.updateInput(e.target.value)}
              />
            </div>
            <div className="submitButton">
              <button onClick={() => this.addItem(this.state.newItem)}>
                Add
              </button>
            </div>
          </div>
          <div className="toDoList">
            <ul>
              {this.state.list.map((item, index) => {
                return (
                  <div className="toDo">
                    <div className="toDoChecked">
                      <input
                        type="checkbox"
                        checked={item.isDone}
                        onChange={() => this.handleChange(index)}
                      ></input>
                    </div>
                    <div className="toDoData">
                      <li key={item.id}>{item.value}</li>
                    </div>
                    <div className="toDoDelete">
                      <i class="fa fa-trash-o" onClick={() => {this.deleteItem(item.id)} }></i>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
