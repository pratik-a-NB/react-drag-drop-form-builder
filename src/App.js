import React, { Component } from "react";
import ToolBox from "./components/ToolBox";
import FormContainer from "./components/FormContainer";
import "./css/App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropBox from "./components/DropBox";
import Field from "./components/Field";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
// class TestComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       toolType: "CUSTOM_COM",
//       num1: 1,
//       num2: 2,
//     };
//   }

//   changeValue(value) {
//     this.setState({
//       num1: value,
//     });
//     setTimeout(() => {
//       return this.props.changeState(this.state, this.props.index);
//     }, 0);
//   }

//   render() {
//     return (
//       <div className="container">
//         <span
//           className="pull-right cross"
//           onClick={() => this.props.removeField(this.props.index)}
//         >
//           x
//         </span>
//         <input onChange={(e) => this.changeValue(e.target.value)} type="text" />
//       </div>
//     );
//   }
// }

// class TestPreview extends Component {
//   render() {
//     return <h3>{this.props.toolType}</h3>;
//   }
// }

// const myCustoms = [
//   {
//     container: <TestComponent />,
//     preview: <TestPreview />,
//     toolbox: {
//       title: "Test",
//       icon: "fa fa-user",
//       name: "CUSTOM_COM",
//     },
//     states: {
//       toolType: "CUSTOM_COM",
//       num1: 1,
//       num2: 2,
//     },
//   },
// ];
// const fields = [
//   { id: 1, name: "Field 1" },
//   { id: 2, name: "Field 2" },
//   { id: 3, name: "Field 3" },
//   // Add more fields as needed
// ];

class App extends Component {
  printToPDF = () => {
    const doc = new jsPDF();
    // const htmlString = ReactDOMServer.renderToString(<DropBox />);
    const htmlContent = document.documentElement.outerHTML;

    const maxWidth = 180; // Maximum width of the text on the page
    const newWindow = window.open("", "_blank");
    console.log(htmlContent);
    // 3. Write HTML content to the new window
    newWindow.document.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Preview</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Add your print-specific styles here */
            @media print {
              /* Define styles for printing */
            }
          </style>
        </head>
        <body>
          <div>${htmlContent}</div>
        </body>
      </html>
    `);
    newWindow.document.close();

    // 4. Trigger print dialog
    newWindow.print();
    // Set initial position
    let y = 10;

    // Split text into lines
    let lines = doc.splitTextToSize(htmlContent, maxWidth);

    // Add lines to the document
    lines.forEach((line) => {
      if (y + 10 > doc.internal.pageSize.height) {
        // Check if adding this line would exceed the page height
        doc.addPage(); // Add a new page if needed
        y = 10; // Reset y position
      }
      doc.text(line, 10, y); // Add line to the document
      y += 10; // Increment y position
    });

    doc.save("output.pdf");
  };
  render() {
    return (
      <div>
        {/* <div className="App">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <ToolBox />
              </div>
              <div className="col-md-7">
                <FormContainer
                  loader={false}
                  debug={false}
                  updateOnMount={true}
                  updateForm={this.updateForm}
                  onSave={this.myForm}
                  custom={myCustoms}
                />
              </div>
            </div>
          </div>
        </div> */}

        <DndProvider backend={HTML5Backend}>
          <div>
            <div>
              <h2>Custom Form</h2>
              <button onClick={this.printToPDF}>Print to PDF</button>
              <div>
                <DropBox />
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    );
  }

  // updateForm(callback) {
  //   // let rawForm = '[{"title":"ADS","toolType":"RADIO_BUTTONS","multiple":false,"inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"radios":[]},{"title":"Title","toolType":"CHECK_BOXES","inline":false,"defaultValue":"","placeholder":"","description":"","validation":{"isReadOnly":false,"isRequired":false,"min":6,"max":6},"checkBoxes":[]}]';
  //   //let form = JSON.parse(rawForm);
  //   //  callback(form);
  // }

  // myForm(form) {
  //   console.log(form);
  // }
}

export default App;
