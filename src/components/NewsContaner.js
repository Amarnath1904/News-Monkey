import React, { Component } from 'react'
import NewsCard from './NewsCard'
import Loding_img from "./Loding_img";

import PropTypes from 'prop-types'




export default class NewsContaner extends Component {

    
    static defaultProps = {

        country: "in",
        pageSize: 10,
        category: "general",
    }

    static propTypes = {

        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }



    constructor(){
        super();
        this.state = {
            artical: [],
            defaultIMG : [],
            pagenumber: 1,
            disabledNext: false,
            Loding: true
        }
         
    }


    async componentDidMount(){
        

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7033a11d493646309ba817f183e7c398&page=1&pageSize=${this.props.pageSize}`;
        
        console.log(url);

        let data = await fetch(url);
        let parsdata = await data.json()


        this.setState({
            artical: parsdata.articles, 
            pagenumber: 1, 
            Loding: false
        
        });
        

    }

    Handelpreviusclick = async ()=> {


        this.setState({
            Loding: true
        })

        var NEwpagenumber = this.state.pagenumber - 1
        let url = "https://newsapi.org/v2/top-headlines?country="+this.props.country+"&apiKey=7033a11d493646309ba817f183e7c398"+"&page="+NEwpagenumber+"&pageSize="+this.props.pageSize;
        let data = await fetch(url);
        let parsdata = await data.json()
        this.setState({
            artical: parsdata.articles,
            pagenumber : NEwpagenumber,
            disabledNext: false,       
            Loding: false
        })



    }

    Handelnextclick = async () =>{

        this.setState({
            Loding: true
        })

        var NEwpagenumber = this.state.pagenumber+1
        let url = "https://newsapi.org/v2/top-headlines?country="+this.props.country+"&apiKey=7033a11d493646309ba817f183e7c398"+"&page="+NEwpagenumber+"&pageSize="+this.props.pageSize;
        let data = await fetch(url);
        let parsdata = await data.json()

        if (parsdata.articles.length === 0){

            this.setState({
                disabledNext: true,
                Loding: false
            });
            
        }

    
        else {this.setState({
            artical: parsdata.articles,
            pagenumber : NEwpagenumber,
            Loding: false
        })}
        
    }
    
    render() {
        return (

            

            <>   

                <div className='container d-flex justify-content-center justify-content-evenly my-5'>
                    <button disabled={this.state.pagenumber<=1} type="button" className="btn btn-primary" onClick={this.Handelpreviusclick}>Previus &larr; </button>
                    <button disabled={this.state.disabledNext} type="button" className="btn btn-primary" onClick={this.Handelnextclick} >Next &rarr; </button>
                </div>          
                <h1 className='text-center my-5'>News Monkey - Top Headlines</h1>
                
                {this.state.Loding && <Loding_img/>}
                

                <div className='container my-5 d-flex justify-content-center justify-content-evenly flex-wrap'>

                    
                    
                    {this.state.artical.map((element)=>
                        {  

                            return <NewsCard key={element.url} title={element.title } description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source= {element.source.name}></NewsCard>
                        }
                    )}


                </div>


                <div className='container d-flex justify-content-center justify-content-evenly my-5'>
                    <button disabled={this.state.pagenumber<=1} type="button" className="btn btn-primary" onClick={this.Handelpreviusclick}>Previus &larr; </button>
                    <button disabled={this.state.disabledNext} type="button" className="btn btn-primary" onClick={this.Handelnextclick} >Next &rarr; </button>
                </div> 

                
            </>
        )
    }
}
