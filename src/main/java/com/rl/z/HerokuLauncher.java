package com.rl.z;

import com.rl.z.config.SecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;

@SpringBootApplication(scanBasePackages = "org.iotable.enterprise.*",
        exclude = {
                JacksonAutoConfiguration.class,
                SecurityAutoConfiguration.class,
                DataSourceAutoConfiguration.class
        })
@Import({SecurityConfig.class})
public class HerokuLauncher extends SpringBootServletInitializer {

    public static void main(String[] args) {
        System.getProperties().put("server.port", Integer.parseInt(System.getenv("PORT")));
        SpringApplication.run(HerokuLauncher.class, args);
    }
}