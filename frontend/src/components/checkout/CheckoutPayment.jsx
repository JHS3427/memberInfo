export function CheckoutPayment({ totalPrice}) {
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

            <div className="agreement-section">
                <div className="agreement-item">
                    <input type="checkbox" id="agree-all" />
                    <label htmlFor="agree-all">
                        <strong>(필수)</strong> 주문할 제품의 제품명, 옵션, 제품가격, 배송 정보를 확인하였으며, 구매에 동의합니다.
                    </label>
                </div>
                <div className="agreement-item">
                    <input type="checkbox" id="agree-terms" />
                    <label htmlFor="agree-terms">
                        <strong>(필수)</strong> 개인정보 제3자 제공/위탁동의
                    </label>
                </div>
            </div>
            <div className="payment-button-section">
                <button className="payment-button">카카오페이 결제하기</button>
                <button className="payment-button">네이버페이 결제하기</button>
            </div>
        </div>
    );
}