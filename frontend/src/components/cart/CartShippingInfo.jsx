import React from 'react';
import '../../styles/cart/cartshipping.css'

export function CartShippingInfo() {
    return (
        <div className="checkout-info-container">
            {/* 1. 주문자 정보 섹션 */}
            <div className="form-section">
                <h2 className="form-section-title">주문자 정보</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="orderer-name">주문자명 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input type="text" id="orderer-name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="orderer-mobile" style={{marginLeft:'10px'}}>휴대폰번호 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input type="text" id="orderer-mobile"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="orderer-email">이메일 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input type="email" id="orderer-email"/>
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
                        {/* 이미지상 비어있는 오른쪽 셀 (레이아웃 유지용) */}
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
                            {/* 이미지에는 X 버튼이 없어서 여기도 뺐습니다. */}
                        </div>
                    </div>

                    {/* 주소 필드 (2열 합침) */}
                    <div className="form-group form-group-address">
                        <label htmlFor="recipient-zipcode">주소 <span className="required">*</span></label>
                        <div className="address-group">
                            <input type="text" id="recipient-address1" className="input-address" />
                            {/*<div className="address-detail-group">*/}
                            {/*    <input type="text" id="recipient-address2" className="input-address-detail" />*/}
                            {/*</div>*/}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
