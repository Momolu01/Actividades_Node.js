const reverseString = (str) => {
    //Implementación
    if(str.length > 1 && str.length < 15){
        let result = '';
        for (let i = str.length-1; i >= 0; i--) {
            const element = str[i];
            result += element;
        }
        return result;
    }
    throw new Error("argumento novalido");
}

module.exports = {
    reverseString
}