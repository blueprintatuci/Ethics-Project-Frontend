// taken from material ui

import React, { useState } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
});

// onClick of Shopify button calls this function to post to Shopify
function postArticle(articleId, blogId) {
  axios.post(`https://ethic-blueprint.herokuapp.com/shopify/articles`,{article_id: Number(articleId),
  blog_id: Number(blogId)})
}

export default function MediaCard(props) {
  const classes = useStyles();
  const [disable, setDisable] = useState(false);

  if (disable === true){
    return (
      <Card className={classes.root} id="article">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.img}
          title={props.title}
          onClick={()=>window.open( props.url, "_blank")}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary"  href={props.url} target="_blank" >
          Read More
        </Button>
        <Button size="small" color="secondary" disabled={true}>
          Added
        </Button>
      </CardActions>
    </Card>
    )
  }
  else{
    return (
      <Card className={classes.root} id={props.id}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.img}
            title={props.title}
            onClick={()=>window.open( props.url, "_blank")}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary"  href={props.url} target="_blank" >
            Read More
          </Button>
          <Button size="small" color="primary" onClick={() => {postArticle(props.id, props.blogId); setDisable(true);}}>
            Add To Blog
          </Button>
        </CardActions>
      </Card>
    );
  }
}
