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
      dirty: false,
    }
  })

function main() {
  const stack = ['shiny gold'];
  let counter = 0;
  while (stack.length) {
    const currentBag = stack.splice(0, 1)[0];
    for (let i = 0; i < inputFormatted.length; i += 1) {
      const bagToCheck = inputFormatted[i];
      if (Object.keys(bagToCheck.values).includes(currentBag) && !bagToCheck.dirty) {
        bagToCheck.dirty = true;
        counter += 1;
        stack.push(bagToCheck.key);
      }
    }
  }
  return counter;
}

console.log(`Result of day7/easy -> ${main()}`);
