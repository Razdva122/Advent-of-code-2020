import input from '../input';

const inputFormated = input.split('\n').map((el) => {
  const rowValue = el.slice(0, el.length - 3).split('');
  const columnValue = el.slice(el.length - 3).split('');
  return {
    row: parseInt(rowValue.map((letter) => {
      return letter === 'F' ? 0 : 1;
    }).join(''), 2),
    column: parseInt(columnValue.map((letter) => {
      return letter === 'L' ? 0 : 1;
    }).join(''), 2),
  }
});
 
function main() {
  const sortedSeats = inputFormated.reduce<number[]>((acc, el) => {
    const smth = el.row * 8 + el.column;
    acc.push(smth);
    return acc;
  }, []).sort((a, b) => b - a);

  return sortedSeats[0];
}

console.log(`Result of day5/easy -> ${main()}`);
