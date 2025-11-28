import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findOrderList} from "../feature/payment/PaymentAPI.js";

export function OrderList(){
    const dispatch = useDispatch();
    const orderList = useSelector((state)=>state.payment.orderList);
    useEffect(() => {
        dispatch(findOrderList());
    }, [dispatch]);
    console.log(orderList);
    return(
        <div>
            <h2>주문내역</h2>
            {orderList && orderList.map(item=>
                <div>
                    <p>주문번호: {item.orderId}</p>
                    <p>주문상품: {item.orderName}</p>
                    <p>결제금액: {item.totalPrice ? item.totalPrice.toLocaleString() : 0}원</p>
                    <p>주문날짜: {item.odate}</p>
                </div>
            )}
        </div>
    );
}