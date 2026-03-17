// Cada categoria agrupa produtos relacionados no cardápio.
let categorias = [
    { id: 1, nome: 'Combinados' },
    { id: 2, nome: 'Temakis' },
    { id: 3, nome: 'Bebidas' }
];

// Cada produto tem um ID único, pertence a uma categoria (categoriaId),
// e possui nome, descrição, preço e o nome do arquivo de imagem.
let produtos = [
    {
        id: 1,
        categoriaId: 1,
        nome: 'Combinado Salmão 20 Peças',
        descricao: 'Sashimis, niguiris e uramakis de salmão fresco.',
        preco: 89.90,
        imagem: 'combinado1.png'
    },
    {
        id: 2,
        categoriaId: 2,
        nome: 'Temaki Filadélfia',
        descricao: 'Salmão, cream cheese e cebolinha.',
        preco: 35.00,
        imagem: 'temaki-fila.png'
    }
];

// Exportamos as duas variáveis num único objeto para que outros
// arquivos (como as rotas) possam importar e usar esses dados.
module.exports = { categorias, produtos };
