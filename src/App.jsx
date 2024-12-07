import React, { useState } from "react";
import Folder from "./Folder";

const initialData = {
  Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
  Desktop: ["Screenshot1.jpg", "videopal.mp4"],
  Downloads: {
    Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
  },
  Applications: ["Webstorm.dmg", "Pycharm.dmg", "FileZila.dmg", "Mattermost.dmg"],
  "chromedriver.dmg": null,
};

function App() {
  const [data, setData] = useState(initialData);

  // Function to handle adding a new file or folder
  const handleAdd = (path, name, isFolder) => {
    if (!name.trim()) {
      alert("Name cannot be empty!");
      return;
    }
    const paths = path ? path.split("/") : [];
    const temp = { ...data };

    const parent = paths.reduce((acc, curr) => acc[curr], temp);

    if (isFolder) {
      if (parent[name]) {
        alert("Folder with this name already exists!");
        return;
      }
      parent[name] = {}; // Add new folder
    } else {
      if (!Array.isArray(parent)) {
        alert("Cannot add a file here!");
        return;
      }
      if (parent.includes(name)) {
        alert("File with this name already exists!");
        return;
      }
      parent.push(name); // Add new file
    }
    setData(temp);
  };

  // Function to handle editing a file or folder
  const handleEdit = (path, newName) => {
    if (!newName.trim()) {
      alert("Name cannot be empty!");
      return;
    }

    const paths = path.split("/");
    const temp = { ...data };
    const parent = paths.slice(0, -1).reduce((acc, curr) => acc[curr], temp);
    const oldName = paths[paths.length - 1];

    if (Array.isArray(parent)) {
      const index = parent.indexOf(oldName);
      if (index !== -1) {
        if (!parent.includes(newName)) parent[index] = newName;
        else alert("Duplicate name not allowed!");
      }
    } else {
      if (!parent[newName]) {
        parent[newName] = parent[oldName];
        delete parent[oldName];
      } else {
        alert("Duplicate name not allowed!");
      }
    }
    setData(temp);
  };

  // Function to handle deleting a file or folder
  const handleDelete = (path) => {
    const paths = path.split("/");
    const temp = { ...data };
    const parent = paths.slice(0, -1).reduce((acc, curr) => acc[curr], temp);
    const key = paths[paths.length - 1];

    if (Array.isArray(parent)) {
      const index = parent.indexOf(key);
      if (index !== -1) parent.splice(index, 1);
    } else {
      delete parent[key];
    }
    setData(temp);
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Dynamic Folder Structure</h1>
      <Folder
        data={data}
        path=""
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}

      />
    </div>
  );
}

export default App;
