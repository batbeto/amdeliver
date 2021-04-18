package com.aminterprise.mutlu.controllers;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.aminterprise.mutlu.dto.OrderDTO;
import com.aminterprise.mutlu.repositories.OrderRepository;
import com.aminterprise.mutlu.services.OrderService;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
	
	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private OrderService service;
	
	@GetMapping
	public ResponseEntity<List<OrderDTO>> findAll(){
		List<OrderDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public ResponseEntity<OrderDTO> insert(@RequestBody OrderDTO dto){
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
				buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody OrderDTO newOrder){
		newOrder = service.updateOrder(id, newOrder);
		return ResponseEntity.ok().body(newOrder);
	}
		
	@PutMapping("/{id}/conclused")
	public ResponseEntity<OrderDTO> setConclused(@PathVariable Long id){
		OrderDTO dto = service.setConclused(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}/pending")
	public ResponseEntity<OrderDTO> setPending(@PathVariable Long id){
		OrderDTO dto = service.setPending(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<OrderDTO> deleteById(@PathVariable Long id){
		try {
			repository.deleteById(id);
			return new ResponseEntity<OrderDTO>(HttpStatus.OK);
		}catch(NoSuchElementException nsee){
			return new ResponseEntity<OrderDTO>(HttpStatus.NOT_FOUND);
		}
	}
}
