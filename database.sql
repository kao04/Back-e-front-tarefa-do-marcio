-- Script SQL para criar a tabela filmes_kao04 no banco web_03ma
-- Execute este script no banco de dados web_03ma

USE web_03ma;

CREATE TABLE IF NOT EXISTS filmes_kao04 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    diretor VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    genero VARCHAR(100),
    sinopse TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
