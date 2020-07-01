package com.example.customBlog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CustomBlogApplication

fun main(args: Array<String>) {
	runApplication<CustomBlogApplication>(*args)
}
