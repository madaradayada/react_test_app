import React, { useState } from "react";
// import ClassCounter from "./componets/ClassCounter";
// import Counter from "./componets/Counter";
import "./styles/App.css";
// import PostItem from "./componets/Postitems";
import Postlist from "./componets/Postlist";
// import MyButton from "./componets/UI/button/MyButton";
// import MyInput from "./componets/UI/input/MyInput";
// import { useRef } from "react";
import PostForm from "./componets/PostForm";
// import MySelect from "./componets/UI/select/MySelect";
import { useMemo } from "react";
import PostFilter from "./componets/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "dd" },
    { id: 2, title: "cc", body: "gg" },
    { id: 3, title: "bb", body: "rr" },
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''});

  const sortedPosts = useMemo(() => {
    console.log('Отработала функция сортед пост')
    if(filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort  ]));
    }
    return posts;
  }, [filter.sort, posts]); 

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts( [...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <Postlist remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
    </div>
  );
}

export default App;
