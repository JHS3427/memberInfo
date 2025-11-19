import React, {useEffect, useState} from 'react';
import '../../styles/cart/cartshipping.css'
import {useSelector} from "react-redux";

export default function CartShippingInfo() {
    const cartList = useSelector((state) => state.cart.cartList);
    const [cartInfo, setCartInfo] = useState({
        name: '',
        mobile: '',
        email: ''
    });
    const [recipientInfo, setRecipientInfo] = useState({
        name: '',
        contact: '',
        mobile: '',
        address: ''
    });
    useEffect(() => {
        if (cartList && cartList.length > 0) {
            const Data = cartList[0];
            setCartInfo({
                name: Data.uname || '',
                mobile: Data.uphone || '',
                email: Data.uemail || ''
            });
        }
    }, [cartList]);
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === 'orderer-name') {
            setCartInfo(prev => ({ ...prev, name: value }));
        } else if (id === 'orderer-mobile') {
            setCartInfo(prev => ({ ...prev, mobile: value }));
        } else if (id === 'orderer-email') {
            setCartInfo(prev => ({ ...prev, email: value }));
        }
    };
    return (
        <div className="checkout-info-container">
            <div className="form-section">
                <h2 className="form-section-title">주문자 정보</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="orderer-name">주문자명 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            {/* value에 state를 연결하여 DB값이 보이게 함 */}
                            <input
                                type="text"
                                id="orderer-name"
                                value={cartInfo.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="orderer-mobile" style={{marginLeft:'10px'}}>휴대폰번호 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="orderer-mobile"
                                value={cartInfo.mobile}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="orderer-email">이메일 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="orderer-email"
                                value={cartInfo.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. 수령인 정보 섹션 */}
            <div className="form-section">
                <div className="form-section-header">
                    <h2 className="form-section-title">수령인 정보</h2>
                    <div className="recipient-actions">
                        <div className="radio-group">
                            <input type="radio" id="same-as-orderer" name="recipient-type" defaultChecked />
                            <label htmlFor="same-as-orderer">주문자와 동일</label>
                            <input type="radio" id="new-address" name="recipient-type" />
                            <label htmlFor="new-address">새로운주소</label>
                        </div>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="recipient-name">수령자명 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input type="text" id="recipient-name"/>
                        </div>
                    </div>
                    <div className="form-group">
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipient-contact">연락처</label>
                        <div className="input-wrapper">
                            <input type="text" id="recipient-contact" placeholder="-없이 숫자만 입력" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipient-mobile" style={{marginLeft:'10px'}}>휴대폰번호 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input type="text" id="recipient-mobile"/>
                        </div>
                    </div>
                    <div className="form-group form-group-address">
                        <label htmlFor="recipient-zipcode">주소 <span className="required">*</span></label>
                        <div className="address-group">
                            <input type="text" id="recipient-address1" className="input-address" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

