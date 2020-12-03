import input from './input';

const formatedInput = input.split('\n').map((el) => el.split(''));

function main(): number {
  const height = formatedInput.length;
  const width = formatedInput[0].length;
  const position = {
    x: 0,
    y: 0,
  };
  let counter = 0;
  while (position.y < height) {
    counter += formatedInput[position.y][position.x] === '#' ? 1 : 0;
    position.x += 3;
    position.y += 1;
    if (position.x >= width) {
      position.x = position.x - width;
    }
  }
  return counter;
}

console.log(`Result of day3/easy -> ${main()}`);
