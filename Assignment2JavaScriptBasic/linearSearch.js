function linearSearch(arr, str) {
  let found = false;
  arr.forEach((ele) => {
    if (ele === str) {
      found = true;
    }
  });

  return found
    ? "Yes, the string exists in the array"
    : "No, the string does not exist in the array";
}

let str = ["abc", "def", "ghi", "jkl", "mno"];
let value = "abc";
let value1 = "ghi";
let value2 = "xyz";

console.log(linearSearch(str, value));
console.log(linearSearch(str, value1));
console.log(linearSearch(str, value2));
