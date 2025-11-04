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
                                review,
                                description,
                                handleDetail,
                                }) {
                                    console.log(review);

    return(
        <>            
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
                    <li className="detail-title-address-box">
                        <i class="fa-solid fa-location-dot"></i>
                        <span className="detail-title-address"> {address}</span>
                        <button className="detail-title-address-button">지번 <i class="fa-solid fa-chevron-down"></i></button>
                        {/*{localAddress}*/}
                    </li>
                    <li className="detail-title-time-box">
                        <i class="fa-solid fa-clock"></i>
                        <span className="detail-title-time"> 영업시간: {businessHouers} 라스트 오더: {lastOrder}</span>
                        <button className="detail-title-time-button"> 전체 영업시간 정보 <i class="fa-solid fa-chevron-down"></i></button>
                    </li>                                                                                                        {/*businessHouers 하고 lastOrder*/}
                    <li className="detail-title-phone-box">
                        <i class="fa-solid fa-book"></i>
                        <span className="detail-title-phone"> {phone}</span>
                    </li>
                    <li className="detail-title-tag-box">
                        <i class="fa-solid fa-tag"></i>
                        <span className="detail-title-tag" > {tag}</span>
                    </li>
                    <li className="detail-title-other-box">
                        <i class="fa-solid fa-plus"></i>
                        <span className="detail-title-other" > {other}</span>
                    </li>
                    <li className="detail-title-support-box">
                        <i class="fa-solid fa-comment"></i>
                        <span className="detail-title-support" > 정보수정 제한</span>
                    </li>
                </ul>

                <ul className="detail-menu">
                    <li className="detail-menu-title" >메뉴정보</li>
                    {/*menu를 map으로 돌려서 출력*/}
                    <li className="detail-menu-item">메뉴1---가격</li>
                    <li className="detail-menu-item">메뉴2---가격</li>
                    <li className="detail-menu-item">메뉴3---가격</li>
                    <li className="detail-menu-more-box">
                        <button className="detail-menu-more">메뉴 모두 보기 <i class="fa-solid fa-chevron-down"></i></button>
                    </li>
                </ul>
            </div>
            <ul className="detail-image">
                <li className="detail-image-title"><span>맛집명</span> 사진(손님이 찍은사진)</li>
                <li className="detail-image-button-box">
                    <button className="detail-image-button">음식</button>
                    <button className="detail-image-button">실내</button>
                    <button className="detail-image-button">실외</button>
                    <button className="detail-image-button">메뉴</button>
                    <button className="detail-image-button">주차</button>
                </li>
                {/*reviewImage를 map으로 돌려서 출력*/}
                <li className="detail-image-box">
                    <img className="detail-view-image" src={image1}/>
                    <img className="detail-view-image" src={image2}/>
                    <img className="detail-view-image" src={image3}/>
                    <img className="detail-view-image" src={image1}/>
                    <img className="detail-view-image" src={image2}/>
                    <img className="detail-view-image" src={image3}/>
                    <img className="detail-view-image" src={image1}/>
                    <img className="detail-view-image" src={image2}/>
                    <img className="detail-view-image" src={image3}/>
                    <img className="detail-view-image" src={image1}/>
                    <img className="detail-view-image" src={image2}/>
                    <img className="detail-view-image" src={image3}/>
                </li>
                <li className="detail-image-more-box">
                    <button className="detail-image-more">사진 더보기 <i class="fa-solid fa-chevron-down"></i></button>
                </li>
            </ul>

            <ul className="detail-review">
                <li className="detail-review-title">맛집명 방문자 리뷰</li>
                <li className="detail-review-button-box">
                    <button className="detail-review-button">최신순</button>
                    <button className="detail-review-button">평점 높은순</button>
                    <button className="detail-review-button">평점 낮은순</button>
                </li>
                {review && review.map((reviewDetail, idx) => (
                    <ul className="detail-review-box">
                        <li className="detail-review-profile">
                            <img className="detail-review-user-image" src={reviewDetail.userProfile} alt="프로필" />
                            <li className="detail-review-info">
                                <span className="detail-review-user-id">{reviewDetail.userId}</span><br/>
                                <span className="detail-review-user-like">평균 별점 {reviewDetail.userLike} </span>
                                <span className="detail-review-user-stats">
                                    평가 {reviewDetail.userTotalReview} 팔로워 {reviewDetail.userFllowers}
                                </span>
                            </li>
                        </li>
                        <li className="detail-review-image-box">
                            <img className="detail-review-image" src={reviewDetail.reviewImage} />
                            <img className="detail-review-image" src={reviewDetail.reviewImage} />
                            <img className="detail-review-image" src={reviewDetail.reviewImage} />
                        </li>
                        <li className="detail-review-date">{reviewDetail.reviewDate}</li>
                        <li className="detail-review-description">
                            {reviewDetail.reviewDescription}
                        </li>
                    </ul>
                ))}
            </ul>
        </>
    );
}