package com.example.supermakertback.Controller;

import com.example.supermakertback.Model.Produto;
import com.example.supermakertback.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @GetMapping("/{codigo}")
    public ResponseEntity<?> buscarProduto(@PathVariable String codigo) {

        Optional<Produto> produto = service.buscarPorCodigo(codigo);

        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        }

        return ResponseEntity.notFound().build();
    }
}