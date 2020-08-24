# Country APP

Esta aplicação está dividida em duas partes:
- *server-side*
  - desenvolvido em Ruby on Rails, com o objetivo de consumir uma API externa (https://restcountries.eu/), armazenar o conteúdo consumido em um banco de dados (Postgres), e fornecer uma API para consumo esses dados.
- *client-side*
  - desenvolvido em React, com o objetivo de consumir a API (server-side) e disponibilizar uma interface para que os usuários possam consultar e pesquisar por países.

## Setup

- Para rodar a aplicação local, é necessário:
  - ruby 2.6.5 `asdf local ruby 2.6.5`
  - nodejs 12.14.1 `asdf local nodejs 12.14.1`
  - Rails 6.0.3.2 `gem install rails`
  - docker

`use ASDF para facilitar as instalações` https://github.com/asdf-vm/asdf

- Banco de Dados
  - Subir o banco de dados: `docker-compose up`
  - Criar o banco de dados da aplicação: `rails db:create`
  - Rodar as migrações: `rails db:migrate`
  - Parar o banco de dados: `docker-compose down`

## Aplicação
- Subir a aplicação:
  - `docker-compose up`
  - `rails s`
  - acessar `http://localhost:3000/`

- Para inicializar os dados na aplicação local:
  - Rodar a rake: `rake countries_app:import_countries`

## Testes
- Backend
  - `bundle exec rspec`
- Frontend
  - `yarn test`

## Deploy
- A aplicação está hospedada em: https://appcountries.herokuapp.com/

## Melhorias
- Adicionar tratamento de erros no frontend
- Adicionar um `load` enquanto os dados são carregados
- Adicionar ordenação
- Adicionar um servidor de automação
