import React, { useState } from "react";
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
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false); 
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts( [...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пользователя!
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
    </div>
  );
}

export default App;
