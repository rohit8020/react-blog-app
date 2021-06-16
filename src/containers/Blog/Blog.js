import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import styles from './Blog.module.css';



class Blog extends Component {
    
    render () {
        
        return (
            <div className={styles.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" activeClassName={styles.activeLink} exact>Home</NavLink></li>
                            <li><NavLink activeClassName={styles.activeLink} to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header> 
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                <Switch>
                <Route path="/" exact component={Posts} />
                {/* <Redirect from="/posts" to="/"/> */}
                {/* <Redirect from="/new-post" to={{
                    pathname: '/new-post',
                    hash: '#submit',
                    search: '?quick-submit=true'
                }}/> */}
                <Route path="/new-post"  component={NewPost} />
                <Route path="/posts/:id" exact component={FullPost} />
                <Route render={() => 
                (<div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '90vh',
                    color: 'red'
                }}>
                    <h1>PAGE NOT FOUND!</h1>
                </div>) } />
                </Switch>
            </div>
        );
    }
}

export default Blog;