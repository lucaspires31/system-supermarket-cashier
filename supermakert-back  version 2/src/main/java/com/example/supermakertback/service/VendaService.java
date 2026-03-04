package com.example.supermakertback.service;

import com.example.supermakertback.Model.Venda;
import com.example.supermakertback.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    public Venda criarVenda() {
        Venda venda = new Venda();
        venda.setData(LocalDateTime.now());
        venda.setStatus("ABERTA");
        venda.setTotal(0.0);
        return vendaRepository.save(venda);
    }
}