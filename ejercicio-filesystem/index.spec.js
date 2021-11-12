const {addUser, getUsers, clearUsers} = require("./index");
const {a, b} = require("./utils");

describe("Probando las funciones para el manejo de la lista de usuarios", () => {
    const newUser = {
        firstname: "Eduardo",
        lastname: "Alvarez",
        email: "edu19@gmail.com",
        password: "edu12345"
    };

    beforeAll(async () => {
        await b();
        await a(newUser);
    });

    it("Debería de obtener la lista de usuarios con la funcion getUsers", async() => {
        const users = await getUsers();

        expect(users).toEqual([expect.objectContaining(newUser)]);
    });

    it("Debería de obtener un objeto de tipo usuario para la funcion addUser", async() => {
        const newUserTwo = {
            firstname: "Roberto",
            lastname: "Alvarez",
            email: "rbal@gmail.com",
            password: "rb2021$"
        }

        const result = await addUser(newUserTwo);

        expect(result).toEqual(expect.objectContaining(newUserTwo));
    });

    it("Debería de obtener un arreglo con dos objetos después de haber agregado un usuario", async () => {
        const users = await getUsers();

        expect(users.length).toBe(2);
    });

    it("Debería de obtener true al llamar a clearUsers", async () => {
        const results = await clearUsers();

        expect(results).toBe(true);
    });

    it("Debería de obtener un arreglo vacío al usar la función getUsers después de llamar a clearUsers", async () => {
        await clearUsers();
        const users = await getUsers();

        expect(users.length).toBe(0);
    });
});