import { React, useState } from "react";
import todo_logo from "../assets/todo_logo.png";
function Todo() {
  const [inputData, setinputData] = useState(""); //Here is initial value empty
  const [addItems, setaddItems] = useState([]); //Here is initial value empty array
  const [editItem, seteditItem] = useState(null); //Here is initial value false
  const [toggle, settoggle] = useState(true);

  //Add data
  const addItem = () => {
    if (!inputData) {
      //if inputData is true means inputData in filled or without empty
    } 
    else if (inputData && !toggle) {
      setaddItems(
        addItems.map((elem)=>{
     if (elem.id===editItem) {
      return {...elem, name:inputData}
        }
      return elem
      })
      )
      setinputData("");
      seteditItem(null);
      settoggle(true);
    }
      
    else {
      const allInputdata = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setaddItems([...addItems, allInputdata]);
      setinputData(""); //set input empty after click add
    }
  };

  //Delete Data

  const deleteItem = (index) => {
    const updatedItems = addItems.filter((elem) => {
      return index !== elem.id;
    });
    setaddItems(updatedItems);
  };
  // Clear All data
  const clearAll = () => {
    setaddItems([]);
  };

  // edit data

  const updateItem = (index) => {
    const updatedItems = addItems.find((elem) => {
      return index === elem.id;
    });
    settoggle(false);
    setinputData(updatedItems.name);
    seteditItem(index);
  };
  return (
    <div>
      <div className="container w-50">
        <div className="d-flex justify-content-center">
          <figure>
            <img src={todo_logo} alt="todo_logo" style={{ width: "10rem" }} />
            <figcaption>
              <h6>Add your daily plans here</h6>
            </figcaption>
          </figure>
        </div>

        <div
          className="addItems d-flex justify-content-center"
          style={{ marginBottom: "20px" }}
        >
          <input
            type="text"
            size="40"
            placeholder="type todo here"
            value={inputData}
            onChange={(e) => setinputData(e.target.value)}
          />
          {toggle ? 
            <button className="btn btn-primary" onClick={addItem}>
              Add
            </button>
           : 
            <button className="btn btn-primary" onClick={addItem}>
              Update
            </button>
          }
          
        </div>

        {addItems.map((elem) => {
          return (
            <table className="listItems container table " key={elem.id}>
              <tbody>
                <tr>
                  <td style={{ width: "600px" }}>
                    <p style={{ marginRight: "30px" }}>{elem.name}</p>
                  </td>
                  <td>
                    <i
                      className="fa fa-edit"
                      title="Edit"
                      onClick={() => updateItem(elem.id)}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash"
                      title="Delete"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}

        <div
          className="delete_all d-flex justify-content-center"
          style={{ marginTop: "10px" }}
        >
          <button
            type="button"
            class="btn btn-outline-primary "
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
