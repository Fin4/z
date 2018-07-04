package com.rl.z.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Getter @Setter @NoArgsConstructor
public class Place {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Float latitude;
    @NotNull
    private Float longitude;

    private String title;

    private String description;
}
