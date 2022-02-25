## Finalidade deste projeto?
- Este é um projeto de estudos sobre o framework NestJS, MySQL, TypeORM e MongoDB.
- 
## Funcionalidades
- Você pode cadastrar usuários e ceps.
- MongoDB foi usado para fazer cache dos dados não relacionais.
- Api viacep foi usada para consulta dos ceps.

## O que você precisa?
- Ter docker e docker-compose instalado na sua máquina.

## Como rodar a aplicação?
- Use o comando abaixo na raiz do projeto, isso vai buildar a imagem descrita no Dockerfile.
```bash
$ docker build -t backend_api .
```

- Depois use o comando abaixo, isso vai subir a orquestração dos containers que serão necessários para rodar a aplicação em modo desenvolvimento.
```bash
$ docker-compose up
```

## Endpoints da aplicação
- Criação de usuário - POST - http://localhost:3000/users
```bash
$ 
{
  "fullname": "nome do usuario",
  "phone": "DDD e numero com 9 digitos",
  "cpf": "cpf do usuario",
  "address_info": {
    "postal_code": "cep que foi retornado do via cep",
    "street": "rua",
    "city": "cidade",
    "state": "estado"
    }
}
```

- Buscar todos usuários - GET - http://localhost:3000/users?page=3&limit=5&sort=ASC
```bash
$ Qualquer um dos três queryParams é opcional.
page a página que você deseja ver. 
limit a quantidade de usuário por página 
sort a forma de ordenação da lista.
A ideia desse endpoint é trazer o minimo possivel 
e buscar os detalhes de usuário somente quando necessário pelo endpoint /find-by-cpf
```

- Buscar usuário por CPF - GET - http://localhost:3000/users/:cpf
```bash
$ Passar um param :cpf com 11 caracteres.
```
- Atualizar usuário - PUT - http://localhost:3000/users/:id
```bash
$ Passar o :id no param e no body os dados que deseja atualizar. Todos os campos são opcionais.
{
  "fullname": "teste",
  "phone": "611111111111",
  "cpf": "87861012000",
  "postal_code": "73340313"
}
```

- Deletar usuário - DELETE - http://localhost:3000/users/:id
```bash
$ Passar o :id que deseja deletar no param.
```

- Buscar endereço por CEP - GET - http://localhost:3000/addresses/:cep
```bash
$ Passar como param o :cep que deseja procurar.
```
