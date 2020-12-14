import input from '../input';

const inputFormatted = input
  .split('mask')
  .slice(1)
  .map((el) => {
    let strings = el.split('\n').filter(Boolean);
    return {
      mask: strings[0].split(' ')[2],
      values: strings.slice(1).map((string) => {
        const [pointer, _, value] = string.split(' ');
        return {
          key: pointer.slice(4, pointer.length - 1),
          value,
        }
      })
    }
  });

const maskLength = 36;

function applyMask(mask: string, value: string): string {
  let result = '';
  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === 'X') {
      result += value[i];
    } else {
      result += mask[i];
    }
  }

  return result;
}

function numberToMaskFormat(number: string): string {
  const binaryNumber = Number(number).toString(2);
  return '0'.repeat(maskLength - binaryNumber.length) + binaryNumber;
}

export function main(): any {
  const result = inputFormatted.reduce<{[key: string]: string}>((acc, part) => {
    part.values.forEach((el) => {
      acc[el.key] = applyMask(part.mask, numberToMaskFormat(el.value));
    });
    return acc;
  }, {});

  return Object.values(result).reduce((res, item) => {
    return res + parseInt(item, 2);
  }, 0);
}

console.log(`Result of day14/easy -> ${main()}`);
