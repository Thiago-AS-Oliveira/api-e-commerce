# E-Commerce API

**API** construída em Node.js e Express, com integração de banco de dados MongoDB e processamento de pagamentos usando o Stripe. Ele oferece autenticação de usuário, gerenciamento de produtos e pedidos, permitindo que os usuários façam login, comprem produtos, façam pedidos e paguem de forma segura.

### Dependências:

- cors: Controle de acesso a recursos de diferentes origens.
- crypto-js: Criptografia de senhas de usuário.
- dotenv: Carregamento de variáveis de ambiente.
- express: Framework web para criação de APIs.
- jsonwebtoken: Criação e verificação de tokens JWT.
- mongoose: Interação com o banco de dados MongoDB.
- stripe: Integração de pagamentos com o Stripe.
- nodemon: Monitoramento de alterações para reiniciar o servidor.(dependência de desenvolvimento)

## Características

- Cadastro, login e gerenciamento de usuários.
- Cadastro, visualização e busca de produtos.
- Criação, acesso e gerenciamento de pedidos.
- Integração de pagamento usando Stripe.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- [MongoDB](https://www.mongodb.com/) configurado e em execução.
- Conta no [Stripe](https://stripe.com/) para processamento de pagamentos.
- Clonar ou baixar este repositório.

## Instalação

1. Clone este repositório: `git clone https://github.com/Thiago-AS-Oliveira/api-e-commerce`
2. Navegue até a pasta do projeto: `cd your-repo`
3. Instale as dependências: `npm install`

## Configuração

1. Renomeie o arquivo `model.env` para `.env` na raiz do projeto.

2. Substitua `sua_mongodb_uri`, `sua_stripe_key_secreta_`, `seu_segredo_de_senha` e `seu_segredo_jwt` pelas suas próprias chaves e informações de configuração.

## Uso

1. Inicie o servidor: `npm start`

2. Acesse a API em: `http://localhost:(numero de porta escolhido)`

3. Utilize as rotas listadas abaixo.

## Rotas

#### `/api/auth`

Rota usada para lidar com a autenticação dos usuários. Ela disponibiliza dois métodos para controlar o acesso dos usuários à aplicação:

- (POST) `/api/auth/register`: Este método permite que novos usuários se cadastrem no sistema.

  - Os parâmetros devem ser enviados no corpo da requisição.

  - É obrigatória a inclusão de todos os parâmetros a seguir:

    - username (string): Nome de usuário.
    - name (string): Nome do usuário.
    - lastname (string): Sobrenome do usuário.
    - password (string): Senha do usuário.
    - email (string): E-mail do usuário.

  - O sistema verifica a disponibilidade do nome de usuário e e-mail.

  - A senha é criptografada antes de ser armazenada no banco de dados.

  - Se tudo estiver correto, o usuário é registrado.

- (POST) `api/auth/login`: Este método permite que usuários existentes podem fazer login.

  - Os parâmetros devem ser enviados no corpo da requisição.

  - É obrigatória a inclusão de todos os parâmetros a seguir:

    - email (string): E-mail do usuário.
    - password (string): Senha do usuário.

  - O sistema verifica se o e-mail corresponde a um usuário.

  - Se for, a senha fornecida é comparada com a senha armazenada.

  - Se as senhas coincidirem, um token é gerado e devolvido.

  - Esse token é usado para futuras solicitações, para que o usuário não precise fazer login novamente.

Essa rota é vital para garantir que apenas usuários
autorizados possam acessar recursos protegidos da aplicação.

#### `/api/users`

Rota que gerencia operações relacionadas aos usuários na aplicação, oferecendo métodos para modificar perfis, acessar informações e executar ações específicas.

- (PUT) `/api/users/:id`: Este método permite modificar informações de um usuário autenticado.

  - O id do usuário autenticado, é enviado como parâmetro na url, para identificar e modificar o usuário correto.

  - O sistema verifica se o usuário autenticado tem permissão para modificar o perfil.

  - Informações como endereço, senha e outros campos podem ser atualizados.

  - A senha é criptografada novamente se for modificada.

- (GET) `/api/users/find/:id`: Método que permite acessar informações de um usuário autenticado.

  - O id do usuário autenticado, é enviado como parâmetro na url, para identificar o usuário correto.

  - O sistema verifica se o usuário autenticado tem permissão para acessar as informações.

  - As informações do usuário, excluindo a senha, são retornadas como resposta.

- (DELETE) `/api/users/:id`: Método permite deletar o perfil de um usuário autenticado.

  - O id do usuário autenticado, é enviado como parâmetro na url, para identificar o usuário correto.

  - O sistema verifica se o usuário autenticado tem permissão para deletar o perfil.

  - O perfil do usuário é removido do sistema.

Essa rota é essencial para possibilitar que usuários autenticados modifiquem seus perfis, acessem informações e excluam suas contas conforme necessário, garantindo controle e personalização para cada usuário na aplicação.

#### `/api/products`

Rota que gerencia operações relacionadas aos produtos na aplicação. Ela oferece métodos para adicionar novos produtos, acessar detalhes de produtos individuais e listar produtos de acordo com categorias ou pesquisas.

- (POST) `/api/products`: Método que permite adicionar um novo produto à aplicação.

  - Os parâmetros devem ser enviados no corpo da requisição, sendo eles:

    - name (string, obrigatório): Nome do produto.
    - description (string, obrigatório): Descrição detalhada do produto.
    - image (string, obrigatório): URL da imagem do produto.
    - price (number, obrigatório): Preço.
    - categorie (string, obrigatório): Categoria.
    - discount (number): Desconto aplicado ao produto (padrão: 0).
    - installments (number): Número de parcelas disponíveis (padrão: 12).
    - rating (number): Avaliação do produto.
    - shipping (number, obrigatório): Custo de envio(frete).
    - inStock (boolean): Indica se o produto está em estoque (padrão: true).

  - O sistema cria um novo produto com base nos parâmetros fornecidos.

  - O produto é então salvo na base de dados.

- (GET) `/api/products`: Método que lista todos os produtos disponíveis, com opção de filtragem por categoria ou pesquisa.

  - Os parâmetros são opcionais e serão utilizados parâmetros de consulta, sendo eles:

    - `?category=valor` : Categoria para filtrar produtos.
    - `search=valor`: Termo de pesquisa para buscar produtos.

  - Se uma categoria for fornecida, o sistema retorna produtos dessa categoria.

  - Se uma pesquisa for fornecida, o sistema busca produtos com base no termo de pesquisa.

  - Caso não seja fornecido nenhum parâmetro, todos os produtos são listados.

- (GET) `/api/products/find/:id` Método que permite acessar detalhes de um produto por meio do seu ID.

  - O id do produto é enviado como parâmetro na url.

  - O sistema busca o produto correspondente ao ID fornecido na url.

  - Os detalhes desse produto são retornados como resposta.

Essa rota é essencial para gerenciar os produtos da aplicação, permitindo a adição, visualização e busca eficiente de produtos de acordo com as preferências dos usuários.

#### `/api/orders`

Rota que gerencia operações relacionadas aos pedidos na aplicação. Ela oferece métodos para criar novos pedidos, acessar pedidos de um usuário específico e obter informações detalhadas sobre os pedidos.

- (POST) `/api/orders` Método que permite criar um novo pedido.

  - Os parâmetros devem ser enviados no corpo da requisição, sendo eles:

    - userId (string, obrigatório): ID do usuário que fez o pedido.
    - products (array de objetos, obrigatório): Array de produtos no pedido, com informações como ID do produto, nome, imagem, preço, quantidade, entre outros.
    - amount (number, obrigatório): Valor total do pedido.
    - address (object, obrigatório): Informações do endereço de entrega.
    - status (string): Status do pedido (padrão: "em preparação").
    - estimatedDelivery (date): Data estimada de entrega.

  - O sistema cria um novo pedido com base nos parâmetros fornecidos.

  - O pedido é então salvo na base de dados.

- (GET) `/api/orders/find/:id`: Método que permite acessar os pedidos de um usuário específico.

  - O ID do usuário deve ser enviado na url.

  - O sistema busca todos os pedidos associados ao ID do usuário fornecido.

  - Os pedidos são retornados como resposta.

A rota /api/orders é crucial para gerenciar pedidos de usuários, permitindo que eles façam encomendas, acessem informações sobre seus pedidos e recebam detalhes importantes sobre cada pedido realizado.

#### `/api/checkout`

Rota que lida com operações relacionadas ao processamento de pagamento usando o serviço Stripe. Ela oferece métodos para criar um pagamento e obter informações necessárias para realizar o checkout.

- (POST) `/payment/:id` Método que permite criar um pagamento usando o Stripe para um pedido específico.

  - O ID do cliente é enviado na url.

  - No corpo da requisição são obrigatórios os seguintes parâmetros:

    - id (string, obrigatório): ID do usuário que fez o pedido.
    - amount (number, obrigatório): Valor total do pagamento.
    - email (string, obrigatório): E-mail do cliente.

  - O sistema cria um pagamento usando a API do Stripe com base nos parâmetros fornecidos.

  - O cliente recebe um "client secret" do pagamento, que é usado para autenticar e confirmar o pagamento.

A rota /api/checkout é crucial para processar pagamentos de pedidos usando o Stripe, um serviço de processamento de pagamentos amplamente utilizado, garantindo uma experiência segura e conveniente para os clientes durante o processo de checkout.
