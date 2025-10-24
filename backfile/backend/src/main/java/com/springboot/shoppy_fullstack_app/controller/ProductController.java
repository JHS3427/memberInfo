package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailinfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQna;
import com.springboot.shoppy_fullstack_app.dto.ProductReturn;
import com.springboot.shoppy_fullstack_app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }


    @GetMapping("/all")
    public List<Product> all(){
        return productService.findAll();
    }

    @PostMapping("/pid")
    public Product pid(@RequestBody Product product){
        return productService.findByPid(product.getPid());
    }


    @PostMapping("/detailinfo")
    public ProductDetailinfo detailinfo(@RequestBody Product Product){
        return productService.findDetailinfo(Product.getPid());
    }

    @PostMapping("/qna")
    public List<ProductQna> qna(@RequestBody Product Product){
        return productService.findQna(Product.getPid());
    }

    @GetMapping("/return")
    public ProductReturn getReturn() {
        return productService.findReturn();
    }


}
