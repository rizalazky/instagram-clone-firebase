import React,{ useState} from 'react'
import './Header.css';
import {Button,Modal} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import {auth} from '../../Firebase'

export default function Header({user}) {
    const [openModal,setOpenModal]=useState(false)
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [isRegister,setIsRegister]=useState(false)

    const handleLogin=(e)=>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            alert('Berhasil Login')
            setOpenModal(false)
        }).catch((err)=>alert(err.message))
    }

    const handleRegister=(e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            alert('Registrasi Berhasil')
            setOpenModal(false)
        }).catch((err)=>alert(err.message))
    }
    
    const handleLogout=(e)=>{
        e.preventDefault()
        auth.signOut()
    }

    return (
        <div className='header'>
            <img alt='logo' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'></img>
            <Button variant='contained' color={user ? 'secondary':'primary'}
                onClick={!user ? ()=>{setOpenModal(true);}:handleLogout}
            >
                {
                    user ? 'Logout':'LogIn'
                }
            </Button>
            {
                !user &&
                <Button variant='outlined' color='primary' onClick={()=>{setOpenModal(true);setIsRegister(true);}}>Register</Button>

            }
            <Modal
                className='modal'
                open={openModal}
                onClose={()=>setOpenModal(false)}
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
                    {
                        isRegister ?(
                            <Button 
                                variant='contained' 
                                color='primary'
                                onClick={handleRegister}>
                                    Register
                            </Button>
                        ):(
                            <Button 
                                variant='contained' 
                                color='primary'
                                onClick={handleLogin}>
                                    Log In
                            </Button>
                        )
                    }
                    

                    
                </div>
            </Modal>
            
        </div>
    )
}
