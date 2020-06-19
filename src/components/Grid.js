import React, { useState } from 'react';
import { Square } from './Square';
import BFS from '../BFS.js';
export const Grid = () => {
  const [dims, setdims] = useState({
    m: 50,
    n: 50,
    src: { x: -1, y: -1 },
    dest: { x: -1, y: -1 },
  });

  let arr = [];
  for (let i = 0; i < dims.m; i++) {
    let temp = [];
    for (let j = 0; j < dims.n; j++) {
      temp.push(`${i} ${j}`);
    }
    arr.push(temp);
  }
  // const { src, dest } = dims;
  const handleClick = (idx, eidx) => {
    if (dims.src.x === -1) {
      setdims({ ...dims, src: { x: idx, y: eidx } });
    } else if (dims.dest.x === -1) {
      setdims({ ...dims, dest: { x: idx, y: eidx } });
      // console.log(isValid(idx, eidx));
    } else {
      var p = BFS(dims.src, dims.dest, isValid);
      console.log('p: ', p);
    }

    // console.log(dims);
    // e.preventDefault();
  };
  const isValid = (idx, eidx) => {
    return idx >= 0 && idx < dims.m && eidx >= 0 && eidx < dims.n;
  };
  const setType = (idx, eidx) => {
    if (dims.src.x === idx && dims.src.y === eidx) {
      return 1;
    }
    if (dims.dest.x === idx && dims.dest.y === eidx && dims.src.x !== -1) {
      return 2;
    }
    return 0;
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
              type={setType(idx, eidx)}
              handleClick={() => handleClick(idx, eidx)}
              key={(idx + 1) * (eidx + 1)}
            />
          );
        });
      })}
    </div>
  );
};
