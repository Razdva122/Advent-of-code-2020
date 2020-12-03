import input from '../input';

function main(): number {
  const year = 2020;
  const parsedInput = input.split('\n');
  const memory = parsedInput.reduce<{ [key: string]: true }>((acc, el) => {
    acc[el] = true;
    return acc;
  }, {});

  const firstNumber = Number(parsedInput.find((el) => {
    return memory[year - Number(el)];
  }));

  return firstNumber * (2020 - firstNumber);
}

console.log(`Result of day1/easy -> ${main()}`);
