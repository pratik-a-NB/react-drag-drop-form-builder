import React, { useState } from "react";
import DropArea from "./DropArea";

export default function DropBox() {
  DropBox = () => {
    const [columns, setColumns] = useState([[], [], []]);
    const handleDrop = (index, item) => {
      const newColumns = [...columns];
      const column = newColumns[index];
      if (column.length < 3) {
        column.push(item);
        setColumns(newColumns);
      }
    };
    return (
      <div style={{ display: "flex" }}>
        {columns.map((column, index) => (
          <div key={index} style={{ flex: 1 }}>
            {column.map((item, i) => (
              <div key={i}>{item.name}</div>
            ))}
            <DropArea onDrop={(item) => handleDrop(index, item)} />
          </div>
        ))}
      </div>
    );
  };
}
