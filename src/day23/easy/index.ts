import input from '../input';

const inputFormatted = input.split('').map(Number);

function spliceThree(arr: number[], index: number): { spliced: number[], left: number[] } {
  if (index <= arr.length - 3) {
    return {
      spliced: arr.splice(index, 3),
      left: arr,
    }
  } else {
    const amountToStartSplice = 3 - (arr.length - index);
    const startSpliced = arr.splice(0, amountToStartSplice);
    const spliced = [...arr.splice(index - amountToStartSplice, 3), ...startSpliced];
    return {
      spliced,
      left: arr,
    }
  }
}

export function main(): string {
  let currentState = [...inputFormatted];
  let currentCupPos = 0;
  for (let i = 0; i < 100; i += 1) {
    const pickedCup = currentState[currentCupPos];
    const indexOfPickedCup = currentState.findIndex((el) => el === pickedCup);
    const res = spliceThree(currentState, indexOfPickedCup + 1);
    let needToFind = pickedCup - 1;
    let destinationCup: undefined | number = undefined;
    while (needToFind > 0 && !destinationCup) {
      destinationCup = res.left.find((el) => el === needToFind);
      needToFind -= 1;
    }
    if (!destinationCup) {
      destinationCup = Math.max(...res.left);
    }
    const destinationIndex = res.left.findIndex((el) => el === destinationCup);
    res.left.splice(destinationIndex + 1, 0, ...res.spliced);
    currentState = [...res.left];
    currentCupPos = currentState.findIndex((el) => el === pickedCup);
    currentCupPos += 1;
    if (currentCupPos === currentState.length) {
      currentCupPos = 0;
    }
  }
  const result = [...currentState.splice(currentState.findIndex((el) => el === 1)), ...currentState].slice(1);
  return result.join('');
}

console.log(`Result of day23/easy -> ${main()}`);
