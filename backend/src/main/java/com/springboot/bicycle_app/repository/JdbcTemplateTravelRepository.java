package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.Travel;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateTravelRepository implements TravelRepository{
    private JdbcTemplate jdbcTemplate;

    public JdbcTemplateTravelRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Travel> findFood() {
        System.out.println("repository ==> ");
    
        String sql = """
                        select 
                            fid,
                            fname, 
                            flike, 
                            score, 
                            evaluation, 
                            tag, 
                            image1, 
                            image2,
                            image3,
                            fullImage1,
                            fullImage2,
                            fullImage3,
                            description
                        from travel_food
                    """;
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        List<Travel> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Travel.class));

        return list;
    }
}
