package com.example.supermakertback.service;

import com.example.supermakertback.Model.ItemVenda;
import com.example.supermakertback.Model.Produto;
import com.example.supermakertback.Model.Venda;
import com.example.supermakertback.repository.ItemVendaRepository;
import com.example.supermakertback.repository.ProdutoRepository;
import com.example.supermakertback.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    public Venda criarVenda() {

        Venda venda = new Venda();
        venda.setData(LocalDateTime.now());
        venda.setStatus("ABERTA");
        venda.setTotal(0.0);

        return vendaRepository.save(venda);
    }

    public Venda adicionarProduto(Long vendaId, String codigoBarras) {

        Venda venda = vendaRepository.findById(vendaId).orElseThrow();

        Produto produto = produtoRepository.findByCodigoBarras(codigoBarras).orElseThrow();

        ItemVenda item = new ItemVenda();
        item.setVenda(venda);
        item.setProduto(produto);
        item.setQuantidade(1);

        Double subtotal = produto.getPreco();
        item.setSubtotal(subtotal);

        itemVendaRepository.save(item);

        Double novoTotal = venda.getTotal() + subtotal;
        venda.setTotal(novoTotal);

        return vendaRepository.save(venda);
    }

    public Venda finalizarVenda(Long vendaId) {

        Venda venda = vendaRepository.findById(vendaId).orElseThrow();

        venda.setStatus("FINALIZADA");

        return vendaRepository.save(venda);
    }
}