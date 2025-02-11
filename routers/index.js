import express, {json} from 'express';
//import {paginaInicio, guardarCompra, paginaComprar, paginaNosotros, paginaTestimonios, paginaViajes, paginaDetallesViajes, guardarTestimonios} from "../controllers/paginaController.js";
import {paginaInicio, guardarTestimonios, paginaNosotros, paginaTestimonios, paginaViajes, paginaDetalleViajes} from "../controllers/paginaController.js";
const router = express.Router();


//Envío al controlador paginaInicio
router.get('/viajes/:slug', paginaDetalleViajes);

router.get('/', paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get("/viajes", paginaViajes);

router.get("/testimonios", paginaTestimonios);

router.post("/testimonios", guardarTestimonios);



export default router;
