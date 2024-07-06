
import './App.css'
import Header from './componnents/common/header/Header'
import Navbar from './componnents/layouts/navbar/Navbar'
import Footer from './componnents/common/footer/Footer'
import Home from './componnents/layouts/home/Home'

function App() {
  

  return <div className='App'>
    <Header/>
    <Navbar/>
    <Home/>
    <Footer/>
  </div>
}

export default App
