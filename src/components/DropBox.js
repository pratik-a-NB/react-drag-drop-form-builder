import React from "react";
import SingleField from "./Types/SingleField";

class TaskList extends React.Component {
  state = {
    fields: [
      {
        id: 1,
        status: "New Order",
        time: "8 hrs",
        days: "5 days left",
        state: {
          tab: "",
          title: "",
          type: "Text",
          name: "",
          toolType: "SINGLE_FIELD",
          defaultValue: "",
          placeholder: "",
          description: "",
          validation: {
            isReadOnly: false,
            isRequired: false,
            min: 6,
            max: 6,
          },
        },
        cellrow: 1,
        cellcoll: 1,
      },
      // {
      //   id: 2,
      //   status: "In Progress",
      //   time: "6 hrs",
      //   days: "6 days left",
      //   done: false,
      //   cellrow: 1,
      //   cellcoll: 1,
      // },
      // {
      //   id: 3,
      //   status: "Completed",

      //   time: "13 hrs",
      //   days: "4 days left",
      //   cellrow: 1,
      //   cellcoll: 1,
      // },
      // {
      //   id: 4,
      //   status: "New Order",

      //   time: "22 hrs",
      //   days: "2 days left",
      //   done: true,
      //   cellrow: 1,
      //   cellcoll: 1,
      // },
      // {
      //   id: 5,
      //   status: "In Progress",

      //   time: "2 hrs",
      //   days: "1 day left",
      //   newOrder: true,
      //   done: false,
      //   cellrow: 1,
      //   cellcoll: 1,
      // },
      // {
      //   id: 6,
      //   status: "Completed",

      //   time: "20 hrs",
      //   days: "11 days left",
      //   done: true,
      //   cellrow: 1,
      //   cellcoll: 1,
      // },
      // {
      //   id: 5,
      //   status: "Delivered",

      //   time: "2 hrs",
      //   days: "1 day left",
      //   done: false,
      //   cellrow: 1,
      //   cellcoll: 1,
      // },
    ],
    emptydata: {
      id: 1,
      status: "New Order",
      time: "8 hrs",
      days: "5 days left",
      state: {
        tab: "",
        title: "",
        type: "Text",
        name: "",
        toolType: "SINGLE_FIELD",
        defaultValue: "",
        placeholder: "",
        description: "",
        validation: {
          isReadOnly: false,
          isRequired: false,
          min: 6,
          max: 6,
        },
      },
      cellrow: 1,
      cellcoll: 1,
    },
    storedfields: [[], [], []],
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
    if (status[0] === 0 && status[1] === 0) {
      return;
    }
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let fields = this.state.fields; //update storedfields here
    let storedfields = this.state.storedfields;
    let emptydata = this.state.emptydata;

    console.log("data", data, status);
    let updatedStoredFields = emptydata;
    updatedStoredFields.cellrow = status[0];
    updatedStoredFields.cellcoll = status[1];

    storedfields[status[1] - 1].push(updatedStoredFields);

    this.setState({ storedfields: storedfields });

    let updated = fields.map((field) => {
      return field;
    });
    this.setState({ fields: updated });
  };

