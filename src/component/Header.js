import React, {useState } from 'react'
import img from '../assets/food.png';
import SearchIcon from '@material-ui/icons/Search'
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
import { Button } from '@material-ui/core';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../services/AuthService';
import { searchMovies } from '../services/movieServices';

function Header(props) {
    const dispatch = useDispatch();
    const [openRegsiter, setOpenRegsiter] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [searchkey, setSeachKey] = useState('');
    const dataSelect = useSelector((state) => state.auth.user);
    const showButon = localStorage.getItem('jwt-token-login')?.length > 0 ? false : true;
    return (
        <>
        <div className="main-nav-wrapper">
           <div className="nav-wrapper">
               <div className= "nav-left" >
                  <div className= "nav-logo">
                      <img src={img} width="80" className="logo" alt=""/> 
                      <div className="logo_p">Cinema Pool</div>
                  </div>
               </div>
               <div className= "nav-right" >
                    <div className="">
                    <InputGroup className="inputgroup-search" size="lg"  >
                      <InputGroupAddon addonType="prepend" style={{background:"rgba(255, 0, 0, 0.397)"
                         ,color:"white", textTransform:"uppercase",
                         borderRadius:50, fontSize:"15px",
                         paddingLeft:20, paddingRight:20
                        }}>
                        <InputGroupText >
                          <p>Movies</p>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="search"
                        id="search"
                        className="seacrh_input"
                        name="search"
                        value={searchkey}
                        onChange={(e) => {
                           setSeachKey(e.target.value);
                        }}
                        placeholder="Search Movie"
                      />
                       <InputGroupAddon addonType="append" >
                            <Button className="button_search"
                            onClick={() => {
                                 props?.setsearch(searchkey);
                                // searchMovies(dispatch, searchkey );
                            }} 
                            style={{cursor:"pointer",marginTop:"2px", color:"red",padding:"8px 20px", borderRadius:40}}>
                                <SearchIcon />
                            </Button>
                       </InputGroupAddon>
                    </InputGroup>
                    </div>
                    {showButon ? <div className="btn-margin">
                        <Button size="small" 
                        color="primary"
                        style={{
                            background: "red",
                            color: "white",
                            fontSize:"17px",
                            fontWeight:"500",
                            borderRadius:"50px",
                            textTransform: "None",
                            width: 110,
                            marginRight:20
                        }} onClick={()=>{
                            setOpenLogin(true)
                        }}>
                            Login
                        </Button>
                        <Button size="small" style={{
                            background: "white",
                            color: "red",
                            fontSize:"17px",
                            fontWeight:"500",
                            borderRadius:"50px",
                            textTransform: "None",
                            width: 110,
                        }} onClick={()=>{
                            setOpenRegsiter(true)
                        }}>
                            SingUp
                        </Button>
                    </div>
                    :
                    <div className="btn-margin">
                        <span style={{textTransform:"capitalize", color:"white",fontWeight:"bold", marginRight:"10px"}}>{dataSelect?.name}</span>
                        <Button size="small" 
                        color="primary"
                        style={{
                            background: "red",
                            color: "white",
                            fontSize:"17px",
                            fontWeight:"500",
                            borderRadius:"50px",
                            textTransform: "None",
                            width: 110,
                            marginRight:20
                        }}
                        onClick = {()=> {
                            logout()
                        }} 
                        >
                            Logout
                        </Button>
                        </div>
                  }
               </div>
           </div>
        </div>
        <Login open={openLogin} close={setOpenLogin}/>
        <Register open={openRegsiter} close={setOpenRegsiter}/>
        </>
    )
}

export default Header
