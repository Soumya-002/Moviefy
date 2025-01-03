import { Outlet } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import MobileNavigation from './components/mobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import  { useDispatch } from 'react-redux'
import { setBannerData,setImageURL } from './store/movieoSlice'


function App() {
  
  const dispatch = useDispatch();

  const TrendingData = async() => {
    try {
      const response = await axios.get('/trending/all/week');

      dispatch(setBannerData(response.data.results));
      console.log(response.data);
    } catch (error) {
      console.log("error",error.toJSON());
    }
  }

  const fetchConfiguration = async() => {
    try {
      const result = await axios.get('/configuration');
      dispatch(setImageURL(result.data.images.secure_base_url+"original"));

      // console.log("config Data",result.data.images.secure_base_url+"original");
    } catch (error) {
      console.log("error",error.toJSON());
    }
  }

  useEffect(() => {
    TrendingData();
    fetchConfiguration();
  },[]);

  return (
    <main className='pb-14 lg:pb-0'>
        <Header/>
        <div className=''>
          <Outlet/>
        </div>
        <MobileNavigation/>
    </main>
  );
}

export default App;
