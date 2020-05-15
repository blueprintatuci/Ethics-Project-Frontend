import React, { Component
} from "react";

import Loading from "./Loading"
import axios from "axios";
import MediaCard from "./Card";

import "./content.scss";


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: [""], // for dropdown
      selectedBlog: "", // for use in header title and other api calls
      selectedBlogId: 0, // for use in other api calls
      unaddedArticles: [""], // for article cards
      blogTableDict: {}, // blogid: blogname
      loading: true, // for when update is taking place
      error: false, 
      errorMsg: "None",
      addedArticle: false // flag for when an article is added 
    };
  }

  // when rescrape is needed
  onUpdate = () => {
    this.setState({
      loading: true
    }, () => {
      axios.get(`https://ethic-blueprint.herokuapp.com/scrape_articles`)
        .then(result => this.setState({
          loading: false,
        }))
        .catch(() => {
          this.setState({
            error: true
          });
          this.setState({
            errorMsg: "error scraping articles"
          });
        });
    });
  }

  // get blog id from blog name
  getBlogId = (blogname) => {
    return Object.keys(this.state.blogTableDict).find(key => this.state.blogTableDict[key] === blogname);
  }

  componentDidMount() {
    // get blog names and corresponding ids
    axios.get("https://ethic-blueprint.herokuapp.com/blogs")
      .then((result) => {
        const arr = Object.keys(result.data).map((key) => [
          key,
          result.data[key],
        ]);

        // set first subtitle to first element in dropdown to initial page
        this.setState(() => ({
          selectedBlog: arr[0][1],
          selectedBlogId: arr[0][0],
          firstMount: false
        }));
        

        // dictionary for blogtable to update state of id and name on dropdown
        const dict = {};
        arr.forEach(([key, value]) => dict[key] = value);
        this.setState(() => ({
          blogTableDict: dict
        }))

        // create list of blog names for dropdown
        const arr2 = Object.keys(result.data).map((key) => result.data[key]);
        this.setState(() => ({
          blogs: arr2
        }));
        
        // get articles to show up for selected blog
        axios.get(`https://ethic-blueprint.herokuapp.com/unused_articles/` + this.state.selectedBlogId)
          .then(
            result => {
              
              this.setState(() => ({
                unaddedArticles: result.data['articles']
              }))

          })
          .catch(() => {
            this.setState({
              error: true
            });
            this.setState({
              errorMsg: "error retreiving unused articles"
            });
          });
      })
      .catch(() => {
        this.setState({
          error: true
        });
        this.setState({
          errorMsg: "error retreiving blogs"
        });
      });
        
      // stops loading screen
      this.setState({
        loading: false
      })
  };

  componentDidUpdate(previousProps, previousState){
    if (previousState.selectedBlogId !== this.state.selectedBlogId || this.state.addedArticle === true){
      
      // update article cards - get articles to show up for selected blog
      axios.get(`https://ethic-blueprint.herokuapp.com/unused_articles/` + this.state.selectedBlogId)
          .then(
            result => {
              
              this.setState(() => ({
                unaddedArticles: result.data['articles']
              }))

            this.setState(() => ({
              addedArticle: false
            }))
          })
          .catch(() => {
            this.setState({
              error: true
            });
            this.setState({
              errorMsg: "error retreiving unused articles"
            });
          });
    }


  }

  
render() {

    // print out if there's an error in the console
    if (this.state.error) {
      console.log(this.state.errorMsg)
    }

    if (this.state.loading) {
      return ( <Loading/>)
    } 
    
    else {
      return ( 
        <div>
          <div className = "header-container" >
              <div class = "row" >
                <div class = "col-sm" >
                  <body className = "blog-name" > {this.state.selectedBlog} </body> 
                </div> 
                <div class = "col-sm" className = "blog-selector" >
                  <div>
                    <select value = { this.state.selectedBlog } 
                      onChange = {(e) =>
                      this.setState({
                        selectedBlog: e.target.value,
                        validationError: e.target.value === "" ?
                          "Choose a Blog Topic" :
                          "",
                        selectedBlogId: this.getBlogId(e.target.value)
                      })}>
                      {
                        this.state.blogs.map((blog) => ( 
                          <option> {blog} </option>
                        ))
                      } 
                  </select> 
                </div> 
              </div> 
              <button class = "update" onClick = {() => this.onUpdate()} > Update Library </button> 
            </div> 
          </div> 
          <div >
            <div class = "library-container" > {
              this.state.unaddedArticles.map((d, id) => {
                  return ( 
                    <div className = "article">
                      <MediaCard key = {d.id}
                      id = {d.id}
                      title = {d.title}
                      img = {d.image_url}
                      url = {d.url}
                      blogId = {this.state.selectedBlogId}
                      />
                    </div>
              )})} </div> 
          </div>
      </div>
      ); 
    }
  }
}