function palindrome(str) {
  let rev = str.split("").reverse().join("");

  if (rev == str) {
    return true;
  }
  return false;
}

let str1 = "racecar";
let str2 = "nitin";
let str3 = "Rama";

console.log(palindrome(str1));
console.log(palindrome(str2));
console.log(palindrome(str3));
