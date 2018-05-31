# Bolseiro

Bolseiro é uma Single Page Application que possibilita um bolsista de uma agência federal verificar se sua bolsa de um
determinado mês e ano já foi paga ou não.

Somente foram feitos testes para bolsistas da agência CAPES.

A aplicação está disponível [neste endereço](https://jpmoura.github.io/bolseiro/).

## Dependências

Essa aplicação se apoia nas seguintes tecnologias:

* [VueJS](https://vuejs.org);
* [VuetifyJS](https://vuetifyjs.com/en/);
* [Axios](https://github.com/axios/axios);
* [CORS Anywhere](https://github.com/Rob--W/cors-anywhere/);
* [Font Awesome](https://fontawesome.com).

## TODO

* Melhor interação;
* Evitar repetições de classes como ```white--text``` dentro de elementos aninhados;
* Melhor validação do pagamento da bolsa (raspagem);
* Considerar outras etapas de status do pagamento como ```Empenho``` e ```Liquidação```;
* Consertar erro de ```minimal-ui``` que acontece no Safari;