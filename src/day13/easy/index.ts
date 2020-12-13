import input from '../input';

const inputFormatted = input.split('\n');

const inputData = {
  timeStamp: Number(inputFormatted[0]),
  IDs: inputFormatted[1].split(',').filter((el) => el !== 'x').map(Number),
};

export function main(): number {
  const state: { ID: null | number, time: number } = {
    ID: null,
    time: inputData.timeStamp - 1,
  };
  while (!state.ID) {
    state.time += 1;

    for (let i = 0; i < inputData.IDs.length; i += 1) {
      const busID = inputData.IDs[i]; 
      if (state.time % busID === 0) {
        state.ID = busID;
        break;
      }
    }
  }

  return state.ID * (state.time - inputData.timeStamp);
}

console.log(`Result of day13/easy -> ${main()}`);
