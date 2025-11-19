import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import '../styles/successpage.css';

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
        // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function confirm() {
            const response = await fetch("/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();

            if (!response.ok) {
                // 결제 실패 비즈니스 로직을 구현하세요.
                navigate(`/fail?message=${json.message}&code=${json.code}`);
                return;
            }

            // 결제 성공 비즈니스 로직을 구현하세요.
        }
        confirm();
    }, []);

    return (
        <div className="policy-page">
            <div className="policy-container">
                <div className="success-icon">✓</div>
                <h1>
                    결제 성공
                </h1>
                <p className="success-message">결제가 성공적으로 완료되었습니다.</p>
                <div className="payment-details-box">
                    <p>
                        <span>주문번호:</span>
                        <span>{searchParams.get("orderId")}</span>
                    </p>
                    <p>
                        <span>결제 금액:</span>
                        <span className="final-amount">
                            {Number(searchParams.get("amount")).toLocaleString()}원
                        </span>
                    </p>
                    <p>
                        <span>paymentKey:</span>
                        <span className="payment-key">{searchParams.get("paymentKey")}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}