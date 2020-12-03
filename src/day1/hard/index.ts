import input from '../input';

function main(): number {
  const year = 2020;
  const parsedInput = input.split('\n');
  const memory = parsedInput.reduce<{ [key: string]: true }>((acc, el) => {
    acc[el] = true;
    return acc;
  }, {});

  const result = parsedInput.reduce<{ solved: boolean, values: [number, number, number] }>((acc, el) => {
    if (acc.solved) {
      return acc;
    }
    for (let i = 0; i < parsedInput.length; i += 1) {
      if (memory[year - Number(el) - Number(parsedInput[i])]) {
        acc = {
          solved: true,
          values: [year - Number(el) - Number(parsedInput[i]), Number(el), Number(parsedInput[i])],
        };
      }
    }
    return acc;
  }, { solved: false, values: [0, 0, 0] });

  return result.values[0] * result.values[1] * result.values[2];
}

console.log(`Result of day1/hard -> ${main()}`);
