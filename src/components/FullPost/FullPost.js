import React, { Component } from 'react';
import axios from 'axios';
import styles from './FullPost.module.css';

class FullPost extends Component {
    state={
        loadedPost: null,
        error: false
    }

    componentDidUpdate(){
        if(this.props.id&&!this.state.error){
            if(!this.state.loadedPost || 
                (this.state.loadedPost && this.props.id !== this.state.loadedPost.id)){
                axios.get('/posts/' + this.props.id)
                    .then(response => {
                        console.log(response);
                        this.setState({loadedPost: response.data});
                    })
                    .catch(error => {
                        // console.log(error);
                        this.setState({error: true});
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                this.setState({error: error});
            })
    }

    render () {
        let error = <span></span>
        if(this.state.error){
            error=<p style={{textAlign: "center"}}>Something went wrong!</p>;
        }
        let post = <p style={{textAlign: "center"}}>Something went wrong!</p>;
        if(!this.state.error){
        post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        if(this.props.id){
            post = <p style={{textAlign: "center"}}>Loading...</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className={styles.FullPost}>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className={styles.Edit}>
                        {error}
                        <button  onClick={this.deletePostHandler} className={styles.Delete}>Delete</button>
                    </div>
                </div>
            );
        }
    }
        return post;
    }
}

export default FullPost;