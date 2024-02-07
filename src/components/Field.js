import React from "react";
import { useDrag } from "react-dnd";

const ToolBoxItemTypes = {
  FIELD: "field",
};

const ToolboxItem = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ToolBoxItemTypes.FIELD,
    item: { id, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        border: "1px dashed #000",
        margin: "5px",
        padding: "5px",
      }}
    >
      {name}
    </div>
  );
};

export default ToolboxItem;
