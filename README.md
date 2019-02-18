# Bolseiro

Bolseiro é uma Single Page Application que possibilita um bolsista de
uma agência federal verificar se sua bolsa de um determinado mês e ano
já foi paga ou não.

Somente foram feitos testes para bolsistas da agência CAPES.

A aplicação está disponível
[neste endereço](https://jpmoura.github.io/bolseiro/).

## Como funciona

A aplicação verifica no
[Portal da Transparência](http://www.portaltransparencia.gov.br) a
situação da ordem bancária referente ao CPF do bolsista pelos dados
informados.

A consulta é automatizada e só varia de acordo com os parâmetros do
usuário. Devido a alteração de como o site do
[Portal da Transparência](http://www.portaltransparencia.gov.br)
interage com o usuário, foi necessário a mudança do modo como os dados
da bolsa eram recuperados.

Mesmo com uma API disponibilizada, ela não
se mostra consistente quando se trata de disponibilidade, uma vez que
é raro conseguir uma resposta com os dados, já que na maior parte do
tempo essa API retorna erro de consulta. Para isso, é feita a mesma
*query* que seria feita se o usuário estivesse acessando pela página
de busca, a mesma URL é ultilizada, porém, os parâmetros da consulta
variam de acordo com os dados do usuário.

## Dificuldades encontradas

A principal dificuldade encontrada foi o tempo de resposta da API. Em
vários testes o tempo chegou próximo dos dois minutos, quando não foi
retornado com uma mensagem de erro que não explica qual o erro.

Devido como a página de consulta foi construída, não é possível fazer
uma raspagem de dados como era feita na versão inicial da aplicação.

Visando diminuir o tempo de resposta, foi utilizada a mesma URL que é
requisitada pelo Portal da Transparência em sua página de busca ao invés
da API, uma vez que ela mostrou ter uma velocidade de execução maior e
uma menor taxa de erros se comparada com o *endpoint* oferecido pela
API.

Outra dificuldade é depender do
[CORS-Anywhere](https://cors-anywhere.herokuapp.com/) para executar a
query no servidor, uma vez que esse serviço por vezes fica indisponível.

## Dependências

Essa aplicação se apoia nas seguintes tecnologias:

* [VueJS](https://vuejs.org) como *framework* de criação de SPA;
* [VuetifyJS](https://vuetifyjs.com/en/) como *framework* de UI com
componentes baseados no Material Design;
* [Axios](https://github.com/axios/axios) para execução de requisições
AJAX;
* [Font Awesome](https://fontawesome.com) para utilização de ícones;
* [CORS-Anywhere](https://cors-anywhere.herokuapp.com/) para solucionar
o problema de referência cruzada;

## Changelog

### v2.0

Alterações para utilizar a API do Portal da Transparência, uma vez que a
área de pesquisa foi reformulada, o que inutilizou o processo que era
feito anteriormente.

### v1.0.1

Versão com tratamentos de exceções de erros das requisições AJAX.

### v1.0

Versão inical da aplicação, baseada na raspagem de dados da página de
consultas e utilizando de *bypass* de CORS.

## TODO

* ~~Melhorar validação do pagamento da bolsa (raspagem);~~
* ~~Utilizar Vuelidate para validação de dados do formulário;~~
* ~~Utilizar Vuex para centralizar o estado da aplicação;~~
* ~~Utilizar vuex-persist para persistir dados como CPF do usuário para
facilitar o uso em próximas visitas;~~
* Melhorar a experiência do usuário;
* Evitar repetições de classes como ```white--text``` dentro de
elementos aninhados;
* Considerar outras etapas de status do pagamento como ```Empenho``` e
```Liquidação```;
* Consertar erro de ```minimal-ui``` que acontece no Safari;
* Testar com outras agências financiadoras.