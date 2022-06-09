import React, { useLayoutEffect, useState, useRef } from 'react';

var pos = { x: 0, y: 0 };

const Penciltool = () => {
  const [points, setPoints] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const contextRef: any= useRef(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx: any= canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    contextRef.current = ctx;

    points.forEach((ele: any) => {
      contextRef.current.lineTo(ele.x, ele.y);
      contextRef.current.stroke();
    });
  }, [points]);

  const startDrawing = (event:any ) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };
  const finishDrawing = () => {
    setDrawing(false);
  };
  const draw = (event: any) => {
    if (!drawing) return;

    setPoints((state): any => [...state, pos]);
    contextRef.current.moveTo(pos.x, pos.y);

    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };
  return (
    <canvas
      id='canvas'
      width={window.innerWidth}
      height={window.innerWidth}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
    >
      Canvas
    </canvas>
  );
};
export default Penciltool;