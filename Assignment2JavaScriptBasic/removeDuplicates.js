let Arr = ["DS", "Algo", "OS", "HTML", "DS", "OS", "Java", "HTML", "Algo"];

let outputArray = [];

function removeDuplicates(arr) {
  let outputArray = Array.from(new Set(arr));
  return outputArray;
}

console.log(removeDuplicates(Arr));
