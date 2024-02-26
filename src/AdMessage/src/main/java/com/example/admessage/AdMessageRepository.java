package com.example.admessage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdMessageRepository extends JpaRepository<AdMessage, Long> {
}
