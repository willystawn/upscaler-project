// components/ImageViewer.jsx
import { createEffect, onCleanup } from "solid-js";
import { fabric } from "fabric";

function ImageViewer({ image }) {
  createEffect(() => {
    // Get the canvas element
    const canvasElement = document.getElementById("canvas");

    // Get the screen height
    const screenHeight = window.innerHeight;

    // Set canvas width to full and height to screen height
    canvasElement.width = window.innerWidth;
    canvasElement.height = screenHeight;

    // Create Fabric.js canvas instance
    const canvas = new fabric.Canvas(canvasElement, {
      // backgroundColor: "#2b2b2b", // Set your desired background color
    });

    // Initialize variables for keeping track of the cursor position and image offset
    let cursorX, cursorY, imgOffsetX, imgOffsetY;

    // Load the image onto the canvas
    fabric.Image.fromURL(image, (img) => {
      const defaultSizePercentage = 1;

      // Calculate the initial image dimensions
      const initialImgWidth = img.width * defaultSizePercentage;
      const initialImgHeight = img.height * defaultSizePercentage;

      img.set({
        left: (window.innerWidth - initialImgWidth) / 2,
        top: (screenHeight - initialImgHeight) / 2,
        width: initialImgWidth,
        height: initialImgHeight,
        shadow: {
          color: "rgba(0,0,0,0.3)",
          offsetX: 5,
          offsetY: 5,
          blur: 10,
        },
        hasControls: false, // Disable corner controls
        hasBorders: false, // Disable borders
        hasRotatingPoint: false, // Disable rotation handle
      });

      // Add the image to the canvas
      canvas.add(img);

      // Zoom In and Zoom Out functionality
      canvas.on("mouse:wheel", (event) => {
        const delta = event.e.deltaY;
        const zoomFactor = 0.1; // Adjust the zoom factor based on your preference
        const minZoom = 0.5; // Set your minimum zoom level

        cursorX = event.e.clientX - canvasElement.getBoundingClientRect().left;
        cursorY = event.e.clientY - canvasElement.getBoundingClientRect().top;

        imgOffsetX = cursorX - img.left;
        imgOffsetY = cursorY - img.top;

        const oldZoom = img.scaleX;

        if (delta > 0) {
          // Zoom Out
          img.scaleX = Math.max(img.scaleX * (1 - zoomFactor), minZoom);
          img.scaleY = Math.max(img.scaleY * (1 - zoomFactor), minZoom);
        } else {
          // Zoom In
          img.scaleX *= 1 + zoomFactor;
          img.scaleY *= 1 + zoomFactor;
        }

        const zoomRatio = img.scaleX / oldZoom;

        img.left = cursorX - imgOffsetX * zoomRatio;
        img.top = cursorY - imgOffsetY * zoomRatio;

        // Update canvas
        canvas.renderAll();
      });
    });

    fabric.Image.fromURL(image, (img) => {
      const defaultSizePercentage = 1;

      // Calculate the initial image dimensions
      const initialImgWidth = img.width * defaultSizePercentage;
      const initialImgHeight = img.height * defaultSizePercentage;

      img.set({
        left: (window.innerWidth - initialImgWidth) / 2,
        top: (screenHeight - initialImgHeight) / 2,
        width: initialImgWidth,
        height: initialImgHeight,
        shadow: {
          color: "rgba(0,0,0,0.3)",
          offsetX: 5,
          offsetY: 5,
          blur: 10,
        },
        hasControls: false, // Disable corner controls
        hasBorders: false, // Disable borders
        hasRotatingPoint: false, // Disable rotation handle
      });

      // Add the image to the canvas
      canvas.add(img);

      // Zoom In and Zoom Out functionality
      canvas.on("mouse:wheel", (event) => {
        const delta = event.e.deltaY;
        const zoomFactor = 0.1; // Adjust the zoom factor based on your preference
        const minZoom = 0.5; // Set your minimum zoom level

        cursorX = event.e.clientX - canvasElement.getBoundingClientRect().left;
        cursorY = event.e.clientY - canvasElement.getBoundingClientRect().top;

        imgOffsetX = cursorX - img.left;
        imgOffsetY = cursorY - img.top;

        const oldZoom = img.scaleX;

        if (delta > 0) {
          // Zoom Out
          img.scaleX = Math.max(img.scaleX * (1 - zoomFactor), minZoom);
          img.scaleY = Math.max(img.scaleY * (1 - zoomFactor), minZoom);
        } else {
          // Zoom In
          img.scaleX *= 1 + zoomFactor;
          img.scaleY *= 1 + zoomFactor;
        }

        const zoomRatio = img.scaleX / oldZoom;

        img.left = cursorX - imgOffsetX * zoomRatio;
        img.top = cursorY - imgOffsetY * zoomRatio;

        // Update canvas
        canvas.renderAll();
      });
    });

    // Cleanup function to clear the canvas on component unmount
    onCleanup(() => {
      canvas.dispose();
    });
  });

  return (
    <div class="flex justify-center items-center overflow-hidden">
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default ImageViewer;
