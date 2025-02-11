import express, {json} from 'express';
import router from './routers/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';



dotenv.config();
const app = express();

//conectar a la BBDD
db.authenticate()
    .then(()=> console.log('Conectado a la base de datos'))
    .catch(err=> console.log(err));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));

//Habilitar pug
app.set('view engine', 'pug');

// Middleware para analizar datos de formularios (application/x-www-form-urlencoded)
//el servidor esté configurado para analizar los datos del formulario. En Express,//
app.use(express.urlencoded({ extended: true }));


app.use((req, res,next  ) => {
    const year= new Date().getFullYear();
    res.locals.year = year;
    res.locals.tituloR = "Agencia de Viajes";
    next();
})

//Definir la carpeta publica
app.use(express.static('public'));

//Rutas
app.use('/', router);

//"dev": "nodemon index.js"
//"start": "index.js"
