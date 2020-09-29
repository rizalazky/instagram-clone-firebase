import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/header/Header';
import Post from './components/post/Post';
import FileUpload from './components/fileupload';
import {db,auth} from './Firebase'
import IntagramEmbed from 'react-instagram-embed';


function App() {
  const [posts,setPosts]=useState([])
  const [user,setUser]=useState(null)


  useEffect(() => {
    auth.onAuthStateChanged(auth=>{
      if(auth){
        setUser(auth) 
      }else{
        setUser(null)
      }
    })
    db.collection('posts').onSnapshot(data=>{
      setPosts(data.docs.map(doc=>({id:doc.id,data:doc.data()})))
    })
    
  }, [])


  return (
    <div className="App">
      <Header user={user}/>
      <div className='App__post__container'>
        <div className='App__post__left'>
        {
            posts.map((post)=>(
              <Post key={post.id} postId={post.id} user={user?.displayName} username={post.data.username} caption={post.data.caption} imageUrl={post.data.imageUrl}/>
            ))
        }
          
        </div>
        <div className='App__post__right'>
          <IntagramEmbed
            url='https://www.instagram.com/p/B5BzsIBpvH3/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>

      </div>
      {
        user?.displayName ?
        <div className='App__fileUpload'>
          <FileUpload username={user?.displayName}/>
        </div>
        :
        <div>Sory..Login to Upload</div>

      }
      
      
    </div>
  );
}

export default App;
