package com.aminterprise.mutlu.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aminterprise.mutlu.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	@Query("SELECT DISTINCT obj FROM Order obj JOIN FETCH obj.events "
			+ " WHERE obj.status = 0 ORDER BY obj.moment ASC")
	List<Order> findOrdersPending();
	
	
	@Query("SELECT DISTINCT obj FROM Order obj JOIN FETCH obj.events "
			+ " WHERE obj.status = 1 ORDER BY obj.moment ASC")
	List<Order> findOrdersConclused();
}


