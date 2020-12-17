import input from '../input';

const inputFormatted = input.split('\n').map((el) => el.split(''));
const amountOfLevels = 6;

const size = {
  x: inputFormatted.length + amountOfLevels * 2,
  y: inputFormatted.length + amountOfLevels * 2,
  z: 1 + amountOfLevels * 2,
}

const startPoints = {
  x: Math.floor(size.x / 2),
  y: Math.floor(size.y / 2),
  z: Math.floor(size.z / 2),
};

const inputFormattedStartPoints = {
  z: startPoints.z,
  y: startPoints.y - (inputFormatted.length / 2),
  x: startPoints.x - (inputFormatted[0].length / 2),
}

// x, y, z
const field: ('.' | '#')[][][] = new Array(size.z)
  .fill(null)
  .map((_) => new Array(size.x)
    .fill(null)
    .map((_2) => new Array(size.y)
      .fill('.')));

inputFormatted.forEach((y, indexY) => {
  y.forEach((x, indexX) => {
    field[inputFormattedStartPoints.z][inputFormattedStartPoints.x + indexX][inputFormattedStartPoints.y + indexY] = x as '.' | '#';
  })
});

function getElement(map: typeof field, z: number, x: number, y: number): '.' | '#' | undefined {
  if (map[z] && map[z][x]) {
    return map[z][x][y];
  }
}

function cloneMap(map: typeof field): typeof field {
  return JSON.parse(JSON.stringify(map));
}

function getNeighborsAmount(map: typeof field, z: number, x: number, y: number): number {
  const possibleMoves: [number, number, number][] = [];
  for (let i = -1; i < 2; i += 1) {
    for (let j = -1; j < 2; j += 1) {
      for (let k = -1; k < 2; k += 1) {
        if (i === 0 && j === 0 && k === 0) {
          // skip init
        } else {
          possibleMoves.push([i, j, k]);
        }
      }
    }
  }

  return possibleMoves.reduce((acc, el) => {
    if (getElement(map, z + el[0], x + el[1], y + el[2]) === '#') {
      acc += 1;
    }
    return acc;
  }, 0);
}

export function main(): number {
  let currentMap = field;
  for (let i = 0; i < amountOfLevels; i += 1) {
    const mapClone = cloneMap(field);
    currentMap.forEach((z, indexZ) => {
      z.forEach((x, indexX) => {
        x.forEach((y, indexY) => {
          const amountOfNeigbors = getNeighborsAmount(currentMap, indexZ, indexX, indexY);
          if (y === '#') {
            mapClone[indexZ][indexX][indexY] = amountOfNeigbors === 2 || amountOfNeigbors === 3 ? '#' : '.';
          } else {
            mapClone[indexZ][indexX][indexY] = amountOfNeigbors === 3 ? '#' : '.';
          }
        })
      })
    })
    currentMap = mapClone;
  }

  let amount = 0;

  currentMap.forEach((z) => {
    z.forEach((x) => {
      x.forEach((y) => {
        if (y === '#') {
          amount += 1;
        }
      })
    })
  })

  return amount;
}

console.log(`Result of day17/easy -> ${main()}`);
