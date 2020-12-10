import input from '../input';

const inputFormatted = [
  {
    number: 0,
    paths: 1
  },
  ...input.split('\n')
    .map(Number)
    .sort((a, b) => a - b)
    .map((el) => {
      return {
        number: el,
        paths: 0,
      }
    })
];

inputFormatted[0].paths = 1;

export function main(): number {
  const hashMap = inputFormatted.reduce<{[key: number]: { number: number, paths: number }}>((acc, el) => {
    acc[el.number] = el;
    return acc;
  }, {});

  for (let i = 0; i < inputFormatted.length; i += 1) {
    const numberToCheck = inputFormatted[i];
    const differences = [1, 2, 3];

    differences.forEach((diff) => {
      const el = hashMap[numberToCheck.number - diff];
      if (el) {
        numberToCheck.paths += el.paths;
      }
    });
  }

  return inputFormatted[inputFormatted.length - 1].paths;
}

console.log(`Result of day10/hard -> ${main()}`);
