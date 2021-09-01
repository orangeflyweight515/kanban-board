import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
    };
    this.stagesNames = [
      {
        title: 'Backlog', tasks: [
          { name: '1', stage: 0 },
          { name: '2', stage: 0 },
        ]
      },
      { title: 'To Do', tasks: [] },
      { title: 'Ongoing', tasks: [] },
      { title: 'Done', tasks: [] },
    ];
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.handleBackward = this.handleBackward.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleCreateTask = (e) => {
    this.setState({
      fname: e.target.value
    })
  }

  handleSubmit = (e) => {
    let user = {
      name: this.state.fname,
      stage: 0
    }
    var data = this.stagesNames;
    let array = this.stagesNames[0].tasks
    array.push(user)
    var obj = {
      title: 'Backlog',
      tasks: array
    }
    data.splice(0, 1, obj);
    this.setState({
      fname: '',
      stagesNames: data
    })
  }

  handleForward = (e, i, index, task) => {
    e.preventDefault();
    const dragArray = []
    this.stagesNames.forEach((item, id) => {
      var newCards = item.tasks
      if (id == i + 1) {
        newCards.push(task)
      }
      if (id == i) {
        var deleteCard = newCards.splice(index, 1)
        newCards = deleteCard
      }
      var obj = {
        title: item.title,
        tasks: newCards
      }
      dragArray.push(obj)
    })
    this.setState({ stagesNames: dragArray })
  }

  handleDelete = (e, i, index) => {
    const dragArray = []
    this.stagesNames.forEach((item, id) => {
      var newCards = item.tasks
      if (id == i) {
        var deleteCard = newCards.splice(index, 1)
        newCards = deleteCard
      }
      var obj = {
        title: item.title,
        tasks: newCards
      }
      dragArray.push(obj)
    })
    this.setState({ stagesNames: dragArray })
  }

  handleBackward = (e, i, index, task) => {
    e.preventDefault();
    const dragArray = []
    this.stagesNames.forEach((item, id) => {
      var newCards = item.tasks
      if (id == i - 1) {
        newCards.push(task)
      }
      if (id == i) {
        var deleteCard = newCards.splice(index, 1)
        newCards = deleteCard
      }
      var obj = {
        title: item.title,
        tasks: newCards
      }
      dragArray.push(obj)
    })
    this.setState({ stagesNames: dragArray })
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = this.stagesNames

    console.log("Stage tasks : ", stagesTasks);


    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input id="create-task-input" type="text" className="large" placeholder="New task name"
            data-testid="create-task-input"
            name="name"
            value={this.state.fname}
            onChange={this.handleCreateTask}
          />
          <button type="submit" className="ml-30" data-testid="create-task-button"
            onClick={(e) => this.handleSubmit(e)}
          >Create task</button>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((item, i) => {
            console.log("Stage : ", item);
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{item.title}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {item.tasks?.length > 0 && item.tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            {
                              i === 0 ? (<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                <i className="material-icons" style={{opacity: 0.5}}
                                >arrow_back</i>
                              </button>) : (<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                                <i className="material-icons"
                                  onClick={(e) => this.handleBackward(e, i, index, task)}
                                >arrow_back</i>
                              </button>)
                            }
                            {
                              i === 3 ? (<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}
                              >
                                <i className="material-icons" style={{ opacity: 0.5 }} >arrow_forward</i>
                              </button>) : (<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}
                                onClick={(e) => this.handleForward(e, i, index, task)}
                              >
                                <i className="material-icons">arrow_forward</i>
                              </button>)
                            }
                            <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={(e) => this.handleDelete(e, i, index)} >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}