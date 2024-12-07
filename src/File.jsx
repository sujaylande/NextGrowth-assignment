import React from "react";

const File = ({ name, path, onEdit, onDelete }) => {
  return (
    <div style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}>
      📄 {name}
      <button
        onClick={() => {
          const newName = prompt("New file name (Rename):", name);
          if (newName) onEdit(path, newName);
        }}
        style={{ marginLeft: "10px" }}
      >
        ✏️
      </button>
      <button onClick={() => onDelete(path)} style={{ marginLeft: "10px" }}>
        ❌
      </button>
    </div>
  );
};

export default File;
