import input from '../input';

const inputFormatted = input.split(',').map(Number);

export function main(counter: number): any {
  const arrSimulator = {
    acc: {
      lastItem: inputFormatted[inputFormatted.length - 1],
      length: inputFormatted.length,
    },
  }

  function pushInSim(value: number): void {
    arrSimulator.acc.lastItem = value;
    arrSimulator.acc.length += 1;
  }

  function getLengthSim(): number {
    return arrSimulator.acc.length;
  }

  function getLastItemSim(): number {
    return arrSimulator.acc.lastItem
  }

  const memory = inputFormatted.slice(0, inputFormatted.length - 1).reduce<{[key: string]: number}>((acc, el, index) => {
    acc[el] = index;
    return acc;
  }, {});

  while (arrSimulator.acc.length < counter) {
    const lastNum = getLastItemSim();
    if (memory[lastNum] === undefined) {
      memory[lastNum] = getLengthSim() - 1;
      pushInSim(0);
    } else {
      const lastTurn = memory[lastNum];
      const currentTurn = getLengthSim() - 1;;
      memory[lastNum] = getLengthSim() - 1;
      pushInSim(currentTurn - lastTurn);
    }

    if (arrSimulator.acc.length % 1000000 === 0) {
      console.log(`Solved ${(arrSimulator.acc.length / counter * 100).toFixed(4)} %`);
    }
  }
  return getLastItemSim();
}

console.log(`Result of day15/hard -> ${main(30000000)}`);
