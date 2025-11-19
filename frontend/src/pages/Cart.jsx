import {CartHeader} from "../components/cart/CartHeader.jsx";
import CartShippingInfo from "../components/cart/CartShippingInfo.jsx"
import {CartItem} from "../components/cart/CartItem.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {showCart} from "../feature/cart/cartAPI.js";
import {useNavigate} from "react-router-dom";
import '../styles/cart/cart.css';

export function Cart(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goToCheckout = () => {
        navigate("/checkout")
    }
    useEffect(() => {
        dispatch(showCart());
    }, [dispatch]);
    return(
        <div className="cart-page-container">
            <CartHeader/>
            <CartItem/>
            <CartShippingInfo/>
            <div className="cart-footer-buttons">
                <button className="btn-primary" onClick={goToCheckout}>제품 주문하기</button>
            </div>
        </div>
    );
}