import React,{ useState} from 'react'
import './Header.css';
import {Button,Modal} from '@material-ui/core'
import {auth} from '../../Firebase'

export default function Header({user}) {
    const [openModal,setOpenModal]=useState(false)
    const [email,setEmail]=useState()
    const [displayName,setDisplayName]=useState()
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
        let alertMessage='';
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            alertMessage='Yeayy !! Registrasi Berhasil !!!'
            return authUser.user.updateProfile({
                displayName:displayName
            })
           
        }).catch((err)=>alertMessage=err.message)

        alert(alertMessage)
        setOpenModal(false)

        setEmail('')
        setDisplayName('')
        setPassword('')


    }
    
    const handleLogout=(e)=>{
        e.preventDefault()
        auth.signOut()
    }

    return (
        <div className='header'>
            <img alt='logo' className='header__logo' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'></img>
            <div className='header__button__login'>
                <Button variant='contained' color={user ? 'secondary':'primary'}
                    size='small'
                    onClick={!user ? ()=>{setOpenModal(true);setIsRegister(false)}:handleLogout}
                >
                    {
                        user ? 'Logout':'LogIn'
                    }
                </Button>
                {
                    !user &&
                    <Button variant='outlined' size='small' color='primary' onClick={()=>{setOpenModal(true);setIsRegister(true);}}>Register</Button>

                }
            </div>
            
            <Modal
                className='modal'
                open={openModal}
                onClose={()=>{setOpenModal(false);setIsRegister(false)}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div className='modal__body'>
                    <div className='modal__body__logo'>
                    <img alt='logo' className='modal__body__logo__image' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'></img>

                    </div>
                    {/* <CloseIcon  onClick={()=>setOpenModal(false)}></CloseIcon> */}
                    {
                        isRegister &&
                        <>
                            <label>Username</label>
                            <input onChange={(e)=>setDisplayName(e.target.value)} value={displayName} type='text'/>
                            <br/>
                        </>
                    }
                    
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
