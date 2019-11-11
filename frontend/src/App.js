import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      task: null,
      priority: null
    };

    this.onTaskChange = this.onTaskChange.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:3002/").then(
      response => {
        this.setState({ response: response.data.data });
      },
      error => {
        console.log(error);
      }
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { task } = this.state;
    const { priority } = this.state;

    var data = {
      task: task,
      priority: priority
    };

    Axios.post("http://localhost:3002/addTask", data).then(
      response => {
        this.setState({ response: response.data.data });
      },
      error => {
        console.log(error);
      }
    );
  };

  handleDelete = param => event => {
    Axios.delete("http://localhost:3002/deleteTask/" + param).then(
      response => {
        this.setState({ response: response.data.data });
      },
      error => {
        console.log(error);
      }
    );
  };

  onTaskChange = event => {
    this.setState({ task: event.target.value });
  };

  onPriorityChange = event => {
    this.setState({ priority: event.target.value });
  };

  render() {
    const items = this.state.response.map((item, key) => (
      <div className="card colour-primary" key={item._id}>
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <p className="font-pink text-small font-weight-bold">
                {item.date}
              </p>
              <h4 className="font-weight-bold">{item.task}</h4>
            </div>
            <div className="col-2 text-center">
              <span className={item.priority}></span>
              <button
                className="btn btn-outline-danger mt-2"
                onClick={this.handleDelete(item._id)}
              >
                <i className="fas fa-trash-alt text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-sm-12 col-md-6 mt-3">
            <form
              className="py-3 px-3 colour-primary"
              onSubmit={this.handleSubmit}
            >
              <h5 className="font-weight-bold text-center">Add Task</h5>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control colour-primary text-white"
                  id="task"
                  name="task"
                  placeholder="Task"
                  onChange={this.onTaskChange}
                />
              </div>
              <select
                className="custom-select mb-3 colour-primary text-white"
                onChange={this.onPriorityChange}
                placeholder="Select Colour"
              >
                <option defaultValue disabled>
                  Select Colour
                </option>
                <option value="bg-success">Green</option>
                <option value="bg-warning">Amber</option>
                <option value="bg-danger">Red</option>
              </select>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn button-pink font-weight-bold text-white"
                >
                  Add
                </button>
              </div>
            </form>
            <h2 className="text-center font-weight-bold mt-3">Today</h2>
            {items}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default App;
