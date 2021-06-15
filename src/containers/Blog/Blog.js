import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import styles from './Blog.module.css';


class Blog extends Component {
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
        this.setState({selectedPostId: id});
    }


    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error){
         posts = this.state.posts.map(post => {
            return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                    />
        })
    }
        return (
            <div>
                <section className={styles.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;