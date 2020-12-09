import input from '../input';

const inputFormatted = input.split('\n').map(Number);

export function main(sliceAmount: number): number {
  for (let i = sliceAmount; i < inputFormatted.length; i += 1) {
    const currentNumber = inputFormatted[i];
    const sliceToCheck = inputFormatted.slice(i - sliceAmount, i);
    if (!sliceToCheck.some(el => sliceToCheck.includes(currentNumber - el))) {
      return currentNumber;
    }
  }
  return 0;
}

console.log(`Result of day9/easy -> ${main(25)}`);
