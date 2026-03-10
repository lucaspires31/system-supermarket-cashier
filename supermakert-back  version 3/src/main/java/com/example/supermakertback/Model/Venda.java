package com.example.supermakertback.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
    public class Venda {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private Double total;

        private LocalDateTime data;

        private String status; // ABERTA, FINALIZADA

        @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL)
        private List<ItemVenda> itens;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ItemVenda> getItens() {
        return itens;
    }

    public void setItens(List<ItemVenda> itens) {
        this.itens = itens;
    }
    }

