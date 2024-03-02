import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/index.css'

{/* <React.StrictMode>
  <App />
</React.StrictMode>, */}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <App />
  );
} else {
  throw new Error("Root element not found in the document.");
}
