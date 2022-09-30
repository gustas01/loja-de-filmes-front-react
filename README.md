A aplicação em questão se trata de uma simulação de loja de filmes, onde está presente apenas o desenvolvimento do frontEnd, os dados usados para montar o projetos são da APIdo TMDB (The Movie DataBase) cuja documentação pode ser encontrada aqui https://developers.themoviedb.org/3/getting-started/introduction.

## Overview da aplicação
### Cabeçalho e conteúdo
![image](https://user-images.githubusercontent.com/50846424/193335436-a5384250-3cc9-4135-a9c2-5260e343ca0f.png)




Os filmes exibidos na página inicial são os filmes em alta na semana.
No cabeçalho da página tem alguns ícone interativos, sendo eles:
* Um ícone de uma câmera filmadora que simboliza o intuito do site, que se trata de filmes. Esse ícone quando clicado, leva o usuário para a página inicial.
* Um input de pesquisa de filmes juntamente com um ícone de lupa para fazer a pesquisa. Basta digitar algo relacionado ao nome do filme e clicar na lupa que a pesquisa será feita e exibos os resultados na página inicial.
* Outro ícone, porém agora com a função de habilitar/desabilitar um modo noturno na aplicação.
* O nome do usuário logado, que é um clicável que exibe as opções da conta e logout.
* Mais 2 ícones, o primeiro deles que exibirá os favoritos marcados pelo usuário, e o segundo mostrará a lista dos filmes salvos no carrinho de compras. E esses ícones têm uma indicação de quantos itens estão salvos em suas respectivas listas. <br> <br>

Nos cards de cada filme, tem-se botões de adicionar aos favoritos (coração) e adicionar no carrinho de compras (+Adicionar) para checkout.

### Paginação <br>
Na parte inferior da página, tem-se botões de paginação para navegação na aplicação. <br>

![image](https://user-images.githubusercontent.com/50846424/188769678-3c2a89dd-0479-45d3-9ea8-ec90e0bd9f34.png)

### Listas laterais de favoritos e carrinho de compras
Lista dos favoritos, onde cada item pode ser excluído da lista de favoritos ou adicionados no carrinho. Também existe um botão "esvaziar" para excluir todo os itens da lista.
![image](https://user-images.githubusercontent.com/50846424/193335673-cf2371d5-ec75-4b63-9836-d3908ddcfba4.png)


Similar á lista de favoritos, aqui o carrinho de compras
![image](https://user-images.githubusercontent.com/50846424/193335945-d3861045-bbc4-41a8-9e73-2743150344af.png)

com a diferença de que, na parte de baixo do menu tem-se informaçãoes sobre o total de valor do carrinho e um botão para prosseguir para o checkout <br>
![image](https://user-images.githubusercontent.com/50846424/188770609-30316fec-0afb-4c21-8747-bc6301382b41.png)

### Página de checkout
Essa página consiste em um formulário para o cliente entrar com suas informações e uma sessão com as informações do carrinho. O botão de finalizar compra só fica habilitado se o usuário entrar com nome, cpf e email válidos.
![image](https://user-images.githubusercontent.com/50846424/193336121-92749e2a-b8d0-45af-b06b-37cdfb310460.png)

E ainda é possível adicionar itens salvos nos favoritos ao carrinho sem sair dessa tela.

Clicando em "Finalizar compra" é exibido um modal agradecendo pela compra, e após clicar em "Continuar comprando" o usuário é redirecionado para a tela inicial.
![image](https://user-images.githubusercontent.com/50846424/193336401-20e724c7-fb90-4b87-8af2-a05058602c3a.png)


# Instruções para executar a aplicação
OBS: O NodeJS deve estar instalados no ambiente onde será executado o projeto.

1º - Com um terminal aberto na raiz do projeto, execute o comando  `npm i` para que as depências sejam instaladas.<br>
2º - Preencha o arquivo .env que está dentro da pasta raiz do proejeto com a sua API_KEY, colocando o valor logo após o sinal de igualdade, sem aspas.<br> 

```bash
# essa key é criada no site https://www.themoviedb.org/
REACT_APP_API_KEY=
```

3º - Ainda com o terminal aberto na raiz, execute o comando  `npm start` para executar a aplicação. Uma aba no seu navegador será aberta no endereço `http://localhost:3000/`
