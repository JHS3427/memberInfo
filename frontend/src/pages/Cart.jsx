import {CartHeader} from "../components/cart/CartHeader.jsx";
import {CartShippingInfo} from "../components/cart/CartShippingInfo.jsx"
import '../styles/cart/cart.css';
import {CartItem} from "../components/cart/CartItem.jsx";

export function Cart(){
    return(
        <div className="cart-page-container">
            <CartHeader/>
            <CartItem/>
            <CartShippingInfo/>
            <div className="cart-footer-buttons">
                <button className="btn-primary">선택제품 주문하기</button>
                <button className="btn-primary">전체제품 주문하기</button>
            </div>
        </div>
    );
}