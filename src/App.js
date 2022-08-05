import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateComment from './components/CreateComment';
import Footer from './components/Footer';
import CooksList from './pages/CooksList';
import CookDetailsPage from './pages/DetailsOfCook';
import ProfilePage from './pages/Profile';
import MealsList from './pages/MealsList';
import MealDetails from './pages/MealDetails';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsAnon from './components/IsAnon';
import { useState, useEffect } from "react";
import axios from "axios";
import EditMeal from './pages/EditMeal';
import CreateMeal from './components/CreateMeal';


function App() {
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);


  const getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  };

  const getAllMeals = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meals`)
      .then((response) => setMeals(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllUsers();
    getAllMeals();
  }, []);


  const deleteMeal = (mealId) => {
    setMeals((meals) => {
      const newList = meals.filter((element) => {
        return element._id !== mealId;
      });
      return newList;
    });
  }


  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage users={users} meals={meals} />} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="profile/:userId" element={<ProfilePage />}></Route>
        <Route path="new-comment" element={<CreateComment />}></Route>
        <Route path="cooks" element={<CooksList />}></Route>
        <Route path="cooks/:cookId" element={<CookDetailsPage />}></Route>
        <Route path="meals" element={<MealsList setMeals={setMeals} meals={meals} />}></Route>
        <Route path="create-meal" element={<CreateMeal update={setMeals} />}></Route>
        <Route path="meals/:mealId" element={<MealDetails deleteMeal={deleteMeal} meals={meals} />}></Route>
        <Route path="edit-meal/:mealId" element={<EditMeal />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
