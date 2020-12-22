import input from '../input';

const inputFormatted = input.split('\n\n').map((el) => el.split('\n').slice(1));

export function main(): number {
  let number = 1;
  while (inputFormatted[0].length && inputFormatted[1].length) {
    number += 1;
    const first = inputFormatted[0].splice(0, 1)[0];
    const second = inputFormatted[1].splice(0, 1)[0];
    if (Number(second) > Number(first)) {
      inputFormatted[1].push(second, first);
    } else {
      inputFormatted[0].push(first, second);
    }
  }
  console.log(inputFormatted[0], inputFormatted[1]);
  if (inputFormatted[0].length) {
    return inputFormatted[0].reduce((acc, item, index, arr) => {
      acc += Number(item) * (arr.length - index);
      return acc;
    }, 0);
  } else {
    return inputFormatted[1].reduce((acc, item, index, arr) => {
      acc += Number(item) * (arr.length - index);
      return acc;
    }, 0);
  }
}

console.log(`Result of day22/easy -> ${main()}`);
