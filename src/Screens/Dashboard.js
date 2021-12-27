/* eslint-disable react-hooks/exhaustive-deps */
import React ,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { getGenre } from '../services/genreService';
import { getMovies } from '../services/movieServices';
import Card from './Card';
import Spinner from '../Spinner';
import RefreshIcon from "@material-ui/icons/Refresh";
import { searchAction } from '../redux/actions/searchAction';

const Dashboard = (props) => {

    const dispatch = useDispatch();
    const showButon = localStorage.getItem('jwt-token-login')?.length > 0 ? true : false;
    const [isAscending, setIsAscending] = useState(false);
    const genersData = useSelector((state) => state?.genre?.genre);
    const genersDa = useSelector((state) => state);
    const genersMovies = useSelector((state) => state?.movie?.movie);
    const [typeFilter, setTypeFilter] = useState(false);
    const [valFilter, setValFilter] = useState('');
    const [sortVal, setSortVal] = useState('createdAt');
    const [searchval, setSearchval] = useState('');

    useState(() => {
        console.log('pooling', genersDa,"p",props)
        if(props?.searchkey_text && props?.searchkey_text !== ''){
           setSearchval(props?.searchkey_text);
        }
        setTypeFilter(true);
    });

    const fetchMovies = () => {
        const sorting = {
            [sortVal] : isAscending ? 1: -1
        }
        const requestBody = {
            type: valFilter,
            sort: sorting,
            search: searchval
        }
        getMovies(dispatch ,requestBody, setTypeFilter);
    }

    useEffect(()=> {
      getGenre(dispatch);
    //   dispatch(searchAction(''));
    },[]);

    useEffect(()=> {
      fetchMovies();
    },[sortVal,valFilter, isAscending, props?.searchkey_text]);

    return (
        <>
        <div className="center-top-headings">
            <h3 className="wlcome_tag">Wlecom to</h3>
            <h1 className="company_solo">Our Cinema Pool</h1>
            <p className="company_info">Find the list of Latest Hindi Movies of 2021 with trailers and ratings. Also find the details to watch on theaters and online on Netflix, Amazon Prime Video ..</p>
        </div>
        <div>
         <div className="movie_list_heaidng">
            <div>
                <span style={{color:"white", 
                fontWeight:500, 
                fontSize:"20px"}}>Top Movie Listing
                </span>
            </div>

             <div>
                 <Button  size="small" 
                color="primary"
                style={{
                    background: "white",
                    color: "red",
                    fontSize:"17px",
                    fontWeight:"500",
                    borderRadius:"50px",
                    textTransform: "None",
                    marginRight:20
                }} onClick={() => {
                    dispatch(searchAction(''));
                    setValFilter('');
                    setSortVal('createdAt');
                    setIsAscending(true);
                    window.location.reload();
                }}>
                     <RefreshIcon /> Clear
                </Button>
                {showButon && <Button  size="small" 
                color="primary"
                style={{
                    background: "white",
                    color: "red",
                    fontSize:"17px",
                    fontWeight:"500",
                    borderRadius:"50px",
                    textTransform: "None",
                    marginRight:20
                }} href="/addmovie">
                     <AddIcon /> New Movie
                </Button>
               }
                <FormControl  style={{width:"200px", height:"40px"}}>
                    <InputLabel id="demo-simple-select-helper-label" style={{marginTop:-10, marginLeft:10,color:"whitesmoke"}}>Sort Movies</InputLabel>
                    <Select
                    value={sortVal}
                    style={{width:"200px", height:"40px", }}
                    variant="outlined"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Sort Movies"
                    onChange={(e)=>{
                        setTypeFilter(true);
                        setSortVal(e.target.value)
                    }}
                    >
                    <MenuItem value={"createdAt"}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"title"}>Movie Name</MenuItem>
                    <MenuItem value={"rating"}>Rating</MenuItem>
                    <MenuItem value={"year"}>Year</MenuItem>
                    <MenuItem value={"director"}>Direction</MenuItem>
                    </Select>
                </FormControl>
                {
                isAscending ?
                    <IconButton size="small" style={{background:"white", margin:"10px"}} onClick={()=>{
                        setTypeFilter(true);
                        setIsAscending(!isAscending)}}>
                            <ArrowUpwardIcon fontSize="small" style={{color:"red"}}/>
                    </IconButton>
                    :
                    <IconButton  size="small" style={{background:"white", margin:"10px"}} onClick={()=>{
                        setTypeFilter(true);
                        setIsAscending(!isAscending)}}>
                        <ArrowDownwardIcon fontSize="small" style={{color:"red"}}/>
                    </IconButton> 
                }     
            </div>
        </div>
        </div>
        <div className="movie_list_genres">
           {genersData.map((d,i) => 
           <Chip 
            label={d?.type} 
            key={i}
            size="small" 
            style={{width:"auto",
                height:"25px",
                textTransform: "capitalize",
                fontSize:14, 
                background:"rgba(255, 0, 0, 0.901)",
                color:"white", 
                padding:"15px",
                margin:"5px 5px",
                cursor:"pointer"
            }}
            onClick ={(e) => {
              setTypeFilter(true);
              setValFilter(d?.type);
            }}
            />
           )}
        </div>
        <div className="main-wrap">
             <div className="background_list">
             {!typeFilter  ? 
               genersMovies.length !== 0 ? genersMovies.map((data, i) => <Card key={i} data={data} /> ) : 
               <div style={{color:"white", textAlign:"center",width:"100%", fontSize:40}}>
                   <b>No data Found</b>
                </div>
            :
             <Spinner/>
            }
            </div>
        </div>
        </>
    )
}

export default Dashboard
