import input from '../input';

type TValues = '.' | '#' | 'L';

type TInput = TValues[][];

const inputFormatted = input.split('\n').map((el) => el.split('')) as TInput;

export function main(): number {
  let currentState = [...inputFormatted];
  let someIsChanged = true;

  while(someIsChanged) {
    someIsChanged = false;
    const copyOfCurrentState = [...currentState].map((el) => [...el]);
    for (let x = 0; x < inputFormatted.length; x += 1) {
      for (let y = 0; y < inputFormatted[0].length; y += 1) {
        const res = getNewState(x, y, currentState);
        if (res.changed) {
          someIsChanged = true;
        }
        copyOfCurrentState[x][y] = res.newValue;
      }
    }
    currentState = copyOfCurrentState;
  }

  let counter = 0;
  for (let x = 0; x < inputFormatted.length; x += 1) {
    for (let y = 0; y < inputFormatted[0].length; y += 1) {
      if (currentState[x][y] === '#') {
        counter += 1;
      }
    }
  }
  return counter;
}

function getNewState(x: number, y: number, map: TInput): { changed: boolean, newValue: TValues } {
  const directions = [[0, 1], [0, -1], [1, 0], [1, 1], [1, -1], [-1, 0], [-1, 1], [-1, -1]];
  const state = map[x][y];
  const amountOfOcuppied = directions.reduce((acc, el) => {
    if (getPointOfMap(x + el[0], y + el[1], map) === '#') {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (state === '.') {
    return {
      changed: false,
      newValue: '.',
    }
  } 

  if (state === '#') {
    if (amountOfOcuppied >= 4) {
      return {
        changed: true,
        newValue: 'L',
      }
    } else {
      return {
        changed: false,
        newValue: '#',
      }
    }
  }

  if (amountOfOcuppied === 0) {
    return {
      changed: true,
      newValue: '#',
    }
  } else {
    return {
      changed: false,
      newValue: 'L',
    }
  }
}

function getPointOfMap(x: number, y: number, map: TInput): '.' | '#' | 'L' | undefined {
  if (map[x]) {
    return map[x][y];
  }
  return undefined;
}

console.log(`Result of day11/easy -> ${main()}`);
