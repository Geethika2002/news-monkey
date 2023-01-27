import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
     const[articles,setArticles]=useState([])
     const[loading,setLoading]=useState(true)
     const[page,setPage]=useState(1)
     const[totalResults,settotalResults]=useState(0)
  const updateNews= async()=>{
    props.setProgress(10)
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d252bad3012d4210b3be843182229107&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50)
    let parsedData = await data.json();
    props.setProgress(80)
    console.log(parsedData);
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(()=>{
   document.title=`${props.category.substring(0,1).toUpperCase()+props.category.substring(1)} - NewsMonkey`
    updateNews()
  },[])
 const fetchMoreData = async () =>{
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d252bad3012d4210b3be843182229107&page=${page}&pagesize=${props.pageSize}`;
    // setState({loading:true})
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
 };
    return (
      <>
        <h1 className="text-center" style={{margin:'40px',marginTop:'90px'}}>NewsMonkey - Top {props.category.substring(0,1).toUpperCase()+props.category.substring(1)} HeadLines</h1>
        {loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""}description={element.description ? element.description.slice(0, 88) : ""}imageUrl={element.urlToImage}newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/></div>
            );
          })}
          </div>
        </div>
        </InfiniteScroll>
        </>
   
    );
        
}
News.defaultProps={
  country:"in",
  pageSize:8,
  category:'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News;
