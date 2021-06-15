import React from 'react';

import styles from './Post.module.css';

const post = (props) => (
    <article className={styles.Post} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={styles.Info}>
            <div className={styles.Author}>{props.author}</div>
        </div>
    </article>
);

export default post;