  render() {
    const { fields } = this.state;
    const { storedfields } = this.state;
    console.log("fields", fields);
    let pending = fields.filter((data) => data.status === "In Progress");
    let datacol1 = storedfields[0];
    let datacol2 = storedfields[1];
    let datacol3 = storedfields[2];
    console.log("datacol1", datacol1, storedfields);
    let done = fields.filter((data) => data.status === "Completed");
    let newOrder = fields.filter((data) => data.status === "New Order");
    let waiting = fields.filter((data) => data.status === "Delivered");

    return (
      <div className="container">
        <div className="left-div">
          <div
            className="order small-box"
            onDragLeave={(e) => this.onDragLeave(e)}
            onDragEnter={(e) => this.onDragEnter(e)}
            onDragEnd={(e) => this.onDragEnd(e)}
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, false, [0, 0])}
          >
            <section className="drag_container">
              <div className="container">
                <div className="drag_column">
                  <div className="drag_row">
                    <h4>pickup area</h4>
                    {/* <button style={{ width: "100%" }}>+</button> */}
                    <div className="card card-default">
                      <div className="card-header">Drag to add a Field</div>
                      <div className="toolbox">
                        <div className="card-body toolbox-list p-0">
                          <ul
                            className="list-group"
                            ref={(tools) => (this._tools = tools)}
                          >
                            <div
                              className="card"
                              // key={field.name}
                              // id={field.id}
                              // draggable
                              // onDragStart={(e) => this.onDragStart(e)}
                              // onDragEnd={(e) => this.onDragEnd(e)}
                            >
                              {newOrder.map((field) => (
                                <li
                                  data-tool="SINGLE_FIELD"
                                  key="SINGLE_FIELD"
                                  className="list-group-item singleField"
                                  id={field.id}
                                  draggable
                                  onDragStart={(e) => this.onDragStart(e)}
                                  onDragEnd={(e) => this.onDragEnd(e)}
                                >
                                  <i className={"fa fa-wpforms" + " mr-3"}></i>
                                  Single Field{" "}
                                </li>
                              ))}
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="right-div">
          <div className="container">
            <div
              className="pending col"
              onDragLeave={(e) => this.onDragLeave(e)}
              onDragEnter={(e) => this.onDragEnter(e)}
              onDragEnd={(e) => this.onDragEnd(e)}
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, false, [1, 1])}
            >
              <section className="drag_container">
                <div className="container">
                  <div className="drag_column">
                    <div className="drag_row">
                      <h4>col 1</h4>
                      {/* <button style={{ width: "100%" }}>+</button> */}
                      {datacol1.map((field, index) => (
                        <div
                          className="card"
                          key={field.name}
                          id={field.id}
                          draggable
                          onDragStart={(e) => this.onDragStart(e)}
                          onDragEnd={(e) => this.onDragEnd(e)}
                        >
                          <div className="img">
                            {/* <img src={field.image} alt="box" /> */}
                          </div>
                          <div className="card_right">
                            <SingleField
                              changeState={(e, index) =>
                                this.changeChildState(e, index)
                              }
                              field={field}
                              index={index}
                              key={index}
                              //removeField={() => removestoredfield(index, 1)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div
              className="pending col"
              onDragLeave={(e) => this.onDragLeave(e)}
              onDragEnter={(e) => this.onDragEnter(e)}
              onDragEnd={(e) => this.onDragEnd(e)}
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, false, [1, 2])}
            >
              <section className="drag_container">
                <div className="container">
                  <div className="drag_column">
                    <div className="drag_row">
                      <h4>col 2</h4>
                      {/* <button style={{ width: "100%" }}>+</button> */}
                      {datacol2.map((field, index) => (
                        <div
                          className="card"
                          key={field.name}
                          id={field.id}
                          draggable
                          onDragStart={(e) => this.onDragStart(e)}
                          onDragEnd={(e) => this.onDragEnd(e)}
                        >
                          <div className="img">
                            {/* <img src={field.image} alt="box" /> */}
                          </div>
                          <div className="card_right">
                            <SingleField
                              changeState={(e, index) =>
                                this.changeChildState(e, index)
                              }
                              field={field}
                              index={index}
                              key={index}
                              removeField={() => this.remove(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div
              className="pending col"
              onDragLeave={(e) => this.onDragLeave(e)}
              onDragEnter={(e) => this.onDragEnter(e)}
              onDragEnd={(e) => this.onDragEnd(e)}
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, false, [1, 3])}
            >
              <section className="drag_container">
                <div className="container">
                  <div className="drag_column">
                    <div className="drag_row">
                      <h4>col 3</h4>
                      {/* <button style={{ width: "100%" }}>+</button> */}
                      {datacol3.map((field, index) => (
                        <div
                          className="card"
                          key={field.name}
                          id={field.id}
                          draggable
                          onDragStart={(e) => this.onDragStart(e)}
                          onDragEnd={(e) => this.onDragEnd(e)}
                        >
                          <div className="img">
                            {/* <img src={field.image} alt="box" /> */}
                          </div>
                          <div className="card_right">
                            <SingleField
                              changeState={(e, index) =>
                                this.changeChildState(e, index)
                              }
                              field={field}
                              index={index}
                              key={index}
                              removeField={() => this.remove(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
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
                  {done.map((field) => (
                    <div
                      className="card"
                      key={field.name}
                      id={field.id}
                      draggable
                      onDragStart={(e) => this.onDragStart(e)}
                      onDragEnd={(e) => this.onDragEnd(e)}
                    >
                      <div className="img">
                        <img src={field.image} alt="box" />
                      </div>
                      <div className="card_right">
                        <div className="status">{field.status}</div>
                        <div className="days">{field.time}</div>
                        <div className="time">{field.days}</div>
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
