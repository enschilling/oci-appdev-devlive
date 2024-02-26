package com.example.admessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/adapi")
public class AdMessageController {

    @Autowired
    AdMessageRepository adMessageRepository;

    @GetMapping("/admessage")
    public List<AdMessage> getAdMessage() {
        return adMessageRepository.findAll();
    }
}
