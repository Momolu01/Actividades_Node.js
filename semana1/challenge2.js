const reverseInt = (number) => {
    //Implementación
    if(typeof(number) === 'number')
    {
        let tostring = number.toString().split('').reverse().join('');
        if( tostring[tostring.length-1] === '-') {
            return tostring = parseInt('-'+tostring);
        }else
        return tostring = parseInt(tostring);
        
    }
    throw new Error ("Argumento no valido");
}

module.exports = {
    reverseInt
}