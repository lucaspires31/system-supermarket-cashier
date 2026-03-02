package com.example.supermakertback.service;

import com.example.supermakertback.Model.Produto;
import com.example.supermakertback.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public Optional<Produto> buscarPorCodigo(String codigo) {
        return repository.findByCodigoBarras(codigo);
    }
}
