import {Viaje} from "../models/Viaje.js";
import {Testimonial} from "../models/Testimoniales.js";
import moment from 'moment';
import * as async_hooks from "node:async_hooks";



//Página de inicio
const paginaInicio = async (req, res) => {

    const promiseDB=[];

    promiseDB.push(Viaje.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    //Consultar 3 viajes del modelo de Viaje
    try{
        const resultado = await Promise.all(promiseDB);


        res.render('inicio', {
            titulo: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
            moment: moment,
        });

    }catch(err){
        console.log(err);
    }


}

//Página de Nosotros
const paginaNosotros = (req, res) => {
    const titulo = 'Nosotros';
    res.render("nosotros", {
        titulo,

    });
}

//Página de Viajes
const paginaViajes = async (req, res) => {
    const titulo = 'Viajes Disponibles';
    const viajes = await Viaje.findAll();
    res.render("viajes", {
        titulo,
        viajes,
        moment: moment,
    });
}

//Página de Testimonios
const paginaTestimonios = async (req, res) => {
    try{
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('testimonios', {
            titulo: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        });
    }catch(err){
        console.log(err);
    }

}

const paginaDetalleViajes = async (req, res) => {
    const {slug} = req.params;
    try {
        const resultado = await Viaje.findOne({where: {slug: slug}});
        res.render("viaje", {
            titulo: 'Información del Viaje',
            resultado,
            moment: moment,
        });
        }catch(error) {
         console.log('Dato no encontrado');
    }
}

const guardarTestimonios = async (req, res) => {

    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if (nombre.trim()===''){
        errores.push({mensaje: 'El nombre está vacío'});
    }
    if (correo.trim()===''){
        errores.push({mensaje: 'El correo está vacío'});
    }
    if (mensaje.trim()===''){
        errores.push({mensaje: 'El mensaje está vacío'});
    }

    if (errores.length>0){ //Debemos volver a la vista y mostrar los errores
        res.render('testimonios', {
            titulo: 'Testimonios',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
        })
    }else{ //Si me envía los 3 campos rellenos debo meterlo en la BBDD
        try{
            await Testimonial.create({nombre: nombre, correoelectronico: correo,mensaje: mensaje,});
            res.redirect('/testimonios'); //Guardo en la base de datos y lo envío a la misma vista
        }catch(error){
            console.log(error);
        }
    }

}


//EXPORTO PARA QUE LO PUEDA LEER EL ROUTER
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViajes,
    guardarTestimonios,
}
