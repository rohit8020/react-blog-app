import React, { Component } from 'react';
import axios from '../../../axios';
import {Link} from 'react-router-dom';

// import FullPost from '../FullPost/FullPost';
import Post from '../../../components/Post/Post';
import styles from './Posts.module.css';

class Posts extends Component{
    state={
        posts: [],
        selectedPostId: null,
        error: null
    }
    componentDidMount(){
        axios.get('/posts')
             .then(response => {
                //  console.log(response);
                const posts=response.data.slice(0,4);
                const updatedPosts=posts.map(post => {
                    return {
                        ...post,
                    author: "Rohit"
                    }
                })
                 this.setState({posts: updatedPosts});
             })
             .catch(error => {
                 this.setState({error: error});
             })
    }

    postSelectedHandler = (id) => {
        console.log("seleceted");
        this.setState({selectedPostId: id});
    }

    render(){
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error){
        posts = this.state.posts.map(post => {
            return (
            <Link to={'/posts/'+post.id} key={post.id} >
            <Post 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
                />
            </Link>)
        });

        return(
            <div className={styles.Posts}>
                {posts}
            </div>
        );
    }
    }
}

export default Posts;