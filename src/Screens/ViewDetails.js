import React, {useEffect, useState} from 'react'
import { Chip } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import '../App.css'
import { getSingleMovies } from '../services/movieServices'
import {formatDate, getHrminFormate} from '../utlis/genric'
import { useDispatch } from 'react-redux';
import Spinner from '../Spinner'

const ViewDetails = (props) => {
 
     const dispatch = useDispatch();
     const [singleData, setSingleData] = useState('');
     const [isLoading, setIsLoading] = useState(true);

     const setSingleMovie = (data) => {
       setSingleData(data[0]);
       setIsLoading(false);
     }

     const fetchMovie = (id)=> {
      const requestBody = {
        id : id
      }
      getSingleMovies( dispatch, requestBody, setSingleMovie );
    }

    useEffect(() => {
      console.log(props.match.params?.movie_id);
      if(props.match.params?.movie_id){
        fetchMovie(props.match.params?.movie_id);
      }
    },[]);
    const imageGetter = (imgString) => {
      var image = imgString?.data.toString('base64');
      var imageReturned = `data:${imgString?.contentType};base64,` + image
      return imageReturned
    }

    return (
        <div>
            <div className="movie_card_details">
            {isLoading ? <Spinner /> : singleData ?  
            <>
                <div className="movie_card_left">
                   <img src={singleData?.posterurl ? singleData?.posterurl?.data :""} alt="" className="img_deatils"/>
                </div>
                <div className="movie_card_right">
                   <div className="movie_card_right_info">
                       <div style={{position:"relative"}}>
                            <div className="crator_flag">
                                <div className="skew_text">Creator : {singleData?.creator[0]?.name}</div>
                            </div>
                       </div>
                       <div>
                           <span style={{fontSize:"20px", textTransform:"capitalize"}} ><b>{singleData?.title} ( {singleData?.year} )</b></span>
                       </div>
                        <div className="rating_voting">
                           <span style={{marginTop:"1px",marginRight: 10, padding:"10px 0px"}}>
                               <Rating name="read-only"  value={Number(singleData?.rating)} readOnly precision={0.5}/>
                            </span> 
                            <b style={{fontSize:"16px",paddingTop:"15px",color:"rgba(255, 180, 0, 0.801)"}}>
                               {getHrminFormate(singleData?.duration)}
                            </b>
                       </div>
                       <div>
                           {singleData?.genres && singleData?.genres?.map(d => <Chip label={d.type} size="small" style={{width:"auto",height:"15px",fontSize:10,textTransform:"capitalize", background:"red",color:"white", padding:"10px",margin:"0 5px"}}/> )}
                       </div>
                       <br/>
                       <div>
                           Release Date : {formatDate(singleData?.releaseDate)}
                       </div>
                       <div>
                           <p style={{fontSize:"15px"}}>
                              {singleData?.storyline}
                           </p>
                       </div>
                       <div>
                           <p style={{fontSize:"15px"}}>
                              {singleData?.desription}
                           </p>
                       </div>
                       <div>
                           <b>Cast : </b>
                           <div style={{padding:"20px"}}>
                               {singleData?.stars && singleData?.stars?.map(d => <Chip label={d} size="small" style={{width:"auto",height:"15px",fontSize:10,textTransform:"capitalize", background:"rgba(255, 166, 0, 0.901)",color:"white", padding:"10px",margin:"0 5px"}}/> )}
                           </div>
                           
                       </div>
                       <div>
                            <b>Director :</b>
                           <div style={{padding:"20px"}}>
                            <Chip label={singleData?.director} size="small" style={{width:"auto",height:"15px",fontSize:10, background:"rgba(255, 166, 0, 0.901)",color:"white", padding:"10px",margin:"0 5px"}}/>
                           </div>
                       </div>
                        <div>
                            <b>Writer :</b>
                            <div style={{padding:"20px"}}>
                               <Chip label={singleData?.writer} size="small" style={{width:"auto",height:"15px",fontSize:10, background:"rgba(255, 166, 0, 0.901)",color:"white", padding:"10px",margin:"0 5px"}}/>
                            </div>
                       </div>
                       <div>
                           <b>Language : </b>
                           <div style={{padding:"20px"}}>
                               {singleData?.language && singleData?.language?.map(d => <Chip label={d} size="small" style={{width:"auto",height:"15px",fontSize:10,textTransform:"capitalize", background:"white",color:"red", padding:"10px",margin:"0 5px", borderRadius:"0px"}}/> )}
                           </div>
                           
                       </div>
                   </div>
                </div>
            </>
            : <>
                <div style={{color:"white", textAlign:"center",width:"100%", fontSize:40}}>
                   <b>No data Found</b>
                </div>
            </> }
            </div>
        </div>
    )
}

export default ViewDetails
