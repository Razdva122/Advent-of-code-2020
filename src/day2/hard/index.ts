import input from '../input';

const inputFormated = input.split('\n').map((el) => {
  const [amount, letterInput, pass] = el.split(' ');
  const [letter] = letterInput.split('');
  const [first, second] = amount.split('-');
  return {
    pos: {
      first: Number(first) - 1,
      second: Number(second) - 1,
    },
    letter,
    pass,
  }
})

function main(): number {
  return inputFormated.reduce((acc, el) => {
    let amountOfCheckedLetters = 0;
    if (el.pass[el.pos.first] === el.letter) {
      amountOfCheckedLetters += 1;
    }

    if (el.pass[el.pos.second] === el.letter) {
      amountOfCheckedLetters += 1;
    }
    
    if (amountOfCheckedLetters === 1) {
      acc += 1;
    }
    return acc;
  }, 0);
}

console.log(`Result of day2/hard -> ${main()}`);
