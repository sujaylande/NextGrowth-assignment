import React, { useState } from "react";
import File from "./File";

const Folder = ({ data, path, onAdd, onEdit, onDelete }) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [newName, setNewName] = useState("");
  const [isFolder, setIsFolder] = useState(true);

  const toggleFolder = (key) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAdd = () => {
    if (newName.trim()) {
      onAdd(path, newName.trim(), isFolder);
      setNewName("");
    } else {
      alert("Name cannot be empty!");
    }
  };

  return (
    <div style={{ marginLeft: "20px" }} >
      {Object.entries(data).map(([key, value]) => {
        const currentPath = path ? `${path}/${key}` : key;
        const isFolder = typeof value === "object" && value !== null;

        return (
          <div key={key}>
            {isFolder ? (
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    onClick={() => toggleFolder(key)}
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                      userSelect: "none",
                    }}
                  >
                    {expandedFolders[key] ? "📂" : "📁"} {key}
                  </span>
                  <button onClick={() => onEdit(currentPath, prompt("New folder name (Rename):", key))}>
                    ✏️
                  </button>
                  <button onClick={() => onDelete(currentPath)}>❌</button>
                </div>
                {expandedFolders[key] && (
                  <Folder
                    data={value}
                    path={currentPath}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                )}
              </>
            ) : (
              <File
                name={key}
                path={currentPath}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </div>
        );
      })}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New file/folder"
          style={{ marginRight: "10px" }}
        />
        <select
          onChange={(e) => setIsFolder(e.target.value === "folder")}
          defaultValue="folder"
          style={{ marginRight: "10px" }}
        >
          <option value="folder">Folder</option>
          <option value="file">File</option>
        </select>
        <button onClick={handleAdd}>➕ Add</button>
      </div>
    </div>
  );
};

export default Folder;
