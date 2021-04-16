/* chunkArray - method that splits an array into parts of determined size */

export const chunkArray = (array, size) => {
  const chunkedArr = [];
  let index = 0;

  if (!array) {
    return chunkedArr;
  }

  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
  }

  return chunkedArr;
};