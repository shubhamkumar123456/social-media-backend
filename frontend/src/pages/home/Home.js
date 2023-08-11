
import Centerbar from '../../components/centerbar/Centerbar'
import Leftbar from '../../components/leftbaar/Leftbar'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'

import './Home.css'


const Home = () => {
  
  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <Leftbar />
        <Centerbar />
        <Rightbar />
      </div>

    </>
  )
}

export default Home
