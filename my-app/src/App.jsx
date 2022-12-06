import React, { useState, useEffect } from "react";
// import ClassCounter from "./componets/ClassCounter";
// import Counter from "./componets/Counter";
import "./styles/App.css";
// import PostItem from "./componets/Postitems";
import Postlist from "./componets/Postlist";
import MyButton from "./componets/UI/button/MyButton";
// import MyInput from "./componets/UI/input/MyInput";
// import { useRef } from "react";
import PostForm from "./componets/PostForm";
// import MySelect from "./componets/UI/select/MySelect";
// import { useMemo } from "react";
import PostFilter from "./componets/PostFilter";
import MyModal from "./componets/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
// import axios from 'axios';
import PostService from "./Api/PostService";
import Loader from "./componets/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false); 
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  })

  useEffect(() => {
    fetchPosts();
  }, [])

  const createPost = (newPost) => {
    setPosts( [...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пользователя!
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {postError && 
       <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        : <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      }
    </div>
  );
}

export default App;
