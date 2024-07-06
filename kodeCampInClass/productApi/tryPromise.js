// // const doSomething = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     return reject("Hello world");
// //   }, 5000);
// // });

// // console.log(doSomething);

// // doSomething
// //   .then((val) => {
// //     console.log("Value", val);
// //     console.log(doSomething);
// //   })
// //   .catch((err) => {
// //     console.log("Error", err);
// //   });

// const isNumberEven = (num) => {
//   return new Promise((resolve, reject) => {
//     if (num % 2 == 0) {
//       resolve("Yes, its even", num);
//     } else {
//       reject("No its not even", num);
//     }
//   });
// };

// // isNumberEven(18)
// //   .then(
// //     (val) => val + " Yayy"
// //     // console.log("The result :", val);
// //   )
// //   .then((v) => {
// //     console.log(v);
// //   })
// //   .catch((err) => {
// //     console.log("There is a problem Error:", err);
// //   })
// //   .finally(() => console.log("Done"));

// async function executivePromise() {
//   try {
//     const result = await isNumberEven(19);
//     console.log(result);
//   } catch (error) {
//     console.log("There is a problem Error:", error);
//   } finally {
//     console.log("Done");
//   }
// }

// executivePromise();
