import React, {useEffect } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
import { requestRobots, setSearchField } from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error:state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => requestRobots(dispatch)
    }
    
}

const App = ({searchField, onSearchChange,robots,isPending ,onRequestRobots} ) => {
    useEffect(() => {
        onRequestRobots();
    }, [onRequestRobots]);
//function App()  {
    // const [searchfield, setSearchField]=useState('');
 //   const [robots, setRobots]=useState([]);

    // useEffect(() => {
    //     this.props.onRequestRobots();
        
    // },[])

    //  const onSearchChange = (event) => {
    //     setSearchField(event.target.value) 
    // } 
      //  const {searchfield, onSearchChange,robots,isPending } = this.props;
      console.log('robots:', robots);
      console.log('searchField:', searchField);
      
      const filterRobots = (robots || []).filter(robot => {
        return robot.name && robot.name.toLowerCase().includes(searchField.toLowerCase());
      });

        // const filterRobots = robots.filter(robot => {
        //   //  return robot.name.toLowerCase().includes(searchField.toLowerCase());
        //   return robot.name && robot.name.toLowerCase().includes(searchfield.toLowerCase());
        // })
        return isPending ? (
            <h1>Loading Robots</h1>) :  
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
export default connect(mapStateToProps, mapDispatchToProps)(App);