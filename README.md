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