import {useDispatch, useSelector} from "react-redux";
import {removeCart, updateCart} from "../../feature/cart/cartAPI.js";
import {RiDeleteBin6Line} from "react-icons/ri";

export function CartItem(){
    const cartList = useSelector((state) => state.cart.cartList);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch= useDispatch();
    console.log(cartList);

    return(
      <div className="cart-item-list">
          {/*if(cartList.qty < 0) {}*/}
          {cartList.map((item)=> (
              <div key={item.cid} className="cart-item-row">
                  {item.image && (
                      <img src={`${item.image}`} alt={item.name} />
                  )}

                  <span className="item-name">{item.name && item.name}</span>
                  <span className="item-price">
                      {item.price && item.price.toLocaleString() + '원'}
                  </span>
                  <div className='cart-quantity'>
                      <button type='button'
                              onClick={()=>{item.qty > 1 && dispatch(updateCart(item.cid, "-"))}}>-</button>
                      <input type='text' value={item.qty} readOnly/>
                      <button type='button'
                              onClick={()=>{dispatch(updateCart(item.cid, "+"))}}>+</button>
                      <button className='cart-remove' onClick={()=>{dispatch(removeCart(item.cid))}}>
                      <RiDeleteBin6Line />
                      </button>
                  </div>
              </div>
    ))}
          {cartList.length > 0 ? (
              <div className="cart-total-summary">
                  <span className="total-label">총 금액 :</span>
                  <span className="total-value">{totalPrice.toLocaleString()}원</span>
              </div>
          ) : (
              <div className="cart-empty-message">
                  <p>장바구니에 상품이 없습니다.</p>
              </div>
          )}
      </div>
    );
}