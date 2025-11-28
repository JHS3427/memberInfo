import {CartHeader} from "../components/cart/CartHeader.jsx";
import CartShippingInfo from "../components/cart/CartShippingInfo.jsx"
import {CartItem} from "../components/cart/CartItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {showCart} from "../feature/cart/cartAPI.js";
import {useNavigate} from "react-router-dom";
import '../styles/cart/cart.css';
import Swal from "sweetalert2";

export function Cart(){
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goToCheckout = () => {
        if(totalPrice > 0){
            navigate("/checkout")
        } else {
            Swal.fire({
                icon: "warning",
                title: "",
                text: "주문 상품이 없습니다!",
            });
        }
    }
    useEffect(() => {
        const userInfo = localStorage.getItem('loginInfo');
        if(!userInfo){
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인이 필요합니다.",
            });
            navigate("/login");
            return;
        }
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