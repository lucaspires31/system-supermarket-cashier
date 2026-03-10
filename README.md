Sistema de Caixa Supermercado

Este projeto é um sistema de caixa para supermercados, desenvolvido em Java (Spring Boot) para o backend e React.js para o frontend, com banco de dados MySQL. O sistema permite registrar vendas, calcular total, troco, gerar nota fiscal e imprimir, além de suportar diferentes opções de pagamento.

📂 Versões do Sistema

O repositório contém três versões principais:

Versão 1 - Básica

Descrição: Primeira versão do sistema, com cadastro de produtos, cálculo de total e gerenciamento de quantidade.

Funcionalidades:

Adicionar produtos pelo código de barras.

Exibir subtotal e total.

Cancelar último item.

Ferramentas Utilizadas: Java (Spring Boot), React.js, HTML, CSS.

Observações: Não possui modais de cliente ou opções de pagamento.

Versão 2 - Cliente e Pagamento

Descrição: Adiciona suporte a cadastro do cliente e opções de pagamento (dinheiro, cartão e Pix).

Funcionalidades:

Modal para inserir dados do cliente (nome, contato, CPF).

Modal de pagamento com:

Dinheiro: cálculo de troco.

Pix: exibe QR Code.

Cartão: pagamento finalizado.

Modal estilizado com botões verticais e cores diferenciadas.

Ferramentas Utilizadas: Java (Spring Boot), React.js, CSS moderno, Axios para chamadas API.

Observações: Versão intermediária, com interface de pagamento funcional, mas sem geração de nota fiscal.

Versão 3 - Completa

Descrição: Versão final, com todas as funcionalidades, incluindo nota fiscal e impressão.

Funcionalidades:

Tudo da Versão 2.

Geração de nota fiscal após finalizar venda:

Lista todos os produtos, quantidade, valor unitário e total.

Opção de imprimir a nota diretamente do navegador.

Atualização de imagens de produtos através de URLs públicas.

Ferramentas Utilizadas:

Backend: Java, Spring Boot, MySQL.

Frontend: React.js, Axios, CSS moderno.

Outros: Flaticon para imagens de produtos, API de QR Code.

Observações: Versão completa, pronta para uso em ambiente real de supermercado ou teste.

⚙️ Tecnologias e Ferramentas

Frontend:

React.js

CSS personalizado

Axios para requisições HTTP

Backend:

Java

Spring Boot (REST API)

MySQL

Extras:

Flaticon (imagens de produtos)

QR Code (Pix)

Áudio bip para adicionar produtos

📝 Como Usar
Pré-requisitos

Java 21+

Node.js 18+

MySQL 8+

Git

Instalação

Clone o repositório:

git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/lucaspires31/system-supermarket-cashier)

Backend:

cd backend
mvn clean install
mvn spring-boot:run

Certifique-se de configurar o arquivo application.properties com o usuário e senha do MySQL.

Frontend:

cd frontend
npm install
npm start

O frontend roda em http://localhost:5173 e se comunica com o backend em http://localhost:8080.

Banco de Dados

Execute o SQL para criar a tabela de produtos com os links de imagem corretos.

Exemplo de tabela produto:

CREATE TABLE produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo_barras VARCHAR(20),
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    estoque INT,
    imagem VARCHAR(255)
);

Insira produtos com os links de imagens públicas do Flaticon.

Como Funciona o Sistema

Adicionar Produtos: Digite o código de barras e a quantidade. Pressione Enter ou clique em Adicionar.

Cancelar Item: Remove o último item adicionado.

Finalizar Venda:

Insira os dados do cliente.

Escolha a forma de pagamento.

Se for dinheiro, insira valor recebido e veja o troco.

Se for Pix, escaneie o QR Code.

Se for cartão, clique em confirmar.

Nota Fiscal: Após finalizar, a nota é exibida com todos os produtos e valor total, com opção de impressão.
