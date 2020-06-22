import React, { useState } from 'react';
import { Square } from './Square';
import BFS from '../BFS.js';
export const Grid = () => {
  var p;
  const [dims, setdims] = useState({
    m: 20,
    n: 20,
    src: { x: -1, y: -1 },
    dest: { x: -1, y: -1 },
    wall: false,
    path: undefined,
    arr: undefined,
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
  const setWalls = (e) => {
    setdims({ ...dims, walls: !dims.walls });
    e.preventDefault();
  };
  const handleClick = (idx, eidx, arr) => {
    if (dims.wall) {
      arr[idx][eidx] = 'wall';
      return;
    } else {
      if (dims.src.x === -1) {
        setdims({ ...dims, src: { x: idx, y: eidx } });
      } else if (dims.dest.x === -1) {
        setdims({ ...dims, dest: { x: idx, y: eidx } });
        // console.log(isValid(idx, eidx));
      } else {
        var arr2 = [];
        p = BFS(dims.src, dims.dest, isValid, { m: dims.m, n: dims.n });
        var x = dims.dest.x;
        var y = dims.dest.y;
        // console.log(x, y);
        // console.log(p[x][y]);
        while (true) {
          // console.log(x !== dims.src.x, p[x][y].y !== dims.src.y);
          // if (x !== dims.src.x || y !== dims.src.y) {
          // console.log(p[x][y]);
          arr2.unshift(p[x][y]);
          x = p[x][y].x;
          y = p[x][y].y;
          // }
          if (x === dims.src.x && y === dims.src.y) {
            break;
          }
        }
        console.log(arr2);
        setdims({ ...dims, path: arr2 });
      }

      // console.log(dims);
      // e.preventDefault();
    }
  };
  const isValid = (idx, eidx) => {
    return idx >= 0 && idx < dims.m && eidx >= 0 && eidx < dims.n;
  };
  const setType = (idx, eidx) => {
    console.log(arr);
    if (arr[idx][eidx] === 'wall') {
      return 5;
    }
    if (dims.src.x === idx && dims.src.y === eidx) {
      return 1;
    }
    if (dims.dest.x === idx && dims.dest.y === eidx && dims.src.x !== -1) {
      return 2;
    }
    console.log(dims.path);
    if (dims.path !== undefined) {
      // let ctr = 0;
      // console.log('path', dims.path, ++ctr);
      // dims.path.forEach((ele) => {
      //   // console.log(ele);
      //   console.log(idx === ele.x && eidx === ele.y, ele);
      //   if (idx === ele.x && eidx === ele.y) {
      //     return 3;
      //   }
      // });
      for (let i = 0; i < dims.path.length; i++) {
        if (dims.path[i].x === idx && dims.path[i].y === eidx) {
          // console.log(idx, eidx, dims.path[i]);
          return 3;
        }
      }
    }
    return 0;
  };
  return (
    <>
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
                width={window.innerWidth / dims.m}
                handleClick={() => handleClick(idx, eidx, arr)}
                key={(idx + 1) * (eidx + 1)}
              />
            );
          });
        })}
      </div>
      <button onClick={setWalls}>Add Walls</button>
    </>
  );
};
