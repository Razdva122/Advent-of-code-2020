import input from '../input';

type TDirections = 'e' | 'se' | 'sw' | 'w' | 'nw' | 'ne';

const inputFormatted = input.split('\n').map((el) => {
  const elements: TDirections[]= [];
  const letters = el.split('');
  for (let i = 0; i < letters.length; i += 1) {
    if (letters[i] === 's' || letters[i] === 'n') {
      if (letters[i + 1] === 'e' || letters[i + 1] === 'w' ) {
        elements.push(`${letters[i]}${letters[i + 1]}` as TDirections);
        i += 1;
      }
    } else {
      elements.push(letters[i] as TDirections);
    }
  }
  return elements;
});

const moves: { [key in TDirections]: [number, number] }= {
  e: [1,0],
  se: [0,1],
  sw: [-1,1],
  w: [-1,0],
  nw: [0, -1],
  ne: [1, -1],
};

function main(): number {
  const black: { [key: string]: true} = {};
  inputFormatted.forEach((line) => {
    const position = [0, 0];
    for (let i = 0; i < line.length; i += 1) {
      const move = line[i];
      position[0] = position[0] + moves[move][0];
      position[1] = position[1] + moves[move][1];
    }
    if (black[position.join()]) {
      delete black[position.join()];
    } else {
      black[position.join()] = true;
    }
  });
  return Object.keys(black).length;
}

console.log(`Result of day24/easy -> ${main()}`);
