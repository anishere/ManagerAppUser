import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer} from 'react-toastify';
import { UserContext } from './context/userContext.jsx';
import { useContext } from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from 'react';
import AppRoutes from './router/AppRoutes';
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
  const { login } = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      login(localStorage.getItem('email'), localStorage.getItem('token'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
    <div className="app-container">
      <Header/>
      <Container>
        <AppRoutes/>
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
