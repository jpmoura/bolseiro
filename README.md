# Bolseiro

Bolseiro é uma Single Page Application que possibilita um bolsista de uma agência federal verificar se sua bolsa de um
determinado mês e ano já foi paga ou não.

Somente foram feitos testes para bolsistas da agência CAPES.

A aplicação está disponível [neste endereço](https://jpmoura.github.io/bolseiro/).

## Como funciona

A aplicação verifica no [Portal da Transparência](http://www.portaltransparencia.gov.br) a situação da ordem bancária
referente ao CPF do bolsista pelos dados informados.

A consulta é automatizada e só varia de acordo com os parâmetros do usuário. A partir da resposta do servidor, a página
HTML é varrida para buscar as informações necessárias para se definir se a bolsa já foi paga e em que dia ou não.

A varredura da página acontece em dois níveis:

1. Verifica-se se a página contém a frase ```Nenhum documento obedece aos critérios da consulta.```. Se esta frase
existir, significa que não existe nenhuma informação relacionada a uma bolsa com o status de igual a ```Pagamento``` 
com o CPF informado, ou seja, que a bolsa não foi pag. Contudo, a bolsa pode estar em fase de ```Empenho``` ou 
```Liquidação```;
2. Caso a frase não exista, significa que existe informação sobre o pagamento de bolsa para o CPF no ano e mês 
informados. A partir disso a página é varrida em busca da data do dia do pagamento e é adicionada a informação que será
exibida ao usuário.

## Difulcades encontradas

A principal dificuldade foi a não existência de uma API para a transparência de dados na esfera federal. Durante o
desenvolvimento foi encontradas APIs na esfera estadual porém a no âmbito federal não existe nenhuma.

Além disso, foi preciso contornar o problema de 
[Cross Origin Reference Sharing](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS), que impede que
se consiga os dados diretamente a partir de requisições AJAX. Para solucionar essa limitação foi usado o 
[CORS Anywhere](https://github.com/Rob--W/cors-anywhere/).

Outra dificuldade foi adaptar a consulta especificamente para o mês de Janeiro, que 

## Dependências

Essa aplicação se apoia nas seguintes tecnologias:

* [VueJS](https://vuejs.org);
* [VuetifyJS](https://vuetifyjs.com/en/);
* [Axios](https://github.com/axios/axios);
* [CORS Anywhere](https://github.com/Rob--W/cors-anywhere/);
* [Font Awesome](https://fontawesome.com);
* [jQuery](https://jquery.com).

## TODO

* Melhorar a experiência do usuário;
* Evitar repetições de classes como ```white--text``` dentro de elementos aninhados;
* Melhorar validação do pagamento da bolsa (raspagem);
* Considerar outras etapas de status do pagamento como ```Empenho``` e ```Liquidação```;
* Consertar erro de ```minimal-ui``` que acontece no Safari;
* Testar com outras agências financiadoras.