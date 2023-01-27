import React from "react";

const NewsItem=(props)=> {
    let {title,description,imageUrl,newsUrl,author,date,source}=props
    return (
      <div className="my-3">
        <div className="card" >
          <div style={{display:'flex',right:'0',justifyContent:'flex-end',position:'absolute',color:'white'}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" >{source}
            </span></div>
          <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2022/03/Galaxy-s22-770x433.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
