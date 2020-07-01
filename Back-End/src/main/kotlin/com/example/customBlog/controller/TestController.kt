package com.example.customBlog.controller

import mu.KLogging
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tests")
class TestController {
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    fun logging(): String {
        logger().info("hello world")
        return CONSTANT_VAL
    }

    companion object: KLogging() {
        const val CONSTANT_VAL = "상수값"
    }
}
