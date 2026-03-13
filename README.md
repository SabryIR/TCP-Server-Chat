# TCP-Server-Chat

## Foco

Redes TCP, Event Emitters, Gerenciamento de Conexões.

## Descrição

Criar um servidor de chat onde múltiplos usuários se conectam por linha de comando ou terminal. Quando alguém digita, a mensagem vai para todos os outros clientes conectados.

## Conceitos reforçados

- `net`: Criando socket server TCP (sem usar HTTP/WebSockets).
- **Event Emitters:** O próprio servidor é um emissor de eventos (`connection`, `message`).
- **Escopo e Referências:** Manter uma lista de clientes conectados em memória.
- **I/O Síncrono/Assíncrono:** Lidar com a entrada padrão (`stdin`) dos clientes sem travar o servidor.

## Roteiro de desenvolvimento

- **Dia 1-2:** Servidor básico `net.createServer`. Cliente básico (um script que conecta via TCP). Testar se consegue enviar texto "Olá" e receber eco do servidor.
- **Dia 3-4:** Gerenciamento de clientes. Criar um array `clients = []`. Quando uma conexão entra, salvar a referencia do socket no array e avisar aos outros ("Usuário X entrou").
- **Dia 5:** Broadcast de mensagens. Capturar evento `data` de um cliente e enviar para todos os outros. Cuidado para não enviar a mensagem pra si mesmo (infinite loop).
- **Dia 6-7:** Encapsulamento de dados. Em vez de mandar texto puro, crie um objeto JSON `{ user: 'Fulano', msg: 'Oi' }` e parse no servidor antes de reenviar.