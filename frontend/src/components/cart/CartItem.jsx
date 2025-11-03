import {useDispatch, useSelector} from "react-redux";

export function CartItem(){
    const cartList = useSelector((state) => state.cart.cartList);
    console.log(cartList);

    return(
      <div>
          {cartList.map((item)=> (
              <div key={item.pid} style={{display:'flex', alignItems:'center', borderBottom:'1px solid #eee', padding:'10px'}}>
                  <img src={`${item.pid.image}`} alt={item.name} style={{width: '200px', height:'160px', marginRight:'20px'}} />
                  <p>{item.pid.name}</p>
                  <p>{item.qty}개</p>
                  <p>{item.pid.price.toLocaleString()}원</p>
              </div>
          ))}
      </div>
    );
}