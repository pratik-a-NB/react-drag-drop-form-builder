import React from "react";
import { useDrop } from "react-dnd";

export default function DropArea() {
  const DropArea = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "FIELD",
      drop: (item) => onDrop(item),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    return (
      <div
        ref={drop}
        style={{
          border: "1px dashed gray",
          padding: "10px",
          margin: "10px",
          backgroundColor: isOver ? "lightgray" : "transparent",
        }}
      >
        Drop here
      </div>
    );
  };
}
