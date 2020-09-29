import { Button } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React,{useState} from 'react'
import {storage,db} from '../../Firebase'
import firebase from 'firebase'
import './index.css'

export default function FileUpload({username}) {
    const [caption,setCaption]=useState('')
    const [progress,setProgress]=useState(0)
    const [image,setImage]=useState(null)
    const [upload,setUpload]=useState(false)


    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload=()=>{
        const uploadTask= storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress=Math.round(
                    (snapshot.bytesTransferred /snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (err)=>{
                console.log(err)
                alert(err.message)
            },
            ()=>{
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    // upload to db
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url,
                        username:username
                    })
                    setProgress(0)
                    setImage(null)
                    setCaption('')
                    setUpload(false)
                })
            }
        
        )
    }

    if(!upload){
        return(
                <Button color='primary' variant='contained' size='large' className='button__upload' onClick={()=>setUpload(true)}>
                    <PhotoCamera/>
                </Button>
        )
    }
    return (
        <div className='imageupload'>
            <progress value={progress} max={100} className='imageupload__input'/>
            <input type='text' 
                className='imageupload__input'
                value={caption} 
                onChange={(e)=>{setCaption(e.target.value)}}
                placeholder='enter caption here...'/>
            <input type='file' className='imageupload__input' onChange={handleChange}/>
            <div className='imageupload__button'>
                <Button onClick={handleUpload}
                    variant='contained'
                    color='primary'
                    size='small'
                    endIcon={<CloudUploadIcon/>}
                >
                    Upload
                </Button>
                <Button onClick={()=>setUpload(false)}
                    variant='contained'
                    color='secondary'
                    size='small'
                >
                    Cancel
                </Button>
            </div>
            
        </div>
    )
}
