package com.example.supermakertback.Model;

import jakarta.persistence.*;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="codigo_barras")
    private String codigoBarras;

    private String nome;

    private Double preco;

    private Integer estoque;

    private String imagem; // NOVO CAMPO

    public Long getId() {
        return id;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public String getNome() {
        return nome;
    }

    public Double getPreco() {
        return preco;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public String getImagem() {
        return imagem;
    }
}