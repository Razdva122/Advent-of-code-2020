import input from './input';

const formatedInput = input.split('\n').map((el) => el.split(''));

function main(): number {
  const cases = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  return cases.reduce((acc, el) => countTrees(el) * acc, 1);
}

function countTrees({ x, y }: { x: number, y: number }): number {
  const height = formatedInput.length;
  const width = formatedInput[0].length;
  const position = {
    x: 0,
    y: 0,
  };
  let counter = 0;
  while (position.y < height) {
    counter += formatedInput[position.y][position.x] === '#' ? 1 : 0;
    position.x += x;
    position.y += y;
    if (position.x >= width) {
      position.x = position.x - width;
    }
  }
  return counter;
}

console.log(`Result of day3/hard -> ${main()}`);
