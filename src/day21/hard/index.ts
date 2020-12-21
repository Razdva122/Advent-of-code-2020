import input from '../input';

const inputFormatted = input.split('\n').map((el) => {
  const [values, contains] = el.split('(contains ');
  return {
    values: values.split(' ').slice(0, values.split(' ').length - 1),
    contains: contains.slice(0, contains.length - 1).split(', '),
  }
});

const ingredients = inputFormatted.reduce<{[key:string]: true}>((acc, el) => {
  el.values.forEach(value => {
    acc[value] = true;
  });
  return acc;
}, {});

const allergens = inputFormatted.reduce<{[key:string]: string | null}>((acc, el) => {
  el.contains.forEach(value => {
    acc[value] = null;
  });
  return acc;
}, {});

export function main(): string {
  const match: {[key: string]: string[]} = {};
  Object.keys(allergens).forEach((allergen) => {
    const ingredientsForAllergen = inputFormatted
      .filter((line) => line.contains.includes(allergen))
      .map((line) => line.values)
      .reduce((acc, el) => {
        return acc.filter((val) => el.includes(val));
      }, Object.keys(ingredients));

    match[allergen] = ingredientsForAllergen;
  });

  while (Object.values(allergens).some((el) => el === null)) {
    const keys = Object.keys(match);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (match[key].length === 1) {
        const element = match[key][0];
        allergens[key] = element;
        for (let j = 0; j < keys.length; j += 1) {
          match[keys[j]] = match[keys[j]].filter((el) => el !== element);
        }
      }
    }
  }

  return Object.keys(allergens).sort().map((el) => allergens[el]).join(',');
}

console.log(`Result of day21/hard -> ${main()}`);
