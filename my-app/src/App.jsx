import React, { useState } from "react";
// import ClassCounter from "./componets/ClassCounter";
// import Counter from "./componets/Counter";
import "./styles/App.css";
// import PostItem from "./componets/Postitems";
import Postlist from "./componets/Postlist";
import MyButton from "./componets/UI/button/MyButton";
import MyInput from "./componets/UI/input/MyInput";
import { useRef } from "react";
import PostForm from "./componets/PostForm";
import MySelect from "./componets/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "dd" },
    { id: 2, title: "cc", body: "gg" },
    { id: 3, title: "bb", body: "rr" },
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function getSortedPosts() {
    console.log('Отработала функция сортед пост')
    if(selectedSort) {
      return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }

  const sortedPosts = getSortedPosts(); 

  const createPost = (newPost) => {
    setPosts( [...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  
  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
          placeholder='Поиск...'
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts} 
          defaultValue='Сортировка'
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'},
          ]}
        />
      </div>
      {posts.length !== 0
        ? <Postlist remove={removePost} posts={sortedPosts} title="Посты про JS" />
        : <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
      }
    </div>
  );
}

export default App;
