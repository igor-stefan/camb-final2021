const express = require('express');
const cors = require('cors');
const knex = require('knex');
const emitter = require('events').EventEmitter;
const eventEmitter = new emitter();

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
});

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user : 'projeto',
//       password : '123d',
//       database : 'monitoramento-gases'
//     }
//   });


//MIDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//ROTASS

let now = {
    ppm: 20,
    ugm3: 360
};

app.get('/', (req, res) => {
    res.send("<h1>Você está em home<h1> <br> <h2>Tente a rota /dados<h2>");
})

app.get('/dados', (req, res) => res.json(now));

app.post('/dados', (req, res) => {
   console.log(req.body);
   const leitura = {
        ppm: req.body.ppm,
        ugm3: req.body.ugm3
   };
    if(leitura.ppm === null || isNaN(leitura.ppm))
        leitura.ppm = 0;
    if(leitura.ugm3 === null || isNaN(leitura.ugm3))
        leitura.ugm3 = 0;
   Object.assign(now, leitura);
    db('co2').insert({
        ppm: leitura.ppm,
        ugm3: leitura.ugm3,
        data: new Date()
    }).then(x => {
        console.log(x.command, 'REALIZADO NA TABELA co2');
    });
   eventEmitter.emit('novo_post', 'novo_post');
   res.send("REQUISIÇÃO POST RECEBIDA");
});

app.get('/startsend', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    // res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Content-Type","text/event-stream");
    console.log("CONEXAO INICIADA SOURCE 1");
    function listener_post_dados(event) {
        console.log('Nova informação postada! --> Evento:', event, 'SOURCE 1');
        res.write("data: " + JSON.stringify(now) + "\n\n");
    };
    eventEmitter.addListener('novo_post', listener_post_dados);
    req.on('close', () => {
        eventEmitter.removeListener('novo_post', listener_post_dados);
        console.log("CONEXAO FINALIZADA SOURCE 1")
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log('ESPERANDO NA PORTA ${process.env.PORT || 3000}');
});