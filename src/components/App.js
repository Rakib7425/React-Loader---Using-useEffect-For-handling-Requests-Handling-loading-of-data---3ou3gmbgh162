import React from "react";
import "../styles/App.css";
import Loader from "./Loader";

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
};

const App = () => {
  const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
  const [userId, setUserId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(LoadingStatus.NOT_STARTED);
  const [userData, setUserData] = React.useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    webiste: "",
  });

  const handleOnClick = () => {
  // set the loading status to in progress
  setIsLoading(LoadingStatus.IN_PROGRESS);
  // fetch the user data from the API using the userId
  fetch(`${BASE_URL}/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      // set the user data state with the fetched data
      setUserData({
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        website: data.website,
      });
      // set the loading status to success after a delay of 2 seconds
      setTimeout(() => {
        setIsLoading(LoadingStatus.SUCCESS);
      }, 2000);
    })
    .catch((error) => {
      // handle any errors here
      console.error(error);
    });
};

  
  const onChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  return (
      <div id="main">
        <label htmlFor="number">Enter an id for the user between 1 to 10</label>
        <input
          type="number"
          value={userId}
          onChange={onChangeHandler}
          id="input"
          min={1}
          max={10}
        />
        <button id="btn" onClick={handleOnClick}>
          Get User
        </button>
    
        <div id="data">
          {isLoading === LoadingStatus.NOT_STARTED ? (
            <h1>Click on the button to get the user</h1>
          ) : isLoading === LoadingStatus.IN_PROGRESS ? (
            <Loader />
          ) : (
            <>
              <h4 id="id">{userData.id}</h4>
              <h4 id="email">{userData.email}</h4>
              <h4 id="name">{userData.name}</h4>
              <h4 id="phone">{userData.phone}</h4>
              <h4 id="website">{userData.website}</h4>
            </>
          )}
        </div>
      </div>
    );
}
export default App;
