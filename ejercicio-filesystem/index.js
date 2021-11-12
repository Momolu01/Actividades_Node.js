//Imports de los módulos
//fs y path
const fs = require('fs').promises;
const path = require('path');

const pathUsers = path.resolve('users.json');

const getUsers = async() => {
    try {
        //Leer el archivo
        const data = await fs.readFile(pathUsers, {encoding: 'utf8'});
        
        //Regresar el arreglo de usuarios como objeto literal Javascript (sin notación JSON)
        const arraydata = JSON.parse(data);
        return arraydata;
    } catch (error) {
        console.log(error);
    }

};

const addUser = async (userObj) => {
    try {
        console.log(userObj);
        //leer el archivo 
        const data = await fs.readFile(pathUsers, { encoding: 'utf8' });
        console.log(JSON.parse(data));
        //convertir el contenido en formato JSON en un objeto JS
        let arraydata = JSON.parse(data);
        
        //agregar el usuario en el arreglo
        arraydata.push(userObj);
        
        //sobreescribir el arreglo en el archivo
        await fs.writeFile( pathUsers, JSON.stringify(arraydata) );
        const aux = await fs.readFile(pathUsers, { encoding: 'utf8' });
    
        //si el proceso se realizó correctamente tendrás que regresar el objeto de usuario
        //que acabas de agregar en el arreglo-0 
        return arraydata[arraydata.length - 1];
    } catch (error) {
        console.log(error);
        
    }
};

const clearUsers = async () => {
    try {
        //Vaciar el arreglo y sobreescribir el archivo
        await fs.writeFile( pathUsers, "[]");

        //Si el proceso se realizó correctamente tendrás que regresar true
        const result = JSON.parse(await fs.readFile(pathUsers, {encoding: 'utf8'}));

        // if (JSON.parse(await fs.readFile(pathUsers, {encoding: 'utf8'})))
        if (result[0] === undefined)
            return true;
    } catch (error) {

        console.log(error);
    }
    
}
// addUser();

module.exports = {
    getUsers,
    addUser,
    clearUsers,
};
