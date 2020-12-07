import input from '../input';

const inputFormatted = input.split('\n')
  .filter((el) => !el.includes('no other bags'))
  .map((el) => {
    const keys = el.split(' ');
    const [firstWord, secondWord] = keys.splice(0, 4);
    const values: { [key: string]: number } = {};
    while (keys.length) {
      const [count, valueWordOne, valueWordTwo] = keys.splice(0, 4);
      values[`${valueWordOne} ${valueWordTwo}`] = Number(count);
    }
    return {
      key: `${firstWord} ${secondWord}`,
      values,
    }
  })

function main() {
  const stack = [{ key: 'shiny gold', amount: 1 }];
  // dont count shiny itself
  let counter = -1;
  while (stack.length) {
    const currentBag = stack.splice(0, 1)[0];
    counter += currentBag.amount;

    const bagToCheck = inputFormatted.find((bag) => bag.key === currentBag.key);
    if (bagToCheck) {
      stack.push(...Object.entries(bagToCheck.values).map(([key, value]) => ({
        key,
        amount: value * currentBag.amount,
      })));
    }
  }
  return counter;
}

console.log(`Result of day7/hard -> ${main()}`);
