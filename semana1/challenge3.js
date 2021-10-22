const capitalizeLetters = (str) => {
    //Implementación
    const aux = str.split(" ");
    const helper = aux.map( element => element[0].toUpperCase()+element.slice(1) )
    const result = helper.join(' ');
    return result;
}

module.exports = {
    capitalizeLetters
}