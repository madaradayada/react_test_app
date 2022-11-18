import React, { useState } from "react";
// import ClassCounter from "./componets/ClassCounter";
// import Counter from "./componets/Counter";
import "./styles/App.css";
// import PostItem from "./componets/Postitems";
import Postlist from "./componets/Postlist";
import MyButton from "./componets/UI/button/MyButton";
import MyInput from "./componets/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript", body: "Description" },
    { id: 2, title: "Javascript 2", body: "Description" },
    { id: 3, title: "Javascript 3", body: "Description" },
  ]);

  return (
    <div className="App">
      <form>
        <MyInput type="text" placeholder="Название поста" />
        <MyInput type="text" placeholder="Описание поста" />
        <MyButton disabled>Создать пост</MyButton>
      </form>
      <Postlist posts={posts} title='Посты про JS'/>
    </div>
  );
}

export default App;
