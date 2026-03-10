package com.example.supermakertback.Controller;

import com.example.supermakertback.Model.Venda;
import com.example.supermakertback.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "http://localhost:5173")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping
    public Venda criarVenda() {
        return vendaService.criarVenda();
    }

    @PostMapping("/{id}/produto/{codigo}")
    public Venda adicionarProduto(
            @PathVariable Long id,
            @PathVariable String codigo
    ) {
        return vendaService.adicionarProduto(id, codigo);
    }

    @PostMapping("/{id}/finalizar")
    public Venda finalizarVenda(@PathVariable Long id) {
        return vendaService.finalizarVenda(id);
    }
}