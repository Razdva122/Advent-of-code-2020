import input from '../input';

interface ILevel {
  start: number,
  loop: number,
}

const inputFormatted = input.split('\n');

const schedule = inputFormatted[1].split(',');

const inputData = schedule
  .map((el, index) => ({
    ID: el,
    index,
  }))
  .filter((el) => el.ID !== 'x');


function solveLevel(prevLevel: ILevel, input: typeof inputData): ILevel {
  const currentLevel: Partial<ILevel> = {};
  let currentTimeStamp = prevLevel.start;
  while (!currentLevel.loop) {
    const isValidTimeStamp = input.every((el) => (currentTimeStamp + el.index) % Number(el.ID) === 0);

    if (isValidTimeStamp) {
      if (!currentLevel.start) {
        currentLevel.start = currentTimeStamp;
      } else {
        currentLevel.loop = currentTimeStamp - currentLevel.start;
      }
    }

    currentTimeStamp += prevLevel.loop;
  }

  return currentLevel as ILevel;
}

export function main(): number {
  const state = {
    prevLevel: {
      start: 0,
      loop: 1,
    },
    input: inputData.slice(0,1),
  };

  for (let i = 0; i < inputData.length + 1; i += 1) {
    state.input = inputData.slice(0, i);
    state.prevLevel = solveLevel(state.prevLevel, state.input);
  }

  return state.prevLevel.start;
}

console.log(`Result of day13/hard -> ${main()}`);
