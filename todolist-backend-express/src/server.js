const app = require('./app');

const PORT = /*process.env.PORT ||*/ 8000;
require('dotenv').config();

app.listen(PORT, () => {
  console.log(`Servidor escuchando sobre el puerto ${PORT}`);
});
