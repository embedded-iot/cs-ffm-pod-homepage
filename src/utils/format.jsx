
function formatCurrency(number = 0, unit = " $", isFloat = true) {
  const num = Math.abs(number);
  var p = num.toString().split(".");
  return `${number < 0 ? '-' : ''}` + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
    return num + (num !== "-" && i && !(i % 3) ? "," : "") + acc;
  }, "") + (isFloat && p[1] !== undefined ? `.${p[1]}` : '') + `${unit}`;
}

export {
  formatCurrency
}
