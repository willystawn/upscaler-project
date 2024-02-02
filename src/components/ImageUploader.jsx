import { createSignal, createEffect, createMemo } from "solid-js";
import ImageViewPage from "./ImageViewPage";

function ImageUploader() {
  const [isDragging, setIsDragging] = createSignal(false);
  const [ishover, setIshover] = createSignal(false);
  const [selectedImage, setSelectedImage] = createSignal(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIshover(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
    setIshover(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setSelectedImage(imageUrl);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    console.log("Selected files:", files);

    if (files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setSelectedImage(imageUrl);
    }
  };

  createEffect(() => {
    const dropArea = document.getElementById("drop-area");

    // Handle click on the drop area to trigger the hidden file input
    dropArea.addEventListener("click", () => {
      document.getElementById("file-input").click();
    });
  });

  // Create a memo to dynamically switch between ImageUploader and ImageViewPage
  const currentPage = createMemo(() => {
    if (selectedImage()) {
      return <ImageViewPage image={selectedImage()} />;
    } else {
      return (
        <div
          id="drop-area"
          class={`${
            isDragging()
              ? "border-green-500"
              : ishover()
              ? "border-gray-500"
              : "border-gray-300"
          } border-2 border-dashed rounded-md p-24 text-center cursor-pointer`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onMouseEnter={() => setIshover(true)}
          onMouseLeave={() => setIshover(false)}
        >
          <svg
            class="text-gray-300 w-20 h-20 mx-auto mb-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            fill="white"
          >
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
          </svg>
          <p class="text-lg">Drop any files here</p>
          <input
            type="file"
            id="file-input"
            class="hidden"
            onChange={handleFileInputChange}
            multiple
          />
        </div>
      );
    }
  });

  return (
    <div class="min-h-screen flex items-center justify-center overflow-hidden">
      {currentPage()}
    </div>
  );
}

export default ImageUploader;
