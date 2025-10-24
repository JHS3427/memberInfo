package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class JdbcTemplateMemberRepository implements MemberRepository{

    private final JdbcTemplate jdbcTemplate;

    //생성자 Autowired는 사용자가 임의로 생성한 것에 붙이는 거. 여기는 붙여도, 안붙여도 된다.
    public JdbcTemplateMemberRepository(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource); //커넥션 생성
    }

    @Override
    public int save(Member member){
        //DB에 JdbcTemplate 객체를 이용하여 DB의 member 테이블에 insert작업을 해야함.
        String sql = "Insert into member(id,pwd,name,phone,email,mdate) values (?,?,?,?,?,now())";//prepareStatement
        Object[] param = {member.getId(),
                        member.getPwd(),
                        member.getName(),
                        member.getPhone(),
                        member.getEmail()};

        //int rows = jdbcTemplate.update(sql,member.getId(),member.getPwd(),member.getName(),member.getPhone(),member.getEmail());
        int rows = jdbcTemplate.update(sql,param);
        return rows;
    }

    public Long findById(String id){
        String sql = "Select count(id) from member where id=?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class ,id);
        System.out.println("count:"+count);
        return count;
    }

    public String login(String id){
        String sql = "select pwd from member where id=?";
//        Object[] params = new Object[](member.getId(), member.getPwd()};
        Member member = jdbcTemplate.queryForObject(sql,
                new BeanPropertyRowMapper<>(Member.class),//RowMapper 타입-이 방식은 특정 클래스 내의 필드명을 찾는게 적합함
                                id);//만약 String, Long처럼 일반타입으로 찾을거면 이전처럼 Long.class 이거 넣기
        return member.getPwd();
    }
}
