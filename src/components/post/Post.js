import React from 'react';
import { Avatar } from '@material-ui/core';
import './Post.css'


export default function Post({username,imageUrl,caption}) {
    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar alt={username} src="/broken-image.jpg"></Avatar>
                <div className='username'>{username}</div>
            </div>
            <img className='post__image' src={imageUrl} alt={`img-${username}`}/>
            <div className='post__caption'>
                <h4><strong>{username}</strong>: {caption}</h4>
            </div>
        </div>
    )
}
