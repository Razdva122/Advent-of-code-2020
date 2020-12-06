import input from '../input';

const inputFormatted = input.split('\n\n').map((question) => {
  const answers = question.split('\n');
  const resultOfAnswers = answers.reduce<{ questions: { [key: string]: number }, counter: number }>((acc, el) => { 
    acc.counter += 1;
    const letters = el.split('');
    for (let i = 0; i < letters.length; i += 1) {
      acc.questions[letters[i]] = acc.questions[letters[i]] || 0;
      acc.questions[letters[i]] += 1;
    }
    return acc;
  }, {
    questions: {},
    counter: 0,
  });
  return resultOfAnswers;
})

function main() {
  const counter = inputFormatted.reduce((acc, el) => {
    acc += Object.values(el.questions).filter((val) => val === el.counter).length;
    return acc;
  }, 0);
  return counter;
}

console.log(`Result of day6/hard -> ${main()}`);
