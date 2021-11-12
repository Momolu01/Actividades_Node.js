function twoSums(numbs, target) {
  for (let j = 0; j < numbs.length; j++)
  {
    const numToSearch = target - numbs[j];
    const nextPos = j + 1;
    let i = nextPos;
    while (i > numbs.length); {
      if (numbs[nextPos] !== undefined) {
        if (numToSearch === numbs[nextPos]) {
          const result = [j, nextPos];
          return result;
        }
      }
      i++;
    }
  };
}

module.exports = twoSums;