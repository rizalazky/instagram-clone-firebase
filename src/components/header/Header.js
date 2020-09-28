import React,{useEffect, useState} from 'react'
import './Header.css';
import {Button,Modal} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import {auth} from '../../Firebase'

export default function Header({user}) {
    const [openModal,setOpenModal]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const handleLogin=(e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            alert('Berhasil Login')
        })
    }
    return (
        <div className='header'>
            <img alt='logo' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'></img>
            <Button variant='contained' color={user ? 'secondary':'primary'}
                onClick={!user ? ()=>setOpenModal(true):null}
            >
                {
                    user ? 'Logout':'LogIn'
                }
            </Button>
            <Modal
                className='modal'
                open={openModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div className='modal__body'>
                    <CloseIcon onClick={()=>setOpenModal(false)}></CloseIcon>
                    <label>email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email'/>
                    <br/>
                    <label>password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password'/>
                    <Button 
                    
                        variant='contained' 
                        color='primary'
                        onClick={handleLogin}>
                            Log In
                    </Button>
                </div>
            </Modal>
            
        </div>
    )
}
