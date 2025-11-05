export function TravelFood({pid, 
                            fname, 
                            flike, 
                            score, 
                            evaluation, 
                            tag, 
                            image1, 
                            image2, 
                            image3,
                            fullImage1,
                            fullImage2,
                            fullImage3, 
                            description, 
                            handleDetail, 
                            type}) {
    return(
        <div className='food-list-item' onClick={() => {handleDetail(type, pid)}}>
          <ul className="food-title-box">
            <li className="food-title">
              <span className="food-title-fid">{pid}. </span>
              <span className="food-title-fname">{fname}</span> 
            </li>
            <li>
              <span className="food-title-score">{score}</span><span>점</span>
              {/* <span>
                {
                  flike < 2 ? (
                      <>
                        <i className="fa-solid fa-star"></i>
                      </>
                    ) :
                  flike < 3 ? (
                      <>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </>
                    ) :
                  flike < 4 ? (
                      <>
                        <span className="food-tag-sub">식사</span>
                        <span className="food-tag-sub">모임</span>
                      </>
                    ) :
                  flike < 5 ? (
                      <>
                        <span className="food-tag-other">시끌벅적</span>
                        <span className="food-tag-other">분위기좋음</span>
                      </>
                    ) :
                  (
                      <>
                        <span className="food-tag-rest">추천</span>
                        <span className="food-tag-rest">인기</span>
                      </>
                  )
                }
              </span> */}
              
              <span className="food-title-flike"><i className="fa-solid fa-star"></i> {flike}</span>
              <span className="food-title-evaluation">({evaluation}명)</span>
            </li>
          </ul>
          <ul className="food-tag-box"> 
              {tag && JSON.parse(tag).map((tagItem, idx) => (
                <button 
                  className={idx < 2 ? "food-tag" : "food-tag food-tag-sub"} 
                  key={idx}
                >
                  {tagItem}
                </button>  
              ))}
          </ul>
          <img className="food-image" src={image1}></img>
          <img className="food-image" src={image2}></img>
          <img className="food-image" src={image3}></img>
          <li className="food-description">"{description}"</li>
        </div>
    );
}