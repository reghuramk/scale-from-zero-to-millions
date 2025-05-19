const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = characters.length;

export const encodeBase62 = (num: number): string => {
  let str = '';
  while (num > 0) {
    str = characters[num % base] + str;
    num = Math.floor(num / base);
  }
  return str;
};
