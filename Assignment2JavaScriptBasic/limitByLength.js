// function limitByLength(str) {
//   if (str.length <= 100) {
//     return str;
//   } else {
//     return str.slice(0, 100) + "...";
//   }
// }

function limitByLength(str) {
  return str.length <= 100 ? str : str.slice(0, 100) + "...";
}

console.log(
  limitByLength(
    "ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat"
  )
);
