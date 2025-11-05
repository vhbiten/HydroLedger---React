# HydroLedger 💧

Sistema de gerenciamento e monitoramento ambiental, desenvolvido com React e Node.js.

## 📹 Demonstração em Vídeo

[![Demonstração do HydroLedger](https://img.youtube.com/vi/r1VwZq_N_Gc/maxresdefault.jpg)](https://www.youtube.com/watch?v=r1VwZq_N_Gc)

> **Clique na imagem acima para assistir ao vídeo de demonstração**

## 📋 Sobre o Projeto

HydroLedger é uma aplicação web desenvolvida para área da engenharia ambiental como uma ferramenta para registrar e monitorar dados diários de campo. Ele permite o registro através de qualquer dispositivo de dados parâmetros:

- Níveis de cloro residual
- Efluentes
- Poços

Além disso, ele permite a gestão de usuários e permissões para cadastro e consulta de registros.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** 19.1.1
- **TypeScript** 5.9.3
- **Vite** 7.1.7
- **Material-UI** 7.3.4
- **Radix UI** 3.2.1
- **React Router DOM** 7.9.4
- **React Icons** 5.5.0
- **date-fns** 4.1.0

### Backend (API)
- **Node.js** >=18
- **Express** 4.19.2
- **TypeScript** 5.5.4
- **Prisma ORM** 5.19.1
- **PostgreSQL** (via Docker)
- **JWT** para autenticação
- **Bcrypt** para criptografia
- **Zod** para validação
- **Jest** para testes

## 📁 Estrutura do Projeto

```
HydroLedger/
├── src/                   # Código fonte do frontend
│   ├── components/        # Componentes React
│   │   ├── Login/         # Tela de login
│   │   ├── Register/      # Cadastro de registros
│   │   ├── Manage/        # Gerenciamento
│   │   └── Navbar/        # Barra de navegação
│   └── services/          # Serviços e utilitários
├── Hydroledger - API/     # Backend da aplicação
│   ├── src/               # Código fonte da API
│   │   ├── controllers/   # Controladores
│   │   ├── routes/        # Rotas da API
│   │   ├── middlewares/   # Middlewares
│   │   └── database/      # Configuração do Prisma
│   └── prisma/            # Schema e migrations
└── public/                # Arquivos estáticos
```

## 📚 Endpoints da API

### Autenticação
- `POST /sessions` - Login de usuário
- `POST /users` - Cadastro de novo usuário

### Gestão
- `GET /users` - Listar usuários (requer autenticação)
- `GET /cloro-residual` - Listar registros de cloro
- `POST /cloro-residual` - Criar novo registro de cloro
- `GET /efluentes` - Listar registros de efluentes
- `POST /efluentes` - Criar novo registro de efluentes
- `GET /pocos` - Listar registros de poços
- `POST /pocos` - Criar novo registro de poços

## 👨‍💻 Autor

**Victor Bitencourt**

- GitHub: [@vhbiten](https://github.com/vhbiten)

## 📄 Licença

Este projeto está sob a licença ISC.

---
