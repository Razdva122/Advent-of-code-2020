import input from '../input';

const inputFormatted = input.split('\n\n').map((el) => el.split('\n').slice(1));

function solveGame(firstPlayer: string[], secondPlayer: string[], level: number = 1): 'first' | 'second' {
  const memory: { [key: string]: true } = {};

  while (firstPlayer.length && secondPlayer.length) {
    if (memory[`${firstPlayer.join()}|${secondPlayer.join()}`]) {
      return 'first';
    }
    memory[`${firstPlayer.join()}|${secondPlayer.join()}`] = true;
    const first = firstPlayer.splice(0, 1)[0];
    const second = secondPlayer.splice(0, 1)[0];
    if (Number(first) <= firstPlayer.length && Number(second) <= secondPlayer.length) {
      const reqGame = solveGame(firstPlayer.slice(0, Number(first)), secondPlayer.slice(0, Number(second)), level + 1);
      if (reqGame === 'first') {
        firstPlayer.push(first, second);
      } else {
        secondPlayer.push(second, first);
      }
    } else {
      if (Number(second) > Number(first)) {
        secondPlayer.push(second, first);
      } else {
        firstPlayer.push(first, second);
      }
    }
  }
  return firstPlayer.length > secondPlayer.length ? 'first' : 'second';
}

export function main(): number {
  solveGame(inputFormatted[0], inputFormatted[1]);
  if (inputFormatted[0].length) {
    return inputFormatted[0].reduce((acc, item, index, arr) => {
      acc += Number(item) * (arr.length - index);
      return acc;
    }, 0);
  } else {
    return inputFormatted[1].reduce((acc, item, index, arr) => {
      acc += Number(item) * (arr.length - index);
      return acc;
    }, 0);
  }
}

console.log(`Result of day22/hard -> ${main()}`);
