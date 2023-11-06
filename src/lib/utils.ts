const generateRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const generateRandomNumbers = (max: number) => {
  const numbers: number[] = [];

  while (numbers.length < 3) {
    const num = generateRandomNumber(max);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers;
};
