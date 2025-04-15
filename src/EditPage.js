import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fabric } from 'fabric';
import './EditPage.css';

const EditPage = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fabricCanvas = useRef(null);
  const [canvasLayers, setCanvasLayers] = useState([]);

  const updateCanvasLayers = () => {
    if (fabricCanvas.current) {
      const layers = fabricCanvas.current.getObjects().map((obj, index) => ({
        id: index,
        type: obj.type,
        attributes: {
          left: obj.left,
          top: obj.top,
          width: obj.width,
          height: obj.height,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          angle: obj.angle,
          fill: obj.fill,
          text: obj.text || null,
          radius: obj.radius || null,
          points: obj.points || null,
        },
      }));
      setCanvasLayers(layers);
      console.log('Canvas Layers:', JSON.stringify(layers, null, 2));
    }
  };

  useEffect(() => {
    if (!location.state?.image) {
      alert('No image selected. Returning to search page.');
      navigate('/');
      return;
    }

    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      height: 600,
      width: 800,
      backgroundColor: '#f0f0f0',
    });

    fabric.Image.fromURL(location.state.image.urls.small, (img) => {
      img.scaleToWidth(400);
      fabricCanvas.current.add(img);
      fabricCanvas.current.renderAll();
      updateCanvasLayers();
    }, { crossOrigin: 'anonymous' });

    fabricCanvas.current.on('object:added', updateCanvasLayers);
    fabricCanvas.current.on('object:modified', updateCanvasLayers);
    fabricCanvas.current.on('object:removed', updateCanvasLayers);

    return () => {
      fabricCanvas.current?.dispose();
    };
  }, [location.state?.image, navigate]);

  const addText = () => {
    const text = new fabric.IText('Enter text here', {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: '#000',
      editable: true,
    });
    fabricCanvas.current.add(text);
    fabricCanvas.current.setActiveObject(text);
    fabricCanvas.current.bringToFront(text);
    fabricCanvas.current.renderAll();
  };

  const addShape = (type) => {
    let shape;
    switch (type) {
      case 'triangle':
        shape = new fabric.Triangle({
          left: 50,
          top: 50,
          width: 50,
          height: 50,
          fill: 'blue',
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          left: 50,
          top: 50,
          radius: 25,
          fill: 'red',
        });
        break;
      case 'rectangle':
        shape = new fabric.Rect({
          left: 50,
          top: 50,
          width: 50,
          height: 50,
          fill: 'green',
        });
        break;
      case 'polygon':
        shape = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: 50, y: 0 },
            { x: 75, y: 50 },
            { x: 50, y: 100 },
            { x: 0, y: 100 },
          ],
          { left: 50, top: 50, fill: 'purple' }
        );
        break;
      default:
        return;
    }
    fabricCanvas.current.add(shape);
    fabricCanvas.current.setActiveObject(shape);
    fabricCanvas.current.bringToFront(shape);
    fabricCanvas.current.renderAll();
  };

  const deleteSelected = () => {
    const activeObject = fabricCanvas.current.getActiveObject();
    if (activeObject) {
      fabricCanvas.current.remove(activeObject);
      fabricCanvas.current.discardActiveObject();
      fabricCanvas.current.renderAll();
    } else {
      alert('Please select an object to delete.');
    }
  };

  const downloadImage = () => {
    if (!fabricCanvas.current) {
      alert('Canvas not initialized.');
      return;
    }
    const dataURL = fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1.0,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited_image.png';
    link.click();
  };

  return (
    <div className="edit-page">
      <h1>Edit Image</h1>
      <div className="toolbar">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape('triangle')}>Add Triangle</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
        <button onClick={() => addShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => addShape('polygon')}>Add Polygon</button>
        <button onClick={deleteSelected}>Delete Selected</button>
        <button onClick={downloadImage}>Download</button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default EditPage;