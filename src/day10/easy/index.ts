import input from '../input';

const inputFormatted = [
  0, 
  ...input.split('\n')
    .map(Number)
    .sort((a, b) => a - b)
];

export function main(): any {
  const diffs = {
    1: 0,
    2: 0,
    3: 1,
  }
  for (let i = 0; i < inputFormatted.length - 1; i += 1) {
    const firstEl = inputFormatted[i];
    const secondEl = inputFormatted[i + 1];
    const diffWithNext = secondEl - firstEl as 1 | 2 | 3;
    diffs[diffWithNext] += 1;
  }
  return diffs[1] * diffs[3];
}


console.log(`Result of day10/easy -> ${main()}`);
