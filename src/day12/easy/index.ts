import input from '../input';

type TDirection = 'N' | 'S' | 'E' | 'W';

type TCommand = TDirection | 'F' | 'R' | 'L';

type TMoves = readonly [0, 1] | readonly [0, -1] | readonly [1, 0] | readonly [-1, 0];

type TInput = [TCommand, number];

const inputFormatted = input.split('\n').map<TInput>(el => [el.slice(0,1) as TDirection, Number(el.slice(1))]);

export function main(): number {
  function valueIsDirection(val: TInput):val is [TDirection, number] {
    return ['N', 'E', 'S', 'W'].includes(val[0]);
  }

  function valueIsForward(val: TInput):val is ['F', number] {
    return val[0] === 'F';
  }

  function valueIsTurn(val: TInput):val is ['R' | 'L', 90 | 180 | 270] {
    return ['R', 'L'].includes(val[0]);
  }

  function getAmountOfMoves (amount: 90 | 180 | 270): 1 | 2 | 3 {
    return amount / 90 as 1 | 2 | 3;
  }

  const state: {
    pos: [number, number],
    direction: TDirection,
  } = {
    pos: [0, 0],
    direction: 'E',
  };

  const map: { [key in TDirection]: TMoves } = {
    N: [-1, 0],
    S: [1, 0],
    E: [0, 1],
    W: [0, -1],
  };

  const rotations: { [key in TDirection]: { 'R': TDirection, 'L': TDirection } } ={
    N: {
      R: 'E',
      L: 'W',
    },
    S: {
      R: 'W',
      L: 'E',
    },
    W: {
      R: 'N',
      L: 'S',
    },
    E: {
      R: 'S',
      L: 'N',
    },
  };

  inputFormatted.forEach((command) => {
    if (valueIsDirection(command)) {
      const move = [...map[command[0]]];
      const amount = command[1];
      state.pos[0] = state.pos[0] + move[0] * amount;
      state.pos[1] = state.pos[1] + move[1] * amount;
    }

    if (valueIsForward(command)) {
      const move = [...map[state.direction]];
      const amount = command[1];
      state.pos[0] = state.pos[0] + move[0] * amount;
      state.pos[1] = state.pos[1] + move[1] * amount;
    }

    if (valueIsTurn(command)) {
      const move = command[0];
      const amount = getAmountOfMoves(command[1]);
      for (let i = 0; i < amount; i += 1) {
        state.direction = rotations[state.direction][move];
      }
    }
  });

  return Math.abs(state.pos[0]) + Math.abs(state.pos[1]);
}

console.log(`Result of day12/easy -> ${main()}`);
