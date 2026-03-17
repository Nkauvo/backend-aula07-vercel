const express = require('express');

// Router é um mini-servidor que gerencia apenas as rotas de categorias.
const router = express.Router();

// Importamos o objeto com os arrays de categorias e produtos.
// '../' volta uma pasta (de /routes para /aula6-backend)
// 'data/database' aponta para o nosso arquivo de banco de dados
const db = require('../data/database');

// Retorna a lista completa de categorias do cardápio.
//
// Teste no Thunder Client:
//   Método: GET
//   URL: http://localhost:3000/api/categorias
//
// Resposta esperada:
//   [ { "id": 1, "nome": "Combinados" }, { "id": 2, "nome": "Temakis" }, ... ]
router.get('/', (req, res) => {
    // db.categorias é o array de categorias do nosso banco em memória.
    // res.json() converte o array para JSON e envia como resposta.
    res.json(db.categorias);
});

// Cria uma nova categoria no cardápio.
//
// Teste no Thunder Client:
//   Método: POST
//   URL: http://localhost:3000/api/categorias
//   Body (JSON): { "nome": "Sobremesas" }
//
// Resposta esperada (status 201 Created):
//   { "id": 4, "nome": "Sobremesas" }
router.post('/', (req, res) => {
    // Criamos um novo objeto de categoria.
    // O ID é calculado automaticamente: tamanho do array + 1
    const novaCategoria = {
        id: db.categorias.length + 1,
        nome: req.body.nome       // req.body.nome vem do JSON enviado pelo cliente
    };

    // Adicionamos a nova categoria ao array (nosso "banco de dados")
    db.categorias.push(novaCategoria);

    // Respondemos com status 201 (Created) e os dados da nova categoria
    res.status(201).json(novaCategoria);
});

// Exportamos o router para ser usado no server.js
module.exports = router;
