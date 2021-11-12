function divisibleByLeft(n) {
    const arrayNum = n.toString().split('');
    console.log(arrayNum);
    const result = [];
    for (let i = 0; i < arrayNum.length; i++) {
        const izq = i - 1;
        console.log(result);
        if (izq === undefined) {
            result.push(false);
        }
        else {
            result.push(arrayNum[i] % arrayNum[izq] === 0);
        }
    }
    return result;
}

module.exports = divisibleByLeft;