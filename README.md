# Yourself 

## 📋 Descrição do Projeto
Bem-vindo ao projeto Yourself! Este guia irá auxiliá-lo na configuração e inicialização da aplicação de forma rápida e simples.

## 🚀 Pré-requisitos
- Node.js (versão recomendada: 18.x ou superior)
- npm (geralmente instalado com Node.js)
- Conexão com a internet para instalação de dependências
- Acesso à linha de comando/terminal

## 🔧 Configuração Inicial

### 1. Clonar o Repositório
```bash
git clone https://github.com/fmacedosantos/yourself.git
cd yourself
```

### 2. Instalação de Dependências
Instale todas as dependências do projeto com:
```bash
npm install
```

### 3. Instale Gpg4win
Acesse o [site](https://www.gpg4win.org/get-gpg4win.html) da ferramenta de descriptografia e baixe.

### 4. Configuração de Variáveis de Ambiente
Descriptografe as variáveis de ambiente:
```bash
npm run decrypt
```

### 5. Configuração de Endereço IP
Abra o arquivo `src/constants/Routes.ts` e altere a constante `IP` para o endereço IPv4 da sua máquina:
```typescript
const IP = 'SEU_ENDERECO_IPV4_AQUI';
```

### 6. Configurar API
- Baixe o [executável da API](https://github.com/fmacedosantos/yourself-API/blob/main/yourself-api.exe)
- Execute o executável em segundo plano, seguindo as instruções no [repositório](https://github.com/fmacedosantos/yourself-API.git).

## 🏃‍♂️ Iniciando a Aplicação
Após seguir todos os passos acima, inicie a aplicação:
```bash
npm start
```

## 🛠️ Solução de Problemas
- Certifique-se de que todas as etapas foram seguidas corretamente
- Verifique se o endereço IP está correto
- Confirme que a API está em execução antes de iniciar a aplicação

## 🤝 Contribuição
Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de fazer um pull request.

## 🆘 Suporte
Em caso de dúvidas, abra uma issue no repositório do GitHub ou entre em contato com o mantenedor do projeto.