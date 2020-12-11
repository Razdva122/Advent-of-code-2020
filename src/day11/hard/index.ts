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
  const directions: [number, number][] = [[0, 1], [0, -1], [1, 0], [1, 1], [1, -1], [-1, 0], [-1, 1], [-1, -1]];
  const state = map[x][y];
  const amountOfOcuppied = directions.reduce((acc, direction) => {
    if (getSitInDirection(x, y, direction, map) === '#') {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (state === '.') {
    return {
      changed: false,
      newValue: '.',
    }
  } else if (state === '#') {
    if (amountOfOcuppied >= 5) {
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

function getSitInDirection(x: number, y: number, diff: [number, number], map: TInput): '.' | '#' | 'L' | undefined {
  let currentX = x + diff[0];
  let currentY = y + diff[1];
  let el = getPointOfMap(currentX, currentY, map);
  while (el === '.') {
    currentX += diff[0];
    currentY += diff[1];
    el = getPointOfMap(currentX, currentY, map);
  }
  return el;
}

console.log(`Result of day11/hard -> ${main()}`);
