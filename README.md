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
- Criação de usuário - http://localhost:3000/users/create
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

- Buscar todos usuários - http://localhost:3000/users/all?page=3&users=5&order=ASC
```bash
$ Qualquer um dos três queryParams é opcional.
page a página que você deseja ver. 
users a quantidade de usuário por página 
order a forma de ordenação da lista.
```

- Buscar usuário por CPF - http://localhost:3000/users/:cpf/find-by-cpf
```bash
$ Passar um param :cpf com 11 caracteres.
```
- Atualizar usuário - http://localhost:3000/users/:id/update
```bash
$ Passar o :id no param e no body os dados que deseja atualizar. Todos os campos são opcionais.
{
  "fullname": "teste",
  "phone": "611111111111",
  "cpf": "87861012000",
  "postal_code": "73340313"
}
```

- Deletar usuário - http://localhost:3000/users/:id/update
```bash
$ Passar o :id que deseja deletar no param.
```

- Buscar endereço por CEP - http://localhost:3000/addresses/:cep/detail
```bash
$ Passar como param o :cep que deseja procurar.
```