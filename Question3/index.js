const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Password = require("./models/passwordModel");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("OK");
});

//--------------------------------//
//--------------------------------//
//--------------------------------//
//--------------------------------//
app.post("/data", async (req, res) => {
  const { password } = req.body;

  //-------//
  //-------//
  //-------//
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
      return Math.max(
        lowerCaseCount + uperCaseCount + nummberCount,
        6 - password.length
      );
    } else if (password.length <= 20) {
      return Math.max(lowerCaseCount + uperCaseCount + nummberCount, count1);
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
      return Math.max(lowerCaseCount + uperCaseCount + nummberCount, count2) + y;
    }
  };
  // const passwordChecker = (password) => {
  //   // Check the length of the password
  //   const length = password.length;
  //   let steps = 0;

  //   if (length < 6) {
  //     steps = 6 - length;
  //   } else if (length > 20) {
  //     steps = length - 20;
  //   }

  //   // Check for missing character types
  //   const hasLowercase = /[a-z]/.test(password);
  //   const hasUppercase = /[A-Z]/.test(password);
  //   const hasDigit = /[0-9]/.test(password);

  //   if (!hasLowercase) {
  //     steps++;
  //   }
  //   if (!hasUppercase) {
  //     steps++;
  //   }
  //   if (!hasDigit) {
  //     steps++;
  //   }

  //   // Checking for repeating characters
  //   for (let i = 0; i < length - 2; i++) {
  //     if (
  //       password.charCodeAt(i) === password.charCodeAt(i + 1) &&
  //       password.charCodeAt(i) === password.charCodeAt(i + 2)
  //     ) {
  //       steps++;
  //       break;
  //     }
  //   }

  //   return steps;
  // };

  //-----//
  //-----//
  //-----//
  //-----//
  const newData = new Password({
    password: password,
    stepsRequired: passwordChecker(password),
  });
  try {
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error saving number to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

// const passwordChecker = (password) => {
//   let nummberCount = 1;
//   let uperCaseCount = 1;
//   let lowerCaseCount = 1;
//   let count1 = 0;
//   let count2 = 0;
//   if (/[0-9]/.test(password) === true) {
//     nummberCount = 0;
//   }
//   if (/[a-z]/.test(password) === true) {
//     lowerCaseCount = 0;
//   }
//   if (/[A-Z]/.test(password) === true) {
//     uperCaseCount = 0;
//   }
//   for (let i = 0; i < password.length; i++) {
//     if (
//       password[i] === password[i + 1] &&
//       password[i + 1] === password[i + 2]
//     ) {
//       i += 2;
//       count1 += 1;
//     }
//   }
//   if (password.length < 6) {
//     return (answer = Math.max(
//       lowerCaseCount + uperCaseCount + nummberCount,
//       6 - password.length
//     ));
//   } else if (password.length <= 20) {
//     return (answer = Math.max(
//       lowerCaseCount + uperCaseCount + nummberCount,
//       count1
//     ));
//   } else if (password.length > 20) {
//     password = password.split("");
//     let y = password.length - 20;
//     let x = password.length - 20;
//     let count = 1;
//     let arr1 = [];
//     let arr2 = [];
//     for (let i = 0; i < password.length; i++) {
//       if (password[i] === password[i + 1]) {
//         count += 1;
//       } else {
//         arr1.push(count);
//         arr2.push(count);
//         count = 1;
//       }
//     }
//     let i = 0;
//     while (i < 60 && x > 0) {
//       for (let i = 0; i < arr2.length && x > 0; i++) {
//         if (arr2[i] % 3 === 0 && arr2[i] >= 3) {
//           arr2[i] = arr2[i] - 1;
//           x = x - 1;
//         }
//       }
//       for (let i = 0; i < arr2.length && x > 0; i++) {
//         if (arr2[i] % 3 === 1 && arr2[i] >= 3) {
//           arr2[i] = arr2[i] - 1;
//           x = x - 1;
//         }
//       }
//       for (let i = 0; i < arr2.length && x > 0; i++) {
//         if (arr2[i] % 3 === 2 && arr2[i] >= 3) {
//           arr2[i] = arr2[i] - 1;
//           x = x - 1;
//         }
//       }
//       i++;
//     }
//     for (let i = 0; i < arr2.length; i++) {
//       for (let j = i + 1; j < arr2.length; j++) {
//         if (
//           arr2[i] >= 3 &&
//           arr2[j] >= 3 &&
//           arr2[i] % 3 === 0 &&
//           arr2[j] % 3 === 0 &&
//           arr2[i] !== arr1[i] &&
//           arr2[j] !== arr1[j]
//         ) {
//           arr2[i] -= 1;
//           arr2[j] += 1;
//         } else if (
//           arr2[i] >= 3 &&
//           arr2[j] >= 3 &&
//           arr2[i] % 3 === 0 &&
//           arr2[j] % 3 === 1 &&
//           arr2[i] !== arr1[i] &&
//           arr2[j] !== arr1[j]
//         ) {
//           arr2[i] -= 1;
//           arr2[j] += 1;
//         } else if (
//           arr2[i] >= 3 &&
//           arr2[j] >= 3 &&
//           arr2[i] % 3 === 1 &&
//           arr2[j] % 3 === 0 &&
//           arr2[i] !== arr1[i] &&
//           arr2[j] !== arr1[j]
//         ) {
//           arr2[j] -= 1;
//           arr2[i] += 1;
//         }
//       }
//     }
//     count2 = 0;
//     for (let i = 0; i < arr2.length; i++) {
//       if (arr2[i] >= 3) {
//         arr2[i] -= 3;
//         count2 += 1;
//         i--;
//       }
//     }
//     return (answer =
//       Math.max(lowerCaseCount + uperCaseCount + nummberCount, count2) + y);
//   }
// };
