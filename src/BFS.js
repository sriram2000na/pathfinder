function BFS(src, dest, isValid, dims) {
  var breakWhile;
  var d = [
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ];
  let queue = [];
  // console.log('BFS');
  // console.log('before', queue);
  queue.push(src);
  // console.log('src', src);

  let arr = [];
  for (let i = 0; i < dims.m; i++) {
    let temp = [];
    for (let j = 0; j < dims.n; j++) {
      temp.push({ x: -1, y: -1 });
    }
    arr.push(temp);
  }
  var path = arr;
  // console.log(queue);
  // let ctr = 0;
  while (queue.length !== 0) {
    // queue.forEach((ele) => {
    //   console.log(ele);
    // });
    // console.log(queue, ++ctr);
    // console.log(queue.length);
    // console.log(path);
    let a = queue.shift();
    d.forEach((dir) => {
      // console.log(a);
      // console.log(path);
      // console.log(queue);
      let newx = a.x + dir.x;
      let newy = a.y + dir.y;
      // if (isValid(newx, newy)) {
      //   console.log(path[newx][newy]);
      // }
      // console.log(
      //   isValid(newx, newy),
      //   path[newx][newy].x === -1,
      //   path[newx][newy].y === -1
      // );
      if (
        isValid(newx, newy) &&
        path[newx][newy].x === -1 &&
        path[newx][newy].y === -1
      ) {
        path[newx][newy] = { x: a.x, y: a.y };
        // console.log(path[newx][newy]);
        if (dest.x === newx && dest.y === newy) {
          // console.log(path);
          breakWhile = true;
          return;
        }
        // console.log(newx, newy, dest);
        queue.push({ x: newx, y: newy });
      }
      // return false;
    });
    if (breakWhile) {
      // console.log(path);
      return path;
    }
  }
  return false;
}
export default BFS;
