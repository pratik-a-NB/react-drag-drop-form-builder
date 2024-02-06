import React from "react";
import DropArea from "./DropArea";
import { useDrag } from "react-dnd";

export default function Field() {
  Field = ({ Number: key, String: fieldName, Number: index }) => {
    console.log("iiiiiiiiiiiiii", key, index, fieldName);
    const [{ isDragging }, drag] = useDrag({
      type: "FIELD",
      item: { id: key, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {fieldName}
      </div>
    );
  };
}
