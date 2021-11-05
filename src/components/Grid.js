import React, { useState, useEffect } from "react";
import { Square } from "./Square";
import BFS from "../BFS.js";
export const Grid = () => {
  var p;
  const [horse, setHorse] = useState(false);
  const [dims, setdims] = useState({
    m: 20,
    n: 20,
    src: { x: -1, y: -1 },
    dest: { x: -1, y: -1 },
    wall: false,
    path: undefined,
    arr: [[]],
  });
  const toggleHorse = () => {
    setHorse(!horse);
  };
  useEffect(() => {
    // console.log('here');
    let arr = [];
    for (let i = 0; i < dims.m; i++) {
      let temp = [];
      for (let j = 0; j < dims.n; j++) {
        temp.push(`${i} ${j}`);
      }
      arr.push(temp);
    }
    setdims({ ...dims, arr });
  }, []);
  const { arr } = dims;
  const setWalls = (e) => {
    // console.log('wall2', dims.wall);
    setdims({ ...dims, wall: !dims.wall });
    // console.log('wall2', dims.wall);
    e.preventDefault();
  };
  const handleClick = (idx, eidx) => {
    // console.log('wall', dims.wall);
    if (dims.wall) {
      let arr2 = [...arr];
      arr2[idx][eidx] = "wall";
      // console.log(arr2);
      setdims({ ...dims, arr: arr2 });
      return;
    } else {
      if (dims.src.x === -1) {
        setdims({ ...dims, src: { x: idx, y: eidx } });
      } else if (dims.dest.x === -1) {
        setdims({ ...dims, dest: { x: idx, y: eidx } });
        // console.log(isValid(idx, eidx));
      } else {
        var arr2 = [];
        p = BFS(dims.src, dims.dest, isValid, { m: dims.m, n: dims.n }, horse);
        if (p === false) {
          console.log("cant find path");
          setdims({ ...dims, path: false });
          return;
        }
        // console.log(p);
        var current = dims.dest;
        // console.log(x, y);
        // console.log(p[x][y]);
        while (true) {
          // console.log(x !== dims.src.x, p[x][y].y !== dims.src.y);
          // if (x !== dims.src.x || y !== dims.src.y) {
          // console.log(p[x][y]);
          // console.log(x, y, p[x][y]);
          arr2.unshift(p[current.x][current.y]);
          current = p[current.x][current.y];
          // console.log(x, y, p[x][y]);
          // }
          if (current.x === dims.src.x && current.y === dims.src.y) {
            break;
          }
        }
        // console.log(arr2);
        setdims({ ...dims, path: arr2 });
      }

      // console.log(dims);
      // e.preventDefault();
    }
  };
  const isValid = (idx, eidx) => {
    return (
      idx >= 0 &&
      idx < dims.m &&
      eidx >= 0 &&
      eidx < dims.n &&
      dims.arr[idx][eidx] !== "wall"
    );
  };
  const setType = (idx, eidx) => {
    // console.log(arr);
    if (arr[idx][eidx] === "wall") {
      return 5;
    }
    if (dims.src.x === idx && dims.src.y === eidx) {
      return 1;
    }
    if (dims.dest.x === idx && dims.dest.y === eidx && dims.src.x !== -1) {
      return 2;
    }
    // console.log(dims.path);
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
          display: "grid",
          gridTemplateColumns: `repeat(${dims.n},1fr)`,
          gridColumnGap: "0",
          gridGap: "0",
          width: `${dims.n * 1.3}rem`,
        }}
      >
        {arr.map((ele, idx) => {
          return ele.map((inside, eidx) => {
            return (
              <Square
                type={setType(idx, eidx)}
                width={window.innerWidth / dims.m}
                handleClick={() => handleClick(idx, eidx)}
                key={(idx + 1) * (eidx + 1)}
              />
            );
          });
        })}
      </div>
      <div>{dims.path === false && "Path Not Found"}</div>
      <button onClick={setWalls}>Toggle Walls</button>
      <button onClick={toggleHorse}>HorseMode</button>
    </>
  );
};
