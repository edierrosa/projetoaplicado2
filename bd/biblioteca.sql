-- CREATE DATABASE biblioteca;
-- USE biblioteca;

-- CATEGORIA
CREATE TABLE CATEGORIA (
    ID_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- LIVROS
CREATE TABLE LIVROS (
    ID_livro INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    edicao VARCHAR(100),
    ano_publicacao DATE,
    localizacao VARCHAR(100),
    data_cadastro DATE NOT NULL,
    disponibilidade BOOLEAN DEFAULT TRUE,
    numero_exemplares INT NOT NULL,
    numero_disponiveis INT NOT NULL,
    FK_CATEGORIA_ID_categoria INT NOT NULL,
    FOREIGN KEY (FK_CATEGORIA_ID_categoria) REFERENCES CATEGORIA(ID_categoria) ON DELETE RESTRICT
);

-- USUARIO
CREATE TABLE USUARIO (
    ID_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(100) NOT NULL,
    data_nasc DATE NOT NULL,
    data_cadastro DATE NOT NULL
);

-- ENDERECO
CREATE TABLE ENDERECO (
    ID_endereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(100) NOT NULL,
    complemento VARCHAR(200),
    bairro VARCHAR(100) NOT NULL,
    cep VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL
);

-- CONTATO
CREATE TABLE CONTATO (
    ID_contato INT PRIMARY KEY AUTO_INCREMENT,
    telefone VARCHAR(100),
    email VARCHAR(100) NOT NULL
);

-- VINCULO
CREATE TABLE VINCULO (
    ID_vinculo INT PRIMARY KEY AUTO_INCREMENT,
    tipo_vinculo VARCHAR(100) NOT NULL,
    instituicao VARCHAR(100),
    matricula VARCHAR(100)
);

-- EMPRESTIMO
CREATE TABLE EMPRESTIMO (
    ID_emprestimo INT PRIMARY KEY AUTO_INCREMENT,
    data_emprestimo DATE NOT NULL,
    data_prevista DATE NOT NULL,
    data_devolucao DATE,
    status ENUM('ativo', 'concluido', 'atrasado', 'cancelado') NOT NULL,
    FK_USUARIO_ID_usuario INT NOT NULL,
    FK_LIVROS_ID_livro INT NOT NULL,
    CHECK (data_prevista >= data_emprestimo),
    FOREIGN KEY (FK_USUARIO_ID_usuario) REFERENCES USUARIO(ID_usuario),
    FOREIGN KEY (FK_LIVROS_ID_livro) REFERENCES LIVROS(ID_livro)
);

-- MULTA
CREATE TABLE MULTA (
    ID_multa INT PRIMARY KEY AUTO_INCREMENT,
    valor_multa DECIMAL(6,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status_pagamento ENUM('pendente', 'pago', 'isento') NOT NULL,
    FK_EMPRESTIMO_ID_emprestimo INT NOT NULL,
    FOREIGN KEY (FK_EMPRESTIMO_ID_emprestimo) REFERENCES EMPRESTIMO(ID_emprestimo)
);

-- RESERVA
CREATE TABLE RESERVA (
    ID_reserva INT PRIMARY KEY AUTO_INCREMENT,
    data_reserva DATE NOT NULL,
    status ENUM('ativa', 'cancelada', 'concluida') NOT NULL,
    data_notificacao DATE,
    FK_USUARIO_ID_usuario INT NOT NULL,
    FK_LIVROS_ID_livro INT NOT NULL,
    FOREIGN KEY (FK_USUARIO_ID_usuario) REFERENCES USUARIO(ID_usuario) ON DELETE CASCADE,
    FOREIGN KEY (FK_LIVROS_ID_livro) REFERENCES LIVROS(ID_livro) ON DELETE CASCADE
);

-- Tabelas de associação com chaves compostas e ON DELETE CASCADE

CREATE TABLE USUARIO_ENDERECO (
    FK_USUARIO_ID_usuario INT NOT NULL,
    FK_ENDERECO_ID_endereco INT NOT NULL,
    PRIMARY KEY (FK_USUARIO_ID_usuario, FK_ENDERECO_ID_endereco),
    FOREIGN KEY (FK_USUARIO_ID_usuario) REFERENCES USUARIO(ID_usuario) ON DELETE CASCADE,
    FOREIGN KEY (FK_ENDERECO_ID_endereco) REFERENCES ENDERECO(ID_endereco) ON DELETE CASCADE
);

CREATE TABLE CONTATO_USUARIO (
    FK_USUARIO_ID_usuario INT NOT NULL,
    FK_CONTATO_ID_contato INT NOT NULL,
    PRIMARY KEY (FK_USUARIO_ID_usuario, FK_CONTATO_ID_contato),
    FOREIGN KEY (FK_USUARIO_ID_usuario) REFERENCES USUARIO(ID_usuario) ON DELETE CASCADE,
    FOREIGN KEY (FK_CONTATO_ID_contato) REFERENCES CONTATO(ID_contato) ON DELETE CASCADE
);

CREATE TABLE USUARIO_VINCULADO (
    FK_VINCULO_ID_vinculo INT NOT NULL,
    FK_USUARIO_ID_usuario INT NOT NULL,
    PRIMARY KEY (FK_VINCULO_ID_vinculo, FK_USUARIO_ID_usuario),
    FOREIGN KEY (FK_VINCULO_ID_vinculo) REFERENCES VINCULO(ID_vinculo) ON DELETE CASCADE,
    FOREIGN KEY (FK_USUARIO_ID_usuario) REFERENCES USUARIO(ID_usuario) ON DELETE CASCADE
);
