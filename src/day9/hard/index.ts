import input from '../input';

import { main as easyLevel } from '../easy';

const inputFormatted = input.split('\n').map(Number);

function main(inp: number): number {
  for (let i = 0; i < inputFormatted.length; i += 1) {
    let acc = inputFormatted[i];
    let j = i + 1;
    while (acc < inp) {
      acc += inputFormatted[j];
      j += 1;
    }
    if (acc === inp) {
      const slice = inputFormatted.slice(i, j);
      if (slice.length > 1) {
        slice.sort((a, b) => a - b);
        return slice[0] + slice[slice.length - 1];
      }
    }
  }
  return 0;
}

console.log(`Result of day9/hard -> ${main(easyLevel(25))}`);
