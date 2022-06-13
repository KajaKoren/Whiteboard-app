import React, { useLayoutEffect, useState, useRef } from 'react';

var pos = { x: 0, y: 0 };

const Penciltool = () => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [drawing, setDrawing] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D| null>(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
  

    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    if (ctx != null) {
      ctx.fillStyle="#FFFFFF"; 
      ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height)
      ctx.lineWidth = 4;
      ctx.strokeStyle="#000000";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
    }
    contextRef.current = ctx;
    //console.log(contextRef.current)

    points.forEach((ele: {x:number,y:number}) => {
      if (contextRef.current != null) {
        contextRef.current.lineTo(ele.x, ele.y);
        contextRef.current.stroke();
      }
    });
  }, [points]);

  const startDrawing = (event: React.MouseEvent ) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
   
  };
  const finishDrawing = () => {
    setDrawing(false);
    

  };
  const draw = (event:React.MouseEvent) => {
    if (!drawing) return;

    setPoints((state):  {x: number; y: number;}[]  => [...state, pos]);
    if (contextRef.current != null) {
      contextRef.current.moveTo(pos.x, pos.y);
    }

    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
    //console.log(pos.x, pos.y)
    //console.log(points)
  };
  return (
    <canvas
      id='canvas'
      width={1000}
      height={500}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      
    >
      Canvas
    </canvas>
  );
};
export default Penciltool;