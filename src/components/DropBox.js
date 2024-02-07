import React from "react";
class TaskList extends React.Component {
  state = {
    fields: [
      {
        id: 1,
        status: "New Order",
        time: "8 hrs",
        days: "5 days left",
        cellrow: 1,
        cellcoll: 1,
      },
      {
        id: 2,
        status: "In Progress",
        time: "6 hrs",
        days: "6 days left",
        done: false,
        cellrow: 1,
        cellcoll: 1,
      },
      {
        id: 3,
        status: "Completed",

        time: "13 hrs",
        days: "4 days left",
        cellrow: 1,
        cellcoll: 1,
      },
      {
        id: 4,
        status: "New Order",

        time: "22 hrs",
        days: "2 days left",
        done: true,
        cellrow: 1,
        cellcoll: 1,
      },
      {
        id: 5,
        status: "In Progress",

        time: "2 hrs",
        days: "1 day left",
        newOrder: true,
        done: false,
        cellrow: 1,
        cellcoll: 1,
      },
      {
        id: 6,
        status: "Completed",

        time: "20 hrs",
        days: "11 days left",
        done: true,
        cellrow: 1,
        cellcoll: 1,
      },
      {
        id: 5,
        status: "Delivered",

        time: "2 hrs",
        days: "1 day left",
        done: false,
        cellrow: 1,
        cellcoll: 1,
      },
    ],

    usedFields: [],
  };

  onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };
  onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  // droped fields gets saved here
  onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let fields = this.state.fields; //update usedfields here
    console.log("data", data, status);
    let updated = fields.map((task) => {
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    this.setState({ fields: updated });
  };

  render() {
    const { fields } = this.state;
    console.log("fields", fields);
    let pending = fields.filter((data) => data.status === "In Progress");
    let done = fields.filter((data) => data.status === "Completed");
    let newOrder = fields.filter((data) => data.status === "New Order");
    let waiting = fields.filter((data) => data.status === "Delivered");

    return (
      <div className="container">
        <div className="droprow">
          <div
            className="rowelements"
            onDragLeave={(e) => this.onDragLeave(e)}
            onDragEnter={(e) => this.onDragEnter(e)}
            onDragEnd={(e) => this.onDragEnd(e)}
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, false, "New Order")}
          >
            <section className="drag_container">
              <div className="container">
                <div className="drag_column">
                  <div className="drag_row">
                    <h4>pickup area</h4>
                    {/* <button style={{ width: "100%" }}>+</button> */}
                    {newOrder.map((task) => (
                      <div
                        className="card"
                        key={task.name}
                        id={task.id}
                        draggable
                        onDragStart={(e) => this.onDragStart(e)}
                        onDragEnd={(e) => this.onDragEnd(e)}
                      >
                        <div className="img">
                          {/* <img src={task.image} alt="box" /> */}
                        </div>
                        <div className="card_right">
                          <div className="status">{task.status}</div>
                          <div className="days">{task.time}</div>
                          <div className="time">{task.days}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div></div>
        </div>
        <div
          className="pending small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, false, "In Progress")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>drop area</h4>
                  {/* <button style={{ width: "100%" }}>+</button> */}
                  {pending.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="img">
                        {/* <img src={task.image} alt="box" /> */}
                      </div>
                      <div className="card_right">
                        <div className="status">{task.status}</div>
                        <div className="days">{task.time}</div>
                        <div className="time">{task.days}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* <div
          className="done small-box"
          onDragLeave={(e) => this.onDragLeave(e)}
          onDragEnter={(e) => this.onDragEnter(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, true, "Completed")}
        >
          <section className="drag_container">
            <div className="container">
              <div className="drag_column">
                <div className="drag_row">
                  <h4>Completed</h4>
                  <button style={{ width: "100%" }}>+</button>
                  {done.map((task) => (
                    <div
                      className="card"
                      key={task.name}
                      id={task.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="img">
                        <img src={task.image} alt="box" />
                      </div>
                      <div className="card_right">
                        <div className="status">{task.status}</div>
                        <div className="days">{task.time}</div>
                        <div className="time">{task.days}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div> */}
      </div>
    );
  }
}

export default TaskList;
