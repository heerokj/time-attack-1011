import React from "react";

const Ssg = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/10");
  const data = await res.json();

  return (
    <div>
      <p>title : {data.title}</p>
      <p>body : {data.body}</p>
    </div>
  );
};

export default Ssg;
