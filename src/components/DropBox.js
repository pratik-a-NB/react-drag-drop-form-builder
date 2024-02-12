import React from "react";
import SingleField from "./Types/SingleField";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
            value: "",

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

        state: {
          tab: "",
          title: "",
          type: "Text",
          name: "",
          value: "",
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
      storedfields: [[{ v: "0" }], [{ v: "0" }], [{ v: "0" }]],
      tools: [
        {
          id: 1,
          title: "ID",
          data: "1001",
          icon: "fa fa-wpforms",
          isdropped: false,
        },
        {
          id: 2,
          title: "Name",
          data: "Pratik",
          icon: "fa fa-wpforms",
          isdropped: false,
        },
        {
          id: 3,
          title: "Time",
          data: "11 am",
          icon: "fa fa-wpforms",
          isdropped: false,
        },
        // {
        //   title: "Single Field",
        //   name: "SELECT_FIELD",
        //   icon: "fa fa-wpforms",
        // },
        // {
        //   title: "Single Field",
        //   name: "SELECT_FIELD",
        //   icon: "fa fa-wpforms",
        // },
      ],
      dragstart: [-1, -1, -1],
    };
  }

  onDragStart = (evt, row = -1, col = -1, id = -1) => {
    let dummydragstart = this.state.dragstart;

    console.log("pick up", evt);

    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
    dummydragstart[0] = row;
    dummydragstart[1] = col;
    dummydragstart[2] = id;

    console.log("drag started from ", dummydragstart);

    this.setState({
      dragstart: dummydragstart,
    });
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

  // input in the single field
  changeChildState = (evalue, index, col) => {
    let dummystoredfields = this.state.storedfields;
    console.log("value of eval 2", evalue);
    dummystoredfields[col][index].state.value = evalue;
    console.log("changechildstate", dummystoredfields);
    this.setState({
      storedfields: dummystoredfields,
    });
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
    let tools = this.state.tools;
    let updatedTools = this.state.tools;
    let dummydragstart = this.state.dragstart;
    let emptydata = this.state.emptydata;

    let currentTool = tools.find((obj) => obj.id === dummydragstart[2]);

    console.log(storedfields);

    let l1 = storedfields[0].length;
    let l2 = storedfields[1].length;
    let l3 = storedfields[2].length;

    console.log("data", data, status);
    let updatedStoredFields = { ...emptydata };
    // drag and drop from one cell to another
    if (dummydragstart[0] !== -1) {
      console.log("draged field within ", dummydragstart, storedfields);
      let temp = storedfields[dummydragstart[1] - 1][dummydragstart[0]];
      console.log(temp);
      console.log(storedfields[0][0]);
      console.log(storedfields);
      updatedStoredFields = { ...temp };
      this.removestoredfield(dummydragstart[0], dummydragstart[1] - 1, -1);
    }

    updatedStoredFields.cellrow = status[0];
    updatedStoredFields.cellcoll = status[1];
    if (dummydragstart[2] !== -1) {
      updatedStoredFields.tool = currentTool;

      const currentToolIndex = tools.findIndex(
        (item) => item.id === dummydragstart[2]
      );

      if (currentToolIndex !== -1) {
        // Update the quantity of the specific item
        updatedTools[currentToolIndex].isdropped = true;
        console.log(updatedTools);
        // Update the state with the new array of items
        this.setState({ tools: updatedTools });
      }
    }
    console.log("not stored yet", storedfields, updatedStoredFields);

    //console.log("new cc cr ", updatedStoredFields);
    //storedfields[status[1] - 1].push(updatedStoredFields);
    if (storedfields[status[1] - 1][status[0] - 1].v === "0") {
      console.log("before", storedfields);
      storedfields[status[1] - 1].splice(status[0] - 1, 1, updatedStoredFields);
      console.log("after", storedfields);
      console.log("check index", storedfields, status[0]);
      if (storedfields[status[1] - 1].length === status[0]) {
        storedfields[0].push({ v: "0" });
        storedfields[1].push({ v: "0" });
        storedfields[2].push({ v: "0" });
      }
    } else {
      storedfields[status[1] - 1].splice(status[0] - 1, 0, updatedStoredFields);
    }

    console.log("before saving", updatedStoredFields, storedfields);
    this.setState({ storedfields: storedfields });

    let updated = fields.map((field) => {
      return field;
    });
    this.setState({ fields: updated });

    this.setState({
      dragstart: [-1, -1, -1],
    });
  };

  removestoredfield = (row, col, toolid = -1) => {
    console.log(row, col, toolid);
    const { storedfields } = this.state;
    const { tools } = this.state;
    let updatedTools = this.state.tools;
    let currentTool = tools.find((obj) => obj.id === toolid);
    const currentToolIndex = tools.findIndex((item) => item.id === toolid);

    console.log(storedfields);
    console.log(tools);
    let filteredItems = storedfields[col].filter((item) => {
      console.log(item.cellrow, row + 1);
      return item.cellrow !== row + 1;
    });

    if (toolid !== -1 && currentToolIndex !== -1) {
      // Update the quantity of the specific item
      updatedTools[currentToolIndex].isdropped = false;
      console.log(updatedTools);
      // Update the state with the new array of items
      this.setState({ tools: updatedTools });
    }

    filteredItems.splice(row, 0, { v: "0" });

    console.log(filteredItems);
    let newData = storedfields;
    newData[col] = filteredItems;
    console.log(newData);

    this.setState({ storedfields: newData });
  };

  render() {
    const { fields } = this.state;
    const { storedfields } = this.state;
    const { tools } = this.state;
    let availableTools = tools.filter((tool) => tool.isdropped === false);

    console.log("fields", fields, availableTools, tools);
    let pending = fields.filter((data) => data.status === "In Progress");
    let datacol1 = storedfields[0];
    let datacol2 = storedfields[1];
    let datacol3 = storedfields[2];
    console.log("datacol1", datacol1, storedfields);
    let done = fields.filter((data) => data.status === "Completed");
    let newOrder = fields.filter((data) => data.status === "New Order");
    let waiting = fields.filter((data) => data.status === "Delivered");

    return (
      <div className="container-fluid">
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
                              {availableTools.map((field, index) => (
                                <li
                                  data-tool="SINGLE_FIELD"
                                  key={index}
                                  className="list-group-item singleField w-100"
                                  id={field.id}
                                  draggable
                                  onDragStart={(e) =>
                                    this.onDragStart(e, -1, -1, field.id)
                                  }
                                  onDragEnd={(e) => this.onDragEnd(e)}
                                >
                                  <i className={"fa fa-wpforms" + " mr-3"}></i>
                                  {field.title}
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
          <div className="col-container">
            <div className="pending col">
              <section className="drag_container">
                <div className="container">
                  <div className="drag_column">
                    <div className="drag_row">
                      <h4>col 1</h4>
                      {/* <button style={{ width: "100%" }}>+</button> */}
                      {datacol1.map((field, index) => (
                        <div>
                          {field.v === "0" ? (
                            <div
                              onDragLeave={(e) => this.onDragLeave(e)}
                              onDragEnter={(e) => this.onDragEnter(e)}
                              onDragEnd={(e) => this.onDragEnd(e)}
                              onDragOver={(e) => this.onDragOver(e)}
                              onDrop={(e) =>
                                this.onDrop(e, false, [index + 1, 1])
                              }
                            >
                              <p
                                style={{
                                  textAlign: "center",
                                  padding: "2em",
                                  fontSize: "21pt",
                                  marginTop: "16px",
                                  fontWeight: "bold",
                                  textTransform: "uppercase",
                                  color: "#aaa",
                                  backgroundColor: "#eee",
                                  height: "206px",
                                }}
                              >
                                Drop a Field
                              </p>
                            </div>
                          ) : (
                            <div
                              className="card"
                              key={index}
                              id={field.id}
                              draggable
                              onDragStart={(e) =>
                                this.onDragStart(e, index, 1, -1)
                              }
                              onDragEnd={(e) => this.onDragEnd(e)}
                              style={{ marginTop: "16px" }}
                            >
                              <div className="img">
                                {/* <img src={field.image} alt="box" /> */}
                              </div>
                              <div className="card_right">
                                <SingleField
                                  changeState={(evalue, index) => {
                                    console.log("value of e", evalue);
                                    this.changeChildState(evalue, index, 0);
                                  }}
                                  field={field}
                                  index={index}
                                  key={index}
                                  removeField={() =>
                                    this.removestoredfield(
                                      index,
                                      0,
                                      field.tool.id
                                    )
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="pending col">
              <section className="drag_container">
                <div className="container">
                  <div className="drag_column">
                    <div className="drag_row">
                      <h4>col 2</h4>
                      {/* <button style={{ width: "100%" }}>+</button> */}
                      {datacol2.map((field, index) => (
                        <div>
                          {field.v === "0" ? (
                            <div
                              onDragLeave={(e) => this.onDragLeave(e)}
                              onDragEnter={(e) => this.onDragEnter(e)}
                              onDragEnd={(e) => this.onDragEnd(e)}
                              onDragOver={(e) => this.onDragOver(e)}
                              onDrop={(e) =>
                                this.onDrop(e, false, [index + 1, 2])
                              }
                            >
                              <p
                                style={{
                                  textAlign: "center",
                                  padding: "2em",
                                  fontSize: "21pt",
                                  fontWeight: "bold",
                                  marginTop: "16px",

                                  textTransform: "uppercase",
                                  color: "#aaa",
                                  backgroundColor: "#eee",
                                  height: "206px",
                                }}
                              >
                                Drop a Field
                              </p>
                            </div>
                          ) : (
                            <div
                              className="card"
                              key={index}
                              id={field.id}
                              draggable
                              onDragStart={(e) =>
                                this.onDragStart(e, index, 2, -1)
                              }
                              onDragEnd={(e) => this.onDragEnd(e)}
                              style={{ marginTop: "16px" }}
                            >
                              <div className="img">
                                {/* <img src={field.image} alt="box" /> */}
                              </div>
                              <div className="card_right">
                                <SingleField
                                  changeState={(evalue, index) => {
                                    console.log("value of e", evalue);
                                    this.changeChildState(evalue, index, 1);
                                  }}
                                  field={field}
                                  index={index}
                                  key={index}
                                  removeField={() =>
                                    this.removestoredfield(
                                      index,
                                      1,
                                      field.tool.id
                                    )
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="pending col">
              <section className="drag_container">
                <div className="container">
                  <div className="drag_column">
                    <div className="drag_row">
                      <h4>col 3</h4>
                      {/* <button style={{ width: "100%" }}>+</button> */}
                      {datacol3.map((field, index) => (
                        <div>
                          {field.v === "0" ? (
                            <div
                              onDragLeave={(e) => this.onDragLeave(e)}
                              onDragEnter={(e) => this.onDragEnter(e)}
                              onDragEnd={(e) => this.onDragEnd(e)}
                              onDragOver={(e) => this.onDragOver(e)}
                              onDrop={(e) =>
                                this.onDrop(e, false, [index + 1, 3])
                              }
                            >
                              <p
                                style={{
                                  textAlign: "center",
                                  padding: "2em",
                                  fontSize: "21pt",
                                  marginTop: "16px",

                                  fontWeight: "bold",
                                  textTransform: "uppercase",
                                  color: "#aaa",
                                  backgroundColor: "#eee",
                                  height: "206px",
                                }}
                              >
                                Drop a Field
                              </p>
                            </div>
                          ) : (
                            <div
                              className="card"
                              key={index}
                              id={field.id}
                              draggable
                              onDragStart={(e) =>
                                this.onDragStart(e, index, 3, -1)
                              }
                              onDragEnd={(e) => this.onDragEnd(e)}
                              style={{ marginTop: "16px" }}
                            >
                              <div className="img">
                                {/* <img src={field.image} alt="box" /> */}
                              </div>
                              <div className="card_right">
                                <SingleField
                                  changeState={(evalue, index) => {
                                    console.log("value of e", evalue);
                                    this.changeChildState(evalue, index, 2);
                                  }}
                                  field={field}
                                  index={index}
                                  key={index}
                                  removeField={() =>
                                    this.removestoredfield(
                                      index,
                                      2,
                                      field.tool.id
                                    )
                                  }
                                />
                              </div>
                            </div>
                          )}
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
