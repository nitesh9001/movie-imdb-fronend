import React, { useState, useEffect } from 'react'
import { Rating } from '@material-ui/lab';
import { Button, Chip, IconButton } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import  {getHrminFormate, formatDate, upcomingClac } from '../utlis/genric';
import { useDispatch, useSelector } from 'react-redux';
import { delMovies} from '../services/movieServices';

function Card(props) {
    
    const dispatch = useDispatch();
    const userData = useSelector((state) => state?.auth?.user);
    const [state, setstate] = useState('');
    // const [images, setImage] = useState('');
    
    // image parser for Buffer data
    const imageGetter = (imgString) => {
      var image = imgString?.data?.toString('base64');
      var imageReturned = `data:${imgString?.contentType};base64,` + image
      return imageReturned
    }

    const deleteMovies = (id) => {
      delMovies(dispatch, id);
    }
    useEffect(() => {
        setstate(props?.data);
    },[]);

    const equateAuth = () => {
       console.log(state?.creator?.map(d=>d._id)[0]?.toString())
       return state?.creator?.map(d=>d._id)[0]?.toString() === userData?._id?.toString()
    }
    
    return (
        <div className="card_main_warpper">
            <div className="card_image">
                 {upcomingClac(state?.releaseDate) ? <span className="style_upcoming">Upcoming</span> :""}
               <img src={state?.posterurl ? state?.posterurl?.data : "https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg"} className="image_back_card" alt=""/>
               <div className="time"><span>{getHrminFormate(state?.duration)}</span></div>
               <div className="card_details">
                    <div style={{width:"90%", margin:"0 auto"}}>
                      {state?.genres && state?.genres?.map(d => <Chip label={d.type} size="small" style={{width:"70px",height:"15px",fontSize:10,textTransform:"capitalize", background:"rgba(255, 166, 0, 0.931)",color:"white", padding:"10px",margin:"0 5px"}}/> )}
                    </div>
                    <br/>
                   <span style={{textTransform:"capitalize"}}>{state?.title} ( {state?.year} )</span>
                   <span>
                       <Rating name="read-only" value={Number(state?.rating)} readOnly precision={0.5}/>
                    </span>
                    <span style={{fontSize:"14px",color:"wheat"}}>{formatDate(state?.releaseDate)}</span>
               </div>
               <div className="card_details_backspace">
                   <div style={{width:"90%",margin:"0 auto"}}>
                       <div style={{height:"120px"}}>
                          {equateAuth() && <>
                          <IconButton href = {"/editmovie/" + state?._id} aria-label="delete" size="small" style={{background:"white", margin:"10px"}} >
                            <EditIcon fontSize="small" style={{color:"red"}}/>
                          </IconButton>
                          <IconButton aria-label="delete" size="small" style={{background:"white", margin:"10px"}} 
                          onClick= {() => {
                            deleteMovies(state?._id)
                          }}>
                            <DeleteIcon fontSize="small" style={{color:"red"}}/>
                          </IconButton>
                          </>
                         } 
                       </div>
                     <span style={{color:"white",textTransform:"capitalize", fontSize:"14px"}}> {state?.storyline?.substring(0, 100)} ...</span>
                     <div>
                         <Button size={"small"} color="primary"
                        style={{
                            background: "red",
                            color: "white",
                            fontSize:"15px",
                            fontWeight:"500",
                            borderRadius:"50px",
                            textTransform: "None",
                            marginTop:20
                        }}>
                           <AddIcon /> Watch Later
                         </Button>
                     </div>
                     <div>
                         <Button size={"small"} color="primary"
                            style={{
                                background: "white",
                                color: "red",
                                fontSize:"15px",
                                fontWeight:"500",
                                borderRadius:"50px",
                                textTransform: "None",
                                marginTop:20
                            }} 
                            href={"/viewDetails/"+ state?._id}
                        >
                            View Details
                         </Button>
                     </div>
                   </div>
               </div>
            </div>
        </div>
    )
}

export default Card
