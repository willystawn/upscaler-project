// App.jsx
import styles from "./App.module.css";
import ImageUploader from "./components/ImageUploader";

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <ImageUploader />
      </header>
    </div>
  );
}

export default App;
