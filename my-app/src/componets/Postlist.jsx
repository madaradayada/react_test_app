import React from "react";
import PostItem from "./Postitems";

const Postlist = ({posts, title}) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Postlist;
