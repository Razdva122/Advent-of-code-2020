import input from './input';

const inputFormated = input.split('\n').map((el) => {
  const [amount, letterInput, pass] = el.split(' ');
  const [letter] = letterInput.split('');
  const [min, max] = amount.split('-');
  return {
    amount: {
      min,
      max,
    },
    letter,
    pass,
  }
})

function main(): number {
  return inputFormated.reduce((acc, el) => {
    const amountOfValidLetters = el.pass.split('').filter((letter) => letter === el.letter).length;
    if (amountOfValidLetters >= Number(el.amount.min) && amountOfValidLetters <= Number(el.amount.max)) {
      acc += 1;
    }
    return acc;
  }, 0);
}

console.log(`Result of day2/easy -> ${main()}`);
