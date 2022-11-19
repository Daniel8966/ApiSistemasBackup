

//importar modulos
import express from 'express';
import fetch from "node-fetch";
import ejs from 'ejs';
//Areglando path
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Establecer servidor
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('app listening on ' + app.get('port'))
})

//Ruta public
app.use('/', express.static('public'));




// Setting EJS as templating engine establecer motor de render
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

//metodos y rutas
app.get('/', (req, res) => {
    res.render('index')
})



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

app.get('/par_impar', (req, res) => {
    var numero = getRandomInt(500000);
    var status = 0;
    //Staturs 0 = comienxo
    res.render('par_impar', { numero, status })
})
app.post('/comparNumero', (req, res) => {
    var numero = req.body.numero;
    var eleccion = req.body.eleccion;

    var url = `https://api.isevenapi.xyz/api/iseven/${numero}/`


    console.log(numero)
    if (eleccion == 0) {
        console.log('el usuario escojio par')


        fetch(url)
            .then(res => res.json())
            .then(response => {

                if (response.iseven === false) {
                    console.log('el numero es impar')
                    var numero = getRandomInt(500000);
                    var status = 1;
                    res.render('par_impar', { numero, status })
                } else {

                }
                if (response.iseven === true) {
                    console.log('el numero es par')
                    var numero = getRandomInt(500000);
                    var status = 2;
                    res.render('par_impar', { numero, status })

                }
            })

    }

    if (eleccion == 1) {
        console.log('el usuario escojio impar')

        fetch(url)
            .then(res => res.json())
            .then(response => {

                if (response.iseven === false) {
                    console.log('el numero es impar')
                    var numero = getRandomInt(500000);
                    var status = 2;
                    res.render('par_impar', { numero, status })
                } else {

                }
                if (response.iseven === true) {
                    console.log('el numero es par')
                    var numero = getRandomInt(500000);
                    var status = 1;
                    res.render('par_impar', { numero, status })

                }
            })
    }



})


app.get('/multiplicacion', (req, res) => {
    var url = `https://x-math.herokuapp.com/api/mul`
    var resultado = 0;
    fetch(url)
        .then(res => res.json())
        .then(response => {
            var expresion = (response.expression);
            var numero1 = response.first;
            var numero2 = response.second;
            var respuesta = response.answer;
            var randomizador = getRandomInt(2);
            var estatus = 0 ;
            if (randomizador === 1) {
                var resultado = response.answer;

                 res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
            } else {
                var resultado = getRandomInt(757);

                 res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
            }



        })

})

app.post('/comparMulti', (req, res) => {
    var eleccio = req.body.eleccion;

    var numero1 = req.body.numero1;
    var numero2 = req.body.numero2;
    var resultado = req.body.resultado;


    var numero3 = (numero1 * numero2)

    var estado = 0;

    console.log(numero1 +'*' + numero2 +'=' + resultado +' ?')
    console.log(numero1 +'*' + numero2 +'=' + numero3 +' !')
    if (numero3 == resultado) {
        console.log('en efecto es verdadero')
        estado = 1
    } else {
        console.log('falso')
    }

    console.log(estado)

    if (eleccio == 0) {
        console.log('el usuario escogio verdadero')
        if (estado == 1) {
            console.log('el usuario escogio bien')
            var url = `https://x-math.herokuapp.com/api/mul`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 1;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                         res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }else{
            console.log('el usuario escogio mal')
            var url = `https://x-math.herokuapp.com/api/mul`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 2;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                         res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }
        
        
    }
    if (eleccio == 1) {
        console.log('el usuario escogio falso')
        if (estado == 0) {
            console.log('el usuario escogio bien')
            var url = `https://x-math.herokuapp.com/api/mul`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 1;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                        res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }else{
            console.log('el usuario escogio mal')
            var url = `https://x-math.herokuapp.com/api/mul`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 2;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                         res.render('multiplicacion', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }
    }


    

})



app.get('/division', (req, res) => {
    var url = `https://x-math.herokuapp.com/api/div`
    var resultado = 0;
    fetch(url)
        .then(res => res.json())
        .then(response => {
            var expresion = (response.expression);
            var numero1 = response.first;
            var numero2 = response.second;
            var respuesta = response.answer;
            var randomizador = getRandomInt(2);
            var estatus = 0 ;
            if (randomizador === 1) {
                var resultado = response.answer;

                 res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
            } else {
                var resultado = getRandomInt(757);

                 res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
            }



        })
})


app.post('/comparDiv', (req, res) => {
    var eleccio = req.body.eleccion;

    var numero1 = req.body.numero1;
    var numero2 = req.body.numero2;
    var resultado = req.body.resultado;


    var numero3 = (numero1 / numero2)

    var estado = 0;

    console.log(numero1 +'*' + numero2 +'=' + resultado +' ?')
    console.log(numero1 +'*' + numero2 +'=' + numero3 +' !')
    if (numero3 == resultado) {
        console.log('en efecto es verdadero')
        estado = 1
    } else {
        console.log('falso')
    }

    console.log(estado)

    if (eleccio == 0) {
        console.log('el usuario escogio verdadero')
        if (estado == 1) {
            console.log('el usuario escogio bien')
            var url = `https://x-math.herokuapp.com/api/div`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 1;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                         res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }else{
            console.log('el usuario escogio mal')
            var url = `https://x-math.herokuapp.com/api/div`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 2;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                         res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }
        
        
    }
    if (eleccio == 1) {
        console.log('el usuario escogio falso')
        if (estado == 0) {
            console.log('el usuario escogio bien')
            var url = `https://x-math.herokuapp.com/api/div`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 1;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                        res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }else{
            console.log('el usuario escogio mal')
            var url = `https://x-math.herokuapp.com/api/div`
            var resultado = 0;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    var expresion = (response.expression);
                    var numero1 = response.first;
                    var numero2 = response.second;
                    var respuesta = response.answer;
                    var randomizador = getRandomInt(2);
                    var estatus = 2;
                    if (randomizador === 1) {
                        var resultado = response.answer;

                         res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    } else {
                        var resultado = getRandomInt(757);

                         res.render('division', { expresion, resultado, numero1, numero2, respuesta ,estatus })
                    }



                })

        }
    }


    

})






app.get('/metodo', (req, response1) => {
    var url = 'https://api.isevenapi.xyz/api/iseven/6/'
    fetch(url)
        .then(res => res.json())
        .then(response => {


        })
})