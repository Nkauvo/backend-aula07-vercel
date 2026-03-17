// express: framework web para criar o servidor e as rotas
const express = require('express');

// cors: permite que o App Mobile (em outro domínio) acesse nossa API
const cors = require('cors');


// São os arquivos que criamos na pasta /middlewares

// Logger: registra no terminal toda requisição que chega
const logger = require('./middlewares/logger');

// ErrorHandler: captura qualquer erro não tratado nas rotas
const errorHandler = require('./middlewares/errorHandler');


// app é o nosso "servidor". É nele que registramos middlewares e rotas.
const app = express();


// app.use() registra um middleware para TODAS as requisições.
// A ORDEM importa! Eles são executados de cima para baixo.

// Habilita CORS (Cross-Origin Resource Sharing).
// Sem isso, o browser bloquearia chamadas do App Mobile para nossa API.
app.use(cors());

// Habilita a leitura de JSON no corpo das requisições (req.body).
// Sem isso, req.body seria undefined em POST e PUT.
app.use(express.json());

app.use(logger);


// Acesse: http://localhost:3000
app.get('/', (req, res) => {
    res.json({ mensagem: '🍣 Bem-vindo à API do Haruy Sushi! (Aula 6)' });
});


// Importamos os arquivos de rota da pasta /routes
const rotasCategorias = require('./routes/categorias');
const rotasProdutos = require('./routes/produtos');

// app.use('prefixo', router) registra o router com um prefixo de URL.
// Toda rota definida dentro de categorias.js ficará em /api/categorias/...
// Toda rota definida dentro de produtos.js ficará em /api/produtos/...
app.use('/api/categorias', rotasCategorias);
app.use('/api/produtos', rotasProdutos);


app.use((req, res, next) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `Rota '${req.url}' não encontrada na API do Haruy Sushi.`
    });
});


app.use(errorHandler);


// Definimos a porta como constante para facilitar a mudança depois.
const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log('');
    console.log('🚀 ================================');
    console.log(`🚀 Servidor rodando!`);
    console.log(`🚀 Porta local: ${PORTA}`);
    console.log('🚀 ================================');
    console.log('');
    console.log('📋 Rotas disponíveis:');
    console.log(`   GET   /api/categorias`);
    console.log(`   POST  /api/categorias`);
    console.log(`   GET   /api/produtos`);
    console.log(`   GET   /api/produtos/:id`);
    console.log(`   POST  /api/produtos`);
    console.log(`   PUT   /api/produtos/:id`);
    console.log(`   DELETE /api/produtos/:id`);
    console.log('');
    console.log('💣 Rota de teste de erro:');
    console.log(`   GET   /api/produtos/erro-teste`);
    console.log('');
});

module.exports = app;
