import input from '../input';

const inputFormatted = input.split('\n\n').map((question) => {
  const answers = question.split('\n');
  const resultOfAnswers = answers.reduce<{ [key: string]: true }>((acc, el) => { 
    const letters = el.split('');
    for (let i = 0; i < letters.length; i += 1) {
      acc[letters[i]] = true;
    }
    return acc;
  }, {});
  return resultOfAnswers;
})

function main() {
  const counter = inputFormatted.reduce((acc, el) => {
    acc += Object.keys(el).length;
    return acc;
  }, 0);
  return counter;
}

console.log(`Result of day6/easy -> ${main()}`);
