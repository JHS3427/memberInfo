export function TravelDetail({
                                pid, 
                                image1, 
                                image2, 
                                image3, 
                                name, 
                                location, 
                                food, 
                                like,
                                address, 
                                businessHouers, 
                                lastOrder, 
                                phone, 
                                tag,
                                other,
                                handleDetail, 
                                type}) {
    return(
        <>
            <li className="detail-close-box"><button className="detail-close-button" onClick={() => handleDetail(type)}>닫기X</button></li>
            <div className="detail-top">
                <ul className="detail-title">                
                    <li className="detail-title-image-box">
                        <img className="detail-title-image" src={image1}/>
                        <img className="detail-title-image" src={image2}/>
                        <img className="detail-title-image" src={image3}/>
                    </li>
                    <li className="detail-title-name-box" >
                        <span className="detail-title-name">{name}</span> 
                        <button className="detail-title-save"><i class="fa-regular fa-bookmark"></i> 저장</button>
                        <button className="detail-title-share"><i class="fa-regular fa-share-from-square"></i> 공유</button>  
                    </li>
                    <li className="detail-title-location" >{location} | {food}</li>
                    {/* <i class="fa-solid fa-star"></i> 이게 색별 <i class="fa-regular fa-star"></i> 이게 빈별*/}
                    <li className="detail-title-like-box" >
                        <span className="detail-title-like" >{like}</span>
                        <span className="detail-title-likeNum" >별점점수</span >
                        {/*여긴 별 개수 체크해서 계산*/}
                        <span className="detail-title-reviewNum" >몇명평가</span>
                        {/*여긴 리뷰개수 카운트 */}
                        <span className="detail-title-likeScore" >87점</span></li>
                        {/*여기도 별점으로 계산 */}
                    <li>
                        <i class="fa-solid fa-location-dot"></i>
                        <span className="detail-title-address">{address}</span>
                        <button>▼지번보기</button>
                        {/*{localAddress}*/}
                    </li>                                                                
                    <li>
                        <i class="fa-solid fa-clock"></i>
                        <span className="detail-title-time">영업시간: {businessHouers} 라스트 오더: {lastOrder}</span>
                        <span>▼전체 영업시간 정보</span>
                    </li>                                                                                                        {/*businessHouers 하고 lastOrder*/} 
                    <li>
                        <i class="fa-solid fa-book"></i>
                        <span className="detail-title-phone">{phone}</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-tag"></i>
                        <span className="detail-title-tag" >{tag}</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-plus"></i>
                        <span className="detail-title-other" >{other}</span>
                    </li>
                    <li>
                        <i class="fa-solid fa-comment"></i>
                        <span className="detail-title-support" >정보수정 제한</span>
                    </li>
                </ul>

                <ul className="detail-menu">
                    <li className="detail-menu-title" >메뉴정보</li>
                    {/*menu를 map으로 돌려서 출력*/}
                    <li className="detail-menu-item">메뉴1---가격</li>
                    <li className="detail-menu-item">메뉴2---가격</li>
                    <li className="detail-menu-item">메뉴3---가격</li>
                    <button className="detail-menu-more" >▼더보기</button>
                </ul>
            </div>
            <ul className="detail-image">
                <li className="detail-image-title">맛집명 사진(손님이 찍은사진)</li>
                <li className="detail-image-button-box">
                    <button className="detail-image-button">음식</button>
                    <button className="detail-image-button">실내</button>
                    <button className="detail-image-button">실외</button>
                    <button className="detail-image-button">메뉴</button>
                    <button className="detail-image-button">주차</button>
                </li>
                {/*reviewImage를 map으로 돌려서 출력*/}
                <li className="detail-image-box">이미지들</li>
                <button className="detail-image-more">▼사진 더보기</button>
            </ul>

            <ul className="detail-review">
                <li className="detail-review-title">맛집명 방문자 리뷰</li>
                <li className="detail-review-button-box">
                    <button className="detail-review-button">최신순</button>
                    <button className="detail-review-button">평점 높은순</button>
                    <button className="detail-review-button">평점 낮은순</button>
                </li>
                <ul className="detail-review-box">
                    <li className="detail-review-profile">프로필 이미지</li><li className="detail-review-info"><span>닉네임</span><span>평균별점 (점수) 평가 (리뷰한 개수) 팔로워 (팔로우 한 사람) </span></li>
                    <li className="detail-review-image">촬영한 이미지들</li>
                    <li className="detail-review-like">별점</li><li className="detail-review-date">리뷰 날짜</li>
                    <li className="detail-review-description">
                    2-3년전에 가보고 이전해서는 처음 간곳. 삼겹살은 여전히 맛있고 D806은 종업원에게 말하면 테이블당 1인분 가능. 호불호가 갈릴듯 한 맛. 
                    그러나 기본 삼겹살은 아주 좋음

                    맛: 맛있음 가격: 보통 응대: 친절함

                    주문한 메뉴
                    A506 숙성 삼겹살 150g, D806 숙성 삼겹살 150g, 된장찌개

                    키워드
                    점심식사, 데이트, 캐주얼한, 고급스러운, 주차비50프로 지원
                    </li>
                </ul>
            </ul>
        </>
    );
}