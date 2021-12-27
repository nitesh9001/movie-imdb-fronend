import React, {  useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import AddMovie from "./Screens/AddMovie";
import Dashboard from "./Screens/Dashboard";
import ViewDetails from "./Screens/ViewDetails";

const Routers = () => {
    const [search, setsearch] = useState('')
    
    return (
      <Router>
        <App setsearch = {setsearch}>
            <Switch>
                 <Route exact path={"/"} component = {() => <Dashboard searchkey_text={search} />}/>
                 <Route exact path={"/viewDetails/:movie_id"} component={ViewDetails} />
                 
                {localStorage.getItem('jwt-token-login')?.length > 0 ? 
                 <>
                  <Route exact path={"/addmovie"} component={AddMovie} />
                  <Route exact path={"/editmovie/:movie_id"} component={AddMovie} />
                 </>
                :
                <Redirect exact to={"/"} component={Dashboard} />
                }
            </Switch>
        </App>
      </Router>
    );
  }

export default Routers;