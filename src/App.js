import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/header/Header';
import Post from './components/post/Post';
import {db,auth} from './Firebase'

function App() {
  const [posts,setPosts]=useState([{
    id:'sdgfsgkdfksdh',
    data:{
      username:'Rizal Azky',
      imageUrl:'',
      caption:'Caption'
      
    }
  }])
  const [user,setUser]=useState(null)


  useEffect(() => {
    auth.onAuthStateChanged(auth=>{
      if(auth){
        setUser(auth)
      }else{
        setUser(null)
      }
    })
    db.collection('post').onSnapshot(data=>{
      setPosts(data.docs.map(doc=>({id:doc.id,data:doc.data()})))
    })
  }, [])
  return (
    <div className="App">
      <Header user={user}/>
      {
        posts.map((post)=>(
          <Post key={post.id} username={post.data.username} caption={post.data.caption} imageUrl={post.data.imageUrl}/>
        ))
      }
    </div>
  );
}

export default App;
