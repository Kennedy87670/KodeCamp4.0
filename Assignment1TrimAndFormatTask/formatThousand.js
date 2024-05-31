function formatThousand(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const two = formatThousand(120986);
console.log(two);
