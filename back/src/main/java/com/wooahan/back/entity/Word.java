package com.wooahan.back.entity;

import com.wooahan.back.dto.Difficulty;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Word {
    @Id
    @Column(name ="word_name")
    private String name;

    @Column
    private int initial ;

    @Column(nullable = false)
    private String imgUrl;

    @Enumerated(EnumType.ORDINAL)
    private Difficulty difficulty;



}
