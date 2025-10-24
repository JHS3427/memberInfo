package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateCartRepository implements CartRepository{
    private JdbcTemplate jdbcTemplate;

    public JdbcTemplateCartRepository(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }



    @Override
    public int add(CartItem cartItem){
        String sql = """
                insert into cart(size, qty, pid, id, cdate)
                values(?, ?, ?, ?, now());
                """;
        Object[] params ={
                cartItem.getSize(),
                cartItem.getQty(),
                cartItem.getPid(),
                cartItem.getId()
        };
        return jdbcTemplate.update(sql,params);
    }
    @Override
    public CartItem checkQty(CartItem cartItem){
        String sql ="""
          select ifnull(Max(cid),0) as cid, count(*) 
          as checkQty from cart 
          where pid = ? and size=? and id = ?;
         """;
        Object[] params = { cartItem.getPid(),cartItem.getSize(),cartItem.getId()};
        return jdbcTemplate.queryForObject(sql,new BeanPropertyRowMapper<>(CartItem.class),params);
    }

    @Override
    public int updateQty(CartItem cartItem){
        String sql = "";
        if(cartItem.getType().equals("+")){
            sql = "update cart set qty = qty +1 where cid =?";
        }
        else{
            sql = "update cart set qty = qty -1 where cid =?";
        }
        return jdbcTemplate.update(sql, cartItem.getCid());
    }

    @Override
    public CartItem getCount(CartItem cartItem){
        String sql = "select ifnull(sum(qty), 0)as sumQty from cart where id = ?";
        //장바구니에 넣은게 없는 사람은 null값이 나오고, 리액트는 undefined로 나와서
        //SQL에서 이걸 ifnull로 0으로 바꿔서 넘긴다.
        return jdbcTemplate.queryForObject(sql,
                new BeanPropertyRowMapper<>(CartItem.class),
                cartItem.getId());
    }

    @Override
    public List<CartListResponse> findList(CartItem cartItem){
        String sql = """
                select * from view_cartList where id=?;
                
                """;
        Object[] params = {cartItem.getId()};
        return jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(CartListResponse.class),
                params);
    }

    @Override
    public int deleteItem(CartItem cartItem){
        String sql = "delete from cart where cid =?";
        return jdbcTemplate.update(sql,cartItem.getCid());
    }

}