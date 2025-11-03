export function TravelFood({pid, name, like, tag, image1, image2, image3, description, handleDetail, type}) {
    return(
        <ul className='food-list-item' onClick={() => {handleDetail(type, pid)}}>
          <li className="food-title"><span>{pid}. </span>{name}</li>
          <li className="food-tag">{like} #{tag}</li>
          <img className="food-image" src={image1}></img>
          <img className="food-image" src={image2}></img>
          <img className="food-image" src={image3}></img>
          <li className="food-description">{description}</li>
        </ul>
    );
}