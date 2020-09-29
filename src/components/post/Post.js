import React,{useState,useEffect} from 'react';
import { Avatar, Button } from '@material-ui/core';
import {Send} from '@material-ui/icons'
import firebase from 'firebase'
import {db} from '../../Firebase'
import './Post.css'


export default function Post({postId,username,imageUrl,caption,user}) {
    const [comment,setComment]=useState('')
    const [comments,setComments]=useState([])


    useEffect(()=>{
        if(postId){
            db.collection('posts').doc(postId)
            .collection('comments').orderBy('timestamp','asc').onSnapshot(snapshot=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            })
        }
    },[postId])

    const handleComment=(event)=>{
        event.preventDefault()
        db.collection('posts').doc(postId).collection('comments').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            text:comment,
            username:user
        })
        setComment('')
    }

    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar alt={username} src="/broken-image.jpg"></Avatar>
                <div className='username'><strong>{username}</strong></div>
            </div>
            <div className='post__image__container'>
                <img className='post__image' src={imageUrl} alt={`img-${username}`}/>
            </div>
            <div className='post__caption'>
                <h4><strong>{username}</strong>: {caption}</h4>
            </div>

            <div className='post_comments'>
                {
                    comments.map((comment,index)=>(
                        <p key={index}>
                            <strong>{comment.username}</strong> : {comment.text}
                        </p>
                    ))
                }
            </div>
            <div className='post__comment'>
                <input type='text' className='post__comment__input' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                <Button
                    className='post__comment__button'
                    endIcon={<Send/>}
                    color='primary'
                    variant='contained'
                    onClick={handleComment}
                >
                
                </Button>
            </div>
        </div>
    )
}
