import react, { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  let [password, setPassword] = useState("");
  let [answer, setAnswer] = useState("");

  const changeValue = (e) => {
    setPassword(e.target.value);
  };

  const passwordChecker = (password) => {
    let nummberCount = 1;
    let uperCaseCount = 1;
    let lowerCaseCount = 1;
    let count1 = 0;
    let count2 = 0;
    if (/[0-9]/.test(password) === true) {
      nummberCount = 0;
    }
    if (/[a-z]/.test(password) === true) {
      lowerCaseCount = 0;
    }
    if (/[A-Z]/.test(password) === true) {
      uperCaseCount = 0;
    }
    for (let i = 0; i < password.length; i++) {
      if (
        password[i] === password[i + 1] &&
        password[i + 1] === password[i + 2]
      ) {
        i += 2;
        count1 += 1;
      }
    }
    if (password.length < 6) {
      return (answer = Math.max(
        lowerCaseCount + uperCaseCount + nummberCount,
        6 - password.length
      ));
    } else if (password.length <= 20) {
      return (answer = Math.max(
        lowerCaseCount + uperCaseCount + nummberCount,
        count1
      ));
    } else if (password.length > 20) {
      password = password.split("");
      let y = password.length - 20;
      let x = password.length - 20;
      let count = 1;
      let arr1 = [];
      let arr2 = [];
      for (let i = 0; i < password.length; i++) {
        if (password[i] === password[i + 1]) {
          count += 1;
        } else {
          arr1.push(count);
          arr2.push(count);
          count = 1;
        }
      }
      let i = 0;
      while (i < 60 && x > 0) {
        for (let i = 0; i < arr2.length && x > 0; i++) {
          if (arr2[i] % 3 === 0 && arr2[i] >= 3) {
            arr2[i] = arr2[i] - 1;
            x = x - 1;
          }
        }
        for (let i = 0; i < arr2.length && x > 0; i++) {
          if (arr2[i] % 3 === 1 && arr2[i] >= 3) {
            arr2[i] = arr2[i] - 1;
            x = x - 1;
          }
        }
        for (let i = 0; i < arr2.length && x > 0; i++) {
          if (arr2[i] % 3 === 2 && arr2[i] >= 3) {
            arr2[i] = arr2[i] - 1;
            x = x - 1;
          }
        }
        i++;
      }
      for (let i = 0; i < arr2.length; i++) {
        for (let j = i + 1; j < arr2.length; j++) {
          if (
            arr2[i] >= 3 &&
            arr2[j] >= 3 &&
            arr2[i] % 3 === 0 &&
            arr2[j] % 3 === 0 &&
            arr2[i] !== arr1[i] &&
            arr2[j] !== arr1[j]
          ) {
            arr2[i] -= 1;
            arr2[j] += 1;
          } else if (
            arr2[i] >= 3 &&
            arr2[j] >= 3 &&
            arr2[i] % 3 === 0 &&
            arr2[j] % 3 === 1 &&
            arr2[i] !== arr1[i] &&
            arr2[j] !== arr1[j]
          ) {
            arr2[i] -= 1;
            arr2[j] += 1;
          } else if (
            arr2[i] >= 3 &&
            arr2[j] >= 3 &&
            arr2[i] % 3 === 1 &&
            arr2[j] % 3 === 0 &&
            arr2[i] !== arr1[i] &&
            arr2[j] !== arr1[j]
          ) {
            arr2[j] -= 1;
            arr2[i] += 1;
          }
        }
      }
      count2 = 0;
      for (let i = 0; i < arr2.length; i++) {
        if (arr2[i] >= 3) {
          arr2[i] -= 3;
          count2 += 1;
          i--;
        }
      }
      return (answer =
        Math.max(lowerCaseCount + uperCaseCount + nummberCount, count2) + y);
    }
  };

  // const checkButton = () => {
  //   if (password === "") {
  //     setAnswer("");
  //   }
  //   else {
  //     setAnswer(passwordChecker(password))
  //   }
  //   if (answer === 0) {
  //     toast("Strong password");
  //   }else if (password === "") {
  //     toast("Please enter some value!");
  //   } else {
  //     toast("Weak Password");
  //   }
  // };

  const checkButton = async (e) => {
    e.preventDefault();

    try {
      if (password === "") {
        setAnswer("");
      } else {
        setAnswer(passwordChecker(password));
        const res = await axios.post("http://localhost:8080/data", {
          password: password,
          answer: answer,
        });
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
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
  // console.log(password);
  // console.log(typeof answer);

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
