function formatName(x) {
  // Trim the input to remove any leading or trailing whitespace
  const trimWords = x.trim();

  // Split the trimmed string into an array of words
  const splitWords = trimWords.split(" ");

  // Iterate through each word in the array
  for (let index = 0; index < splitWords.length; index++) {
    // Capitalize the first letter and combine it with the rest of the word
    splitWords[index] =
      splitWords[index][0].toUpperCase() +
      splitWords[index].slice(1).toLowerCase();
  }

  // Join the modified array of words back into a string
  return splitWords.join(" ");
}

// Example usage
console.log(formatName("  john doe  ")); // Output: "John Doe"
console.log(formatName("alice IN WONDERLAND")); // Output: "Alice In Wonderland"
