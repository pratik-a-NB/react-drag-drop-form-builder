import React from "react";
import { useDrag } from "react-dnd";

export default function Field({ fieldName, index }) {
  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: { id: fieldName, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {fieldName}
    </div>
  );
}
