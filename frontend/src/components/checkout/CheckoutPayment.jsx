import { useEffect, useRef } from "react";
// 1. (중요) ANONYMOUS를 다시 임포트합니다.
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

// 2. 공식 문서 예제에 있던 '문서용 공개 키'를 사용합니다.
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPayment({ totalPrice, cartList }) {
    const widgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const agreementWidgetRef = useRef(null);

    // useEffect (위젯 렌더링) 부분은 변경할 필요가 없습니다.
    useEffect(() => {
        if (totalPrice <= 0) return;

        const initializeWidget = async () => {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                const widgets = tossPayments.widgets({
                    customerKey: ANONYMOUS,
                });
                widgetRef.current = widgets;

                await widgets.setAmount({
                    currency: "KRW",
                    value: totalPrice,
                });

                const paymentMethodsWidget = await widgets.renderPaymentMethods({
                    selector: "#payment-methods",
                    variantKey: "DEFAULT",
                });
                paymentMethodsWidgetRef.current = paymentMethodsWidget;

                const agreementWidget = await widgets.renderAgreement({
                    selector: "#payment-agreement",
                    variantKey: "DEFAULT",
                });
                agreementWidgetRef.current = agreementWidget;

            } catch (error) {
                console.error("Error initializing widgets:", error);
            }
        };

        initializeWidget();
        return () => {
            if (paymentMethodsWidgetRef.current) {
//                 paymentMethodsWidgetRef.current.cleanup();
            }
            if (agreementWidgetRef.current) {
                agreementWidgetRef.current.cleanup();
            }
        };
    }, [totalPrice]);


    // ⭐️ 2. "결제하기" 버튼 클릭 시 실행될 함수
    const handlePayment = async () => {
        const widgets = widgetRef.current;

        if (!widgets || totalPrice <= 0) {
            alert("결제 위젯이 준비되지 않았거나 결제 금액이 올바르지 않습니다.");
            return;
        }

        // ⭐️ 3. cartList를 기반으로 동적 orderName 생성
        let formattedOrderName = "주문 상품"; // 기본값

        // (cartList가 있고, 상품이 1개 이상일 때)
        if (cartList && cartList.length > 0) {
            // 💡 중요: cartList[0].name을 사용합니다.
            //    만약 상품명 속성이 .name이 아니라 .productName 등이라면 이 부분을 수정하세요.
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

                // ⭐️ 4. 생성된 주문명을 사용합니다.
                orderName: formattedOrderName,

                successUrl: `${window.location.origin}/checkout/success`,
                failUrl: `${window.location.origin}/checkout/fail`,
            });
        } catch (error) {
            console.error("Payment error:", error);
            alert(`결제 중 오류가 발생했습니다: ${error.message}`);
        }
    };

    return (
        <div className="payment-summary-box">
            <h3>최종 결제 금액</h3>
            <div className="payment-summary-details">
                {/* ... (금액 표시 부분은 동일) ... */}
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

            {/* --- ⭐️ 1. 토스 결제 수단 UI가 렌더링될 곳 ⭐️ --- */}
            <div id="payment-methods" />

            {/* --- ⭐️ 2. 토스 약관 동의 UI가 렌더링될 곳 ⭐️ --- */}
            <div id="payment-agreement" />

            {/* --- ⭐️ 3. '결제하기' 버튼 ⭐️ --- */}
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