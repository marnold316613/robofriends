import React, {useState,useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";

function App()  {
    const [searchfield, setSearchField]=useState('');
    const [robots, setRobots]=useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response=> response.json())
        .then(users => setRobots(users))
        
    },[])

     const onSearchChange = (event) => {
        setSearchField(event.target.value) 
    } 
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ?
            <h1>Loading Robots</h1> :  
            (
            <div className="tc">
            <h1>RoboFriends</h1>
            <SearchBox key="searchBox" searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundry>
                    <CardList key="cardlist" robots={filterRobots}/>
                </ErrorBoundry>
            </Scroll>    
            </div>
        );
    

}
export default App;