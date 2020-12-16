import input from '../input';

const inputFormatted = input.split('\n\n');

const inputData = {
  keys: inputFormatted[0].split('\n').map((el) => {
    const [type, value] = el.split(':');
  
    const [_, val1, _2, val2] = value.split(' ');
  
    return {
      type,
      value1: {
        min: Number(val1.split('-')[0]),
        max: Number(val1.split('-')[1]),
      },
      value2: {
        min: Number(val2.split('-')[0]),
        max: Number(val2.split('-')[1]),
      }
    }
  }),
  myTickets: inputFormatted[1].split('\n')[1].split(',').map(Number),
  anotherTickets: inputFormatted[2].split('\n').slice(1).map((el) => el.split(',').map(Number)),
};

export function main(): number {
  return inputData.anotherTickets.reduce((acc, ticket) => {
    ticket.forEach((value) => {
      if (!inputData.keys.some((key) => inRange(value, key.value1.min, key.value1.max) || inRange(value, key.value2.min, key.value2.max))) {
        acc += value;
      }
    });
    return acc;
  }, 0);
}

function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

console.log(`Result of day16/easy -> ${main()}`);
