# TCP Server Chat

Um sistema de chat multiusuário simples e eficiente implementado em **Node.js** utilizando o módulo nativo `net` para comunicação via protocolo TCP.

## Sobre o Projeto

Este projeto demonstra como criar uma arquitetura cliente-servidor utilizando sockets TCP. O servidor atua como um concentrador (hub), recebendo mensagens de um cliente e realizando o broadcast (transmissão) para todos os outros usuários conectados, garantindo que a mensagem original não seja reenviada ao remetente.

Este projeto foi desenvolvido para fins de estudo de redes e prática de programação assíncrona com Node.js. Logo, bugs e comportamentos indesejáveis são esperados.

### Principais Características

- **Protocolo TCP:** comunicação direta e de baixo nível.
- **Multi-usuário:** suporte a múltiplos clientes conectados simultaneamente.
- **Broadcast inteligente:** o servidor distribui as mensagens para todos, exceto para quem as enviou.
- **Gerenciamento de conexões:** identificação de desconexões e limpeza automática sockets inativos.
- **Formato JSON:** as mensagens são estruturadas em objetos JSON para facilitar a expansão (contendo usuário e mensagem).

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) (Ambiente de execução)
- Módulo `net` (Comunicação TCP)
- Módulo `readline` (Interface de linha de comando)

## Pré-requisitos

Antes de começar, você deve ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (Versão LTS recomendada)
- Um terminal (CMD, PowerShell, Bash, etc.)

## Como Executar

Siga os passos abaixo para rodar o chat localmente:

### 1. Clonar o Repositório

```
git clone https://github.com/SabryIR/TCP-Server-Chat.git
cd TCP-Server-Chat
```

### 2. Iniciar o Servidor 

Abra um terminal e execute o comando abaixo. O servidor ficará aguardando conexões na porta `8080`.

```
node server.js
```

### 3. Iniciar os Clientes

Abra **novos terminais** para cada usuário que desejar conectar. Em cada terminal, execute:

```
node client.js
```

### 4. Usando o Chat

1. Ao conectar, o cliente solicitará um **Username** (nome de usuário).
2. Digite seu nome e aperte `Enter`.
3. Digite sua mensagem e aperte `Enter` para enviá-la aos outros.
4. Para sair, digite `exit` ou pressione `Ctrl+C`.

## Estrutura de Arquivos

- `server.js`: contém a lógica do servidor TCP, gerenciamento da lista de clientes conectados e a função broadcast.
- `client.js`: contém a lógica do cliente, interface de entrada de texto via terminal e o tratamento de recebimento de mensagens.
