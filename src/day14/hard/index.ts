import input from '../input';

const inputFormatted = input
  .split('mask')
  .slice(1)
  .map((el) => {
    const strings = el.split('\n').filter(Boolean);
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

function applyMask(mask: string, value: string): string[] {
  const results = [''];
  for (let i = 0; i < mask.length; i += 1) {
    results.forEach((el, index) => {
      if (mask[i] === '0') {
        results[index] = results[index] + value[i];
      } else if (mask[i] === '1') {
        results[index] = results[index] + '1';
      } else {
        const prev = results[index];
        results[index] = prev + '1';
        results.push(prev + '0');
      }
    });
  }
  return results;
}

function numberToMaskFormat(number: string): string {
  const binaryNumber = Number(number).toString(2);
  return '0'.repeat(maskLength - binaryNumber.length) + binaryNumber;
}

export function main(): any {
  const result = inputFormatted.reduce<{[key: string]: string}>((acc, part) => {
    part.values.forEach((el) => {
      const keys = applyMask(part.mask, numberToMaskFormat(el.key));
      keys.forEach((key) => {
        acc[parseInt(key, 2)] = el.value;
      })
    });
    return acc;
  }, {});

  return Object.values(result).reduce((res, item) => {
    return res + Number(item);
  }, 0);
}

console.log(`Result of day14/hard -> ${main()}`);
