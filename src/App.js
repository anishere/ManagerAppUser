import './App.css';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer} from 'react-toastify';
import { Outlet } from 'react-router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBRz3YI7-dkG0PaPgiYiIBRXXdi6nr8xU",
  authDomain: "manageruser-b5105.firebaseapp.com",
  projectId: "manageruser-b5105",
  storageBucket: "manageruser-b5105.appspot.com",
  messagingSenderId: "540285565134",
  appId: "1:540285565134:web:09240ac8421e4b4843789f",
  measurementId: "G-WTK2GPP6WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

function App() {
  return (
    <>
    <div className="app-container">
      <Header/>

      <Container>
        <Outlet />
      </Container>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    </>
  );
}

export default App;
