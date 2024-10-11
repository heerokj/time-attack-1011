import React from "react";

const Isr = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/10", {
    next: {
      revalidate: 10,
    },
  });

  return (
    <div>
      <p></p>
      <p></p>
    </div>
  );
};

export default Isr;
