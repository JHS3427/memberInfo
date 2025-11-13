import { useEffect, useState } from 'react';

export function TravelHotelDetail({did,
                                  hname,
                                  hlike,
                                  tag,
                                  location,
                                  hotel,
                                  address,
                                  localAddress,
                                  business,
                                  phone,
                                  other,
                                  menu,
                                  mainImages,
                                  imageList,
                                  review}) {

  //문자열(JSON) 파싱 처리
  const parsedTag = tag ? JSON.parse(tag) : [];
  const parsedBusiness = business ? JSON.parse(business) : [];
  const parsedOther = other ? JSON.parse(other) : [];
  const parsedMenu = menu ? JSON.parse(menu) : [];
  const parsedMainImages = mainImages ? JSON.parse(mainImages) : [];
  const parsedImageList = imageList ? JSON.parse(imageList) : [];
  const parsedReview = review ? JSON.parse(review) : [];

  const imageButtons = ["전체", "디럭스", "스위트", "패밀리 트윈", "로얄 스위트"];
  const reviewButtons = ["최신순", "평점 높은순", "평점 낮은순"];

  const [activeImageMenu, setActiveImageMenu] = useState(0);
  const [activeReviewMenu, setActiveReviewMenu] = useState(0);
  const [pushLike, setPushLike] = useState(false);
  const [showLocalAddress, setShowLocalAddress] = useState(false);
  const [showAllTime, setShowAllTime] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showAllImage, setShowAllImage] = useState(false);


  const handleImageMenu = (idx) => {
    setActiveImageMenu(idx);
  };

  const handleReviewMenu = (idx) => {
    setActiveReviewMenu(idx);
  };

  const handleLike = () => {
      setPushLike(!pushLike);
  }

  const handleAddress = () => {
      setShowLocalAddress(!showLocalAddress);
  }

  const handleTime = () => {
      setShowAllTime(!showAllTime);
  }

  const handleMenu = () => {
      setShowAllMenu(!showAllMenu);
  }

  const handleImage = () => {
      setShowAllImage(!showAllImage);
  }

  return(
      <>            
          <div className="detail-top">
              <ul className="detail-title">
                  <li className="detail-title-image-box">
                      { parsedMainImages && parsedMainImages.map((MainImage, idx) => (
                          <>
                              <img className="detail-title-image" src={MainImage}/>
                          </>
                      ))}
                  </li>
                  <li className="detail-title-name-box" >
                      <span className="detail-title-name">{hname}</span>
                      <button className="detail-title-save" onClick={handleLike}>
                          {pushLike ? (
                              <i className="fa-regular fa-bookmark"></i>
                          ) : (
                              <i class="fa-solid fa-bookmark fa-pushBookmark"></i>
                          )}
                          &nbsp;저장
                      </button>

                      <button className="detail-title-share"><i class="fa-regular fa-share-from-square"></i> 공유</button>
                  </li>
                  <li className="detail-title-location" >{location} | {hotel}</li>
                  <li className="detail-title-like-box" >
                      { <span>
                        {
                          hlike < 2 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                </span>
                              </>
                            ) :
                          hlike < 3 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </span>
                              </>
                            ) :
                          hlike < 4 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </span>
                              </>
                            ) :
                          hlike < 5 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </span>
                              </>
                            ) :
                          (
                              <>
                                 <span className="detail-title-like" >
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                 </span>
                              </>
                          )
                        }
                      </span> }
                      { <span>
                        {
                          hlike < 2 ? (
                              <>
                                <span className="detail-title-likeNum" >1.0</span>
                              </>
                            ) :
                          hlike < 3 ? (
                              <>
                                <span className="detail-title-likeNum" >2.0</span>
                              </>
                            ) :
                          hlike < 4 ? (
                              <>
                                <span className="detail-title-likeNum" >3.0</span>
                              </>
                            ) :
                          hlike < 5 ? (
                              <>
                                <span className="detail-title-likeNum" >4.0</span>
                              </>
                            ) :
                          (
                              <>
                                <span className="detail-title-likeNum" >5.0</span>
                              </>
                          )
                        }
                      </span> }
                      <span className="detail-title-reviewNum" >({parsedReview.length}명의 평가)</span>
                      {/*여긴 리뷰개수 카운트 */}
                      <span className="detail-title-likeScore" >{hlike}점</span></li>
                  <li className="detail-title-address-box">
                      <i class="fa-solid fa-location-dot"></i>
                      <span className="detail-title-address"> {address}</span>
                      <button className="detail-title-address-button" onClick={handleAddress}>
                          지번
                           {showLocalAddress ? (
                               <i className="fa-solid fa-chevron-up"></i>
                           ) : (
                               <i className="fa-solid fa-chevron-down"></i>
                           )}
                      </button>
{/*                       <i class="fa-solid fa-chevron-up"></i> */}
                  </li>
                  {showLocalAddress && (
                      <li className="detail-title-localAddress-box">
                          <span className="detail-title-localAddress-title">지번</span><span className="detail-title-localAddress"> {localAddress}</span>
                      </li>
                  )}
                  <li className="detail-title-time-box">
                      <i class="fa-solid fa-clock"></i>
                      {parsedBusiness && parsedBusiness
                          .filter((_, idx) => idx === 0)
                          .map((businessDetail, idx) => (

                          <>
                              <span className="detail-title-time"> 영업시간: {businessDetail.houers}</span>
                              <button className="detail-title-time-button" onClick={handleTime}> 전체 영업시간 정보
                                  {showAllTime ? (
                                      <i className="fa-solid fa-chevron-up"></i>
                                  ) : (
                                      <i className="fa-solid fa-chevron-down"></i>
                                  )}
                              </button><br/>
                          </>
                      ))}
                  </li>
                  {showAllTime && (
                      <li className="detail-title-allTime-box">
                          {parsedBusiness && parsedBusiness
                              .filter((_, idx) => idx > 0)
                              .map((businessDetail, idx) => (
                            <>
                               <span className="detail-title-allDay">({businessDetail.day})</span>
                               <span className="detail-title-allTime"> 영업시간: {businessDetail.houers}</span><br/>
                            </>
                          ))}
                      </li>
                  )}
                  <li className="detail-title-phone-box">
                      <i class="fa-solid fa-book"></i>
                      <span className="detail-title-phone"> {phone}</span>
                  </li>
                  <li className="detail-title-tag-box">
                      <i class="fa-solid fa-tag"></i>
                      {parsedTag && parsedTag.map((tagDetail, idx) => ( 
                        <span className="detail-title-tag" > {tagDetail}{idx !== parsedTag.length - 1 ? ", " : ""}</span>
                      ))}
                  </li>
                  <li className="detail-title-other-box">
                      <i class="fa-solid fa-plus"></i>
                      {parsedOther && parsedOther.map((otherDetail, idx) => (
                        <span className="detail-title-other" > {otherDetail}{idx !== parsedOther.length - 1 ? ", " : ""}</span>
                      ))}
                  </li>
                  <li className="detail-title-support-box">
                      <i class="fa-solid fa-comment"></i>
                      <span className="detail-title-support" > 정보수정 제한</span>
                  </li>
              </ul>

              <ul className="detail-menu">
                  <li className="detail-menu-title" >객실정보</li>
                  {parsedMenu && parsedMenu
                      .filter((_, idx) => idx <= 2)
                      .map((menuDetail, idx) => (
                    <li className="detail-menu-item">
                      <span className="detail-menu-item-mname">{menuDetail.hname}</span>
                      <span className="detail-menu-item-dash"></span>
                      <span className="detail-menu-item-price">[대실 {Number(menuDetail.mainRoom).toLocaleString()}원]</span>
                      <span className="detail-menu-item-price">[숙박 {Number(menuDetail.lodgment).toLocaleString()}원]</span>
                    </li>
                  ))}
                  {showAllMenu && (
                    <>
                       {parsedMenu && parsedMenu
                           .filter((_, idx) => idx >= 3)
                           .map((menuDetail, idx) => (
                         <li className="detail-menu-item">
                          <span className="detail-menu-item-mname">{menuDetail.hname}</span>
                          <span className="detail-menu-item-dash"></span>
                          <span className="detail-menu-item-price">[대실 {Number(menuDetail.mainRoom).toLocaleString()}원]</span>
                          <span className="detail-menu-item-price">[숙박 {Number(menuDetail.lodgment).toLocaleString()}원]</span>
                         </li>
                       ))}
                    </>
                  )}
                  <li className="detail-menu-more-box">
                      <button className="detail-menu-more" onClick={handleMenu}>
                          메뉴 모두 보기
                          {showAllMenu ? (
                              <i className="fa-solid fa-chevron-up"></i>
                          ) : (
                              <i className="fa-solid fa-chevron-down"></i>
                          )}
                      </button>
                  </li>
              </ul>
          </div>
          <ul className="detail-image">
              <li className="detail-image-title"><span>{hname}</span> 사진(손님이 찍은사진)</li>
              <li className="detail-image-button-box">
                  <li className="detail-image-button-box">
                    {imageButtons.map((imageBtnName, idx) => (
                      <button
                        key={idx}
                        className={
                          activeImageMenu === idx
                            ? "detail-image-button-active"
                            : "detail-image-button"
                        }
                        onClick={() => handleImageMenu(idx)}
                      >
                      {imageBtnName}
                      </button>
                    ))}
                  </li>
              </li>
              <li className="detail-image-box">
                  {parsedImageList && parsedImageList
                      .filter(
                          (parsedImage) =>
                          imageButtons[activeImageMenu] === "전체" ||
                          parsedImage.category === imageButtons[activeImageMenu]
                      )
                      .map((parsedImage, idx) => (
                      <>
                          {parsedImage && parsedImage.images
                              .filter((_, idx) => idx <= 5)
                              .map((imageSrc, imgIdx) => (
                                <img
                                  key={imgIdx}
                                  className="detail-view-image"
                                  src={imageSrc}
                                  alt={`${parsedImage.category}-${imgIdx}`}
                                />

                          ))}
                      </>
                  ))}
                  {showAllImage &&
                      <>
                          {parsedImageList && parsedImageList
                              .filter(
                                  (parsedImage) =>
                                  imageButtons[activeImageMenu] === "전체" ||
                                  parsedImage.category === imageButtons[activeImageMenu]
                              )
                              .map((parsedImage, idx) => (
                              <>
                                  {parsedImage && parsedImage.images
                                      .filter((_, idx) => idx >= 6)
                                      .map((imageSrc, imgIdx) => (
                                        <img
                                          key={imgIdx}
                                          className="detail-view-image"
                                          src={imageSrc}
                                          alt={`${parsedImage.category}-${imgIdx}`}
                                        />
                                  ))}
                              </>
                          ))}
                      </>
                  }
              </li>
              <li className="detail-image-more-box">
                  <button className="detail-image-more" onClick={handleImage}>
                      사진 더보기
                      {showAllImage ? (
                          <i className="fa-solid fa-chevron-up"></i>
                      ) : (
                          <i className="fa-solid fa-chevron-down"></i>
                      )}
                  </button>
              </li>
          </ul>

          <ul className="detail-review">
              <li className="detail-review-title">{hname} 방문자 리뷰</li>
              <li className="detail-review-button-box">
                  {reviewButtons.map((reviewBtnName, idx) => (
                    <button
                      key={idx}
                      className={
                        activeReviewMenu === idx
                          ? "detail-review-button-active"
                          : "detail-review-button"
                      }
                      onClick={() => handleReviewMenu(idx)}
                    >
                    {reviewBtnName}
                    </button>
                  ))}
              </li>
              {parsedReview && parsedReview.map((reviewDetail, idx) => (
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
                          { reviewDetail.reviewImages && reviewDetail.reviewImages.map((reviewImage, idx) => (
                              <>
                                  <img className="detail-review-image" src={reviewImage}/>
                              </>
                          ))}
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