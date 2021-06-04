# Bolseiro
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpmoura_bolseiro&metric=alert_status)](https://sonarcloud.io/dashboard?id=jpmoura_bolseiro)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpmoura_bolseiro&metric=bugs)](https://sonarcloud.io/dashboard?id=jpmoura_bolseiro)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpmoura_bolseiro&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpmoura_bolseiro)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpmoura_bolseiro&metric=coverage)](https://sonarcloud.io/dashboard?id=jpmoura_bolseiro)

Bolseiro é uma Single Page Application que possibilita um bolsista de
uma agência federal verificar se sua bolsa de um determinado mês e ano
já foi paga ou não.

Somente foram feitos testes para bolsistas da agência CAPES.

A aplicação está disponível
[neste endereço](https://jpmoura.github.io/bolseiro/).

## Como funciona

A aplicação verifica no
[Portal da Transparência](http://www.portaltransparencia.gov.br) a
situação da ordem bancária referente ao CPF do bolsista informado
pelo formulário da aplicação.

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
de busca, a mesma URL é utilizada, porém, os parâmetros da consulta
variam de acordo com os dados do usuário.

## Dificuldades encontradas

A maior dificuldade é depender do
[allOrigins](https://allorigins.win/) para executar a
*query* no servidor, uma vez que esse serviço por vezes fica indisponível.

A utilização do [CORS-Anywhere](https://cors-anywhere.herokuapp.com/) é
necessária devido às restrições de segurança impostas pelo
[Chrome](https://www.google.com/chrome/)

## Dependências

Essa aplicação se apoia nas seguintes tecnologias:

* [React](https://reactjs.org/) como *framework* de criação de SPA;
* [TypeScript](https://www.typescriptlang.org/) como linguagem no lugar
  do JavaScript;
* [Axios](https://github.com/axios/axios) para execução de requisições
AJAX;
* [Font Awesome](https://fontawesome.com) para utilização de ícones;
* [allOrigins](https://allorigins.win/) para solucionar
o problema de referência cruzada;

## Changelog

### v3.0
Refatoração completa da aplicação para React com TypeScript, deixando de
utilizar CDN para importação de bibliotecas. A motivação para esse
refatoramento foram as constantes quebras da aplicação devido as atualizações
das bibliotecas de terceiros que sempre eram referenciadas pela versão mais
recente ao utilizar CDN.

### v2.0

Alterações para utilizar a API do Portal da Transparência, uma vez que a
área de pesquisa foi reformulada, o que inutilizou o processo que era
feito anteriormente.

### v1.0.1

Versão com tratamentos de exceções de erros das requisições AJAX.

### v1.0

Versão inicial da aplicação, baseada na raspagem de dados da página de
consultas e utilizando de *bypass* de CORS.

## TODO
* Testes de componentes;
* Testes e2e;
* Estilos diferentes de *cards* para as etapas do documento bancário (empenho, liquidação e pagamento)
