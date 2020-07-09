package com.example.customBlog.controller

import mu.KLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tests")
class TestController(
        @Value("\${notion.v2.token}")
        private val notionToken: String
) {

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    fun logging(): String {
        logger().info("hello world")
        return CONSTANT_VAL
    }

    @GetMapping("token")
    @ResponseStatus(HttpStatus.OK)
    fun getNotionToken(): String {
        return notionToken
    }

    companion object: KLogging() {
        const val CONSTANT_VAL = "상수값"
    }
}
