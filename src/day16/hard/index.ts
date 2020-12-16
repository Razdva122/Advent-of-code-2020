import input from '../input';

type TElFromArray<T extends Array<any>> = T[number];

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

inputData.anotherTickets = inputData.anotherTickets.filter((ticket) => {
  const someValueIsInvalid = ticket.some((value: number) => {
    return !inputData.keys.some((rule) => {
      return inRange(value, rule.value1.min, rule.value1.max) || inRange(value, rule.value2.min, rule.value2.max)
    })
  });
  return !someValueIsInvalid;
});

const allTickets = [inputData.myTickets, ...inputData.anotherTickets];

function main(): number {
  const realArray: TElFromArray<typeof inputData.keys>[] = [];
  const needToFind = [...inputData.keys];
  const amountOfValuesInTicket = inputData.myTickets.length;

  while (needToFind.length) {
    for (let i = 0; i < amountOfValuesInTicket; i += 1) {
      let possibleSolutions = [...needToFind];
      for (let j = 0; j < allTickets.length; j += 1) {
        const elToCheck = allTickets[j][i];
        possibleSolutions = possibleSolutions.filter((solution) => {
          return inRange(elToCheck, solution.value1.min, solution.value1.max) || inRange(elToCheck, solution.value2.min, solution.value2.max);
        });
      }

      if (possibleSolutions.length === 1) {
        const index = needToFind.findIndex((el) => el.type === possibleSolutions[0].type);
        realArray[i] = possibleSolutions[0];
        needToFind.splice(index, 1);
      }
    }
  }

  const result = realArray.reduce((acc, el, index) => {
    if (el.type.startsWith('departure')) {
      acc *= inputData.myTickets[index];
    }
    return acc;
  }, 1);

  return result;
}

function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

console.log(`Result of day16/hard -> ${main()}`);
