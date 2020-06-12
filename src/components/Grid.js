import React, { useState } from 'react';
import { Square } from './Square';
export const Grid = () => {
  const [dims, setdims] = useState({
    m: 50,
    n: 50,
    src: null,
    dest: null,
  });

  let arr = [];
  for (let i = 0; i < dims.m; i++) {
    let temp = [];
    for (let j = 0; j < dims.n; j++) {
      temp.push(`${i} ${j}`);
    }
    arr.push(temp);
  }
  const { src, dest } = dims;
  const handleClick = (e) => {
    console.log('clck');
    setdims({ ...dims, src: 1 });
    e.preventDefault();
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${dims.n},1fr)`,
        gridColumnGap: '0',
        gridGap: '0',
        width: `${dims.n * 1.3}rem`,
      }}
    >
      {arr.map((ele, idx) => {
        return ele.map((inside, eidx) => {
          return (
            <Square
              type={src !== null ? 1 : dest !== null ? 2 : 0}
              onClick={handleClick}
              key={(idx + 1) * (eidx + 1)}
            />
          );
        });
      })}
    </div>
  );
};
