import {useEffect, useRef, useState} from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

export function CheckoutPayment({ totalPrice, cartList }) {
    const widgetRef = useRef(null);
    // const paymentMethodsWidgetRef = useRef(null);
    // const agreementWidgetRef = useRef(null);
    // const [orderId, setOrderId] = useState(null);
    useEffect(() => {
        let isCancelled = false;

        const initializeWidget = async () => {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                if (isCancelled) return;

                const widgets = tossPayments.widgets({
                    customerKey: ANONYMOUS,
                });

                await widgets.setAmount({
                    currency: "KRW",
                    value: totalPrice,
                });

                if (isCancelled) return; // await 후에도 체크

                widgetRef.current = widgets;

                const methodContainer = document.getElementById("payment-methods");
                if (methodContainer && methodContainer.innerHTML === "") {
                    await widgets.renderPaymentMethods({
                        selector: "#payment-methods",
                        variantKey: "DEFAULT",
                    });
                }

                const agreementContainer = document.getElementById("payment-agreement");
                if (agreementContainer && agreementContainer.innerHTML === "") {
                    await widgets.renderAgreement({
                        selector: "#payment-agreement",
                        variantKey: "DEFAULT",
                    });
                }

            } catch (error) {
                console.error("Error initializing widgets:", error);
            }
        };

        initializeWidget();
        return () => {
            isCancelled = true;
            const paymentMethods = document.getElementById("payment-methods");
            if (paymentMethods) paymentMethods.innerHTML = "";

            const agreement = document.getElementById("payment-agreement");
            if (agreement) agreement.innerHTML = "";
        };
    }, []);

    const handlePayment = async () => {
        const widgets = widgetRef.current;

        if (!widgets || totalPrice <= 0) {
            alert("결제 위젯이 준비되지 않았거나 결제 금액이 올바르지 않습니다.");
            return;
        }

        let formattedOrderName = "주문 상품"; // 기본값
        if (cartList && cartList.length > 0) {
            const firstItemName = cartList[0].name;
            const remainingItemsCount = cartList.length - 1;

            if (remainingItemsCount > 0) {
                formattedOrderName = `${firstItemName} 외 ${remainingItemsCount}건`;
            } else {
                formattedOrderName = firstItemName;
            }
        }
        try {
            await widgets.requestPayment({
                orderId: `practice-order-${new Date().getTime()}`,
                orderName: formattedOrderName,
                successUrl: `${window.location.origin}/checkout/success`,
                failUrl: `${window.location.origin}/checkout/fail`,
            });
        } catch (error) {
            console.error("Payment error:", error); //
            alert(`결제 중 오류가 발생했습니다: ${error.message}`);
        }
    };

    return (
        <div className="payment-summary-box">
            <h3>최종 결제 금액</h3>
            <div className="payment-summary-details">
                <div className="payment-row">
                    <span className="label">총 판매금액</span>
                    <span className="value">{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="payment-row">
                    <span className="label">총 할인금액</span>
                    <span className="value">-0원</span>
                </div>
                <div className="payment-row">
                    <span className="label">총 배송비</span>
                    <span className="value">+0원</span>
                </div>
                <div className="final-price-row">
                    <span className="label">최종 결제 금액</span>
                    <span className="value">{totalPrice.toLocaleString()}원</span>
                </div>
            </div>

            <div id="payment-methods" />
            <div id="payment-agreement" />
            <div className="payment-button-section">
                <button
                    className="payment-button"
                    onClick={handlePayment} // 12번 함수 연결
                    disabled={totalPrice <= 0}
                >
                    {totalPrice > 0 ? `${totalPrice.toLocaleString()}원 결제하기` : "결제할 금액이 없습니다"}
                </button>
            </div>
        </div>
    );
}