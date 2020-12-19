import input from '../input';

const inputFormatted = input.split('\n\n');

const inputData = {
  rules: inputFormatted[0].split('\n').reduce<Array<string>>((acc, el) => {
    const [key, value] = el.split(': ');
    acc[Number(key)] = value;
    return acc;
  }, []),
  messages: inputFormatted[1].split('\n'),
}

function solveRegExp(input: string): string {
  if (input === '"a"') {
    return 'a';
  }
  if (input === '"b"') {
    return 'b';
  }
  let result = '';
  const ways = input.split(' | ');
  ways.forEach((way, index) => {
    if (index === 1) {
      result += '|';
    }
    if (ways.length === 2 && index === 0) {
      result += '(';
    }
    way.split(' ').forEach((el) => {
      result += solveRegExp(inputData.rules[Number(el)]);
    });
    if (ways.length === 2 && index === 1) {
      result += ')';
    }
  })
  return result;
}

function main(): number {
  const regExp = new RegExp(`^${solveRegExp(inputData.rules[0])}$`);
  const res = inputData.messages.reduce((acc, el) => {
    if (el.match(regExp)) {
      acc += 1;
    }
    return acc;
  }, 0);
  return res;
}

console.log(`Result of day19/easy -> ${main()}`);
