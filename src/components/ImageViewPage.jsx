// components/ImageViewPage.jsx
import ImageViewer from "./ImageViewer";

function ImageViewPage({ image }) {
  return (
    <div class="flex justify-center items-center h-screen">
      <ImageViewer image={image} />
    </div>
  );
}

export default ImageViewPage;
