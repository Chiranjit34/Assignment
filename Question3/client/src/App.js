import react, { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  let [password, setPassword] = useState("");
  let [answer, setAnswer] = useState(null);

  const changeValue = (e) => {
    setPassword(e.target.value);
  };

  const checkButton = async (e) => {
    e.preventDefault();

    try {
      if (password === "") {
        setAnswer("");
      } else {
        const res = await axios.post("http://localhost:8080/data", {
          password: password,
        });
        // console.log(res);
        const data = await res.data.stepsRequired;
        // console.log(data);
        setAnswer(data)
      }
    } catch (err) {
      console.log(err);
    }

    // Toastify
    if (answer === 0) {
      toast("Strong password");
    } else if (password === "") {
      toast("Please enter some value!");
    } else {
      toast("Weak Password");
    }
  };

  const resetButton = () => {
    setPassword("");
    setAnswer("");
  };

  return (
    <div className="App">
      <h1>Password Checker</h1>
      <div className="container">
        <input
          placeholder="Enter Your Password"
          required
          value={password}
          onChange={changeValue}
          type="text"
          name=""
          id=""
          className="input"
        />

        <button className="button" onClick={checkButton}>
          Check
        </button>
        <button className="button" onClick={resetButton}>
          Reset
        </button>
      </div>

      <div className="resultDiv">
        <h4>
          {" "}
          The minimum number of steps required to make password strong is :{" "}
          {answer}
        </h4>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
