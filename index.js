const rp = require('request-promise')
const cheerio = require('cheerio')
 
const options = {
  uri: 'https://www.listamarau.com.br/busca',
  transform: function (body) {
    return cheerio.load(body)
  }
}
 
function processarDados(dados){
  //salva no banco de dados
  console.log(JSON.stringify(dados))
}
 
rp(options)
.then(($) => {
  const contatos = []
  $('.busca_principal_interna').each((i, item) => {
    const contato = {
      imagem: $(item).find('.foto_busca_interna').attr('src'),
      nome: $(item).find('.titulo_busca_interna').text(),
      endereco: $(item).find('.end_busca_interna').text(),
      telefone: $(item).find('.tel_busca_interna > a:nth-child(2)').text().trim(),
    }
 
    if(contato.nome !== "")
      contatos.push(contato)
  })
  processarDados(contatos)
})
.catch((err) => {
  console.log(err);
})
