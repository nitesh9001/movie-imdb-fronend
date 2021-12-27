import React ,{useState, useEffect} from 'react';
import { Button, TextField } from '@material-ui/core'
import { Col, Row } from 'reactstrap'
import '../App.css'
import StarIcon from "@material-ui/icons/Star";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Autocomplete, Rating } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { addGenre, getGenre } from '../services/genreService';
import { addMovies, getSingleMovies, updateMovies } from '../services/movieServices';
import { dateFormater } from '../utlis/genric';

function AddMovie(props) {
    const genersDa = useSelector((state) => state);
    console.log("Basic redux data" ,genersDa);
    const dispatch = useDispatch();
    const genersData = useSelector((state) => state?.genre?.genre);
    const userData = useSelector((state) => state?.auth?.user);
    const [genres, setGenres] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [openInputS, setOpenInputS] = useState(false);
    const [openInputL, setOpenInputL] = useState(false);
    const [saveClicked, setSaveClicked] = useState(false);
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [writer, setWriter] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState('');
    const [storyLine, setstoryLine] = useState('');
    const [genresd, setGenresd] = useState([]);
    const [language, setLanguage] = useState([]);
    const [stars, setStars] = useState([]);
    const [dataStar, setDataStar] = useState([]);
    const [dataLanguage, setDataLanguage] = useState([]);
    const [isFormInvalid, setIsFormInvalid] = useState('');
    const [posterurl, setPosterurl] = useState('');
    const [upadate, setUpdate] = useState(false)
    const [images, setImage] = useState('');
    const [isFormInvalidImage, setIsFormInvalidImage] = useState(false);

    const fetchGenres = () => {
      getGenre(dispatch);
    }
    
    useEffect(()=> {
      fetchGenres();
    },[]);
    
    const setSingleMovie = ( data ) => {
       const response = data[0];
       setTitle(response?.title);
       setDescription(response?.desription);
       setstoryLine(response?.storyline);
       setRating(response?.rating);
       setDuration(response?.duration);
       setDirector(response?.director);
       setWriter(response?.writer);
       setReleaseDate(dateFormater(response?.releaseDate));
       setStars(response?.stars);
       setLanguage(response?.language);
       setGenresd(response?.genres);
       
       setImage(response?.posterurl ?  response?.posterurl?.data : "https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-300x245.jpg")
       console.log(response?.language)
    }
    console.log(typeof releaseDate)
    const fetchMovie = (id)=> {
      const requestBody = {
        id : id
      }
      getSingleMovies(dispatch, requestBody, setSingleMovie);
    };
    useEffect(() => {
      console.log(props.match.params?.movie_id);
      if(props.match.params?.movie_id){
        fetchMovie(props.match.params?.movie_id);
        setUpdate(true);
      }
    },[]);

    const addGenres = () => {
      setButtonClicked(true);
      const requestbody = {
         type: genres
      }
      addGenre(dispatch, requestbody, setButtonClicked,setOpenInput, fetchGenres);
    }

    const validate = () => {
      return (title && director && writer && duration && 
        rating && description && storyLine && genresd && 
        releaseDate && language) ? true : false;
    };
    const d_genres=[];
    const genresdfunc = () => {
      genresd?.map(element => {
        d_genres.push(element._id)
      });
    }
    const formData = new FormData() ;

    const updateMovie = (e) => {
      e.preventDefault();
      setIsFormInvalid(!validate());
      setSaveClicked(true);
      genresdfunc();
      formData.append( "desription", description);
      formData.append( "storyline", storyLine);
      formData.append( "director", director);
      formData.append( "writer", writer);
      formData.append( "stars", JSON.stringify(stars));
      formData.append( "language",JSON.stringify(language));
      formData.append( "releaseDate", releaseDate);
      formData.append( "year", new Date(releaseDate)?.getFullYear())
      formData.append( "duration", duration);
      formData.append( "rating", rating);
      formData.append( "genres", JSON.stringify(d_genres));
      formData.append( "file", posterurl);
  
      updateMovies(props.match.params?.movie_id,dispatch, formData,setSaveClicked)
    
    }
    const saveMovies = (e) => {
      e.preventDefault();
      setIsFormInvalid(!validate());
      if(!posterurl){
        setIsFormInvalid(true);
      }
      else{
      setSaveClicked(true);
      genresdfunc();
      formData.append( "title", title);
      formData.append( "desription", description);
      formData.append( "storyline", storyLine);
      formData.append( "director", director);
      formData.append( "writer", writer);
      formData.append( "stars", JSON.stringify(stars));
      formData.append( "language", JSON.stringify(language));
      formData.append( "releaseDate", releaseDate);
      formData.append( "year", new Date(releaseDate)?.getFullYear())
      formData.append( "duration", duration);
      formData.append( "file", posterurl);
      formData.append( "rating", rating);
      formData.append( "genres", JSON.stringify(d_genres));
      formData.append( "status", true);
      formData.append( "creator", userData?._id);
      
      addMovies(dispatch, formData,setSaveClicked)
      }
      console.log(language, stars)

    }
    const fileCheck = (e,file) => {
      console.log(file.type)
      if(file?.type === 'image/jpeg' || file?.type === 'image/jpg' || 
      file?.type === 'image/png'
      ){
        setPosterurl(file);
        setImage('');
      }
      else{
        setPosterurl('');
        setImage('');
        setIsFormInvalidImage(true);
      }
    }
    const dsa={accept:".jpg,.png,.jpeg"}
    console.log(userData)
    return (
        <div className="form_back">
          <form method="post" encType="multipart/form-data">
            <h1 style={{textAlign:"center", color:"red"}}>{props.match.params?.movie_id ? "Edit ":"Add"} Movie</h1>
            <div className="text_list">
              <div>
              <Row
                style={{
                  paddingLeft: 10,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Title : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"40px"}}>
                  <TextField
                    required={true}
                    error={isFormInvalid}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    value={title}
                    style={{ backgroundColor: "#F5F5F5" }}
                    placeholder="Title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    disabled={upadate}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  paddingLeft: 10,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Director Name : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"40px"}}>
                  <TextField
                    
                    required={true}
                    error={isFormInvalid}
                    value={director}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    style={{ backgroundColor: "#F5F5F5" }}
                    placeholder="Director Name"
                     onChange={(e) => {
                      setDirector(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  paddingLeft: 10,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}>  Writer: </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"40px"}}>
                  <TextField
                    
                    required={true}
                    error={isFormInvalid}
                    value={writer}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    style={{ backgroundColor: "#F5F5F5" }}
                    placeholder="Writer"
                     onChange={(e) => {
                      setWriter(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  paddingLeft: 10,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Release Date : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"40px"}}>
                  <TextField
                    required={true}
                    InputLabelProps={{ shrink: true }}
                     fullWidth
                    error={isFormInvalid}
                    margin="dense"
                    value={releaseDate}
                    variant="outlined"
                    type="date"
                    style={{ backgroundColor: "#F5F5F5" }}
                    placeholder="Release Date"
                     onChange={(e) => {
                       setReleaseDate(e.target.value);
                    }}
                  />
                </Col>
              </Row>    
              </div>
              <div>
              <Row
                style={{
                  paddingLeft: 10,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"space-between"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Poster Image : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"40px"}}>
                  <TextField
                    required={true}
                    inputProps={dsa}
                    helperText={isFormInvalidImage ? "This file type is not accepted" : " only png/ jpeg/jpg"}
                    error={isFormInvalid || isFormInvalidImage}
                    margin="dense"
                    variant="outlined"
                    type="file"
                    style={{ backgroundColor: "#F5F5F5" }}
                    placeholder="File"
                    onChange={(e) => {
                      fileCheck(e,e.target.files[0]);
                    }}
                  />
                  <RefreshIcon  style={{fontSize: 36, padding: 5, cursor:"pointer"}} onClick={() => {
                    setPosterurl('');
                  }}/>
                </Col>
              </Row>
             
             {upadate && images && <Row>
               <div className="imd_add_border">
                  {/* <CloseIcon onClick={() => {
                    setImage('');
                  }} style={{position:"absolute", right:-20, top:-20,fontSize:30 , borderRadius:"50px", border:"4px solid red"}} size={"large"}/> */}
                 <img src={images} alt="" width="100%" height="250px" alt="No image to show, Choose to add new"/>
               </div>
             </Row>
             }
            </div>
            </div>
             <Row
                style={{
                  paddingLeft: 110,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"start"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}>  Duration : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"60px"}}>
                  <TextField
                    required={true}
                    error={isFormInvalid}
                    value={duration}
                    margin="dense"
                    variant="outlined"
                    type="number"
                    style={{ backgroundColor: "#F5F5F5" }}
                    placeholder="Duration"
                     onChange={(e) => {
                      setDuration(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  paddingLeft: 110,
                  margin: "30px auto",
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"start"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}>  Ratings : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"60px"}}>
                   <Rating
                    style={{marginTop:"12px"}}
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        // setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    size="large"/>
                </Col>
              </Row>
             <Row
                style={{
                  paddingLeft: 110,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"start",
                  marginBottom:"10px"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Languages : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"45px",textTransform:"capitalize"}}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={upadate ? [] : language}
                    getOptionLabel={(option) => option}
                    value={language ? language : [] }
                    filterSelectedOptions
                    onChange={(e,value) => {
                        setLanguage(value);
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Language"
                        placeholder="Language"
                        size="small"
                        style={{width:"400px"}}
                        required={true}
                        error={isFormInvalid}
                    />
                    )}
                />
                </Col>
                <Col>
                  <Button size="small" 
                    color="primary"
                    style={{
                        background: "red",
                        color: "white",
                        fontSize:"10px",
                        borderRadius:"50px",
                        textTransform: "None",
                        width: 100,
                        marginLeft:20,
                        marginRight:20
                    }} onClick={()=>{
                        setOpenInputL(!openInputL);
                    }} >
                        Add Language
                </Button>
                </Col>
                  { openInputL && <>
                  <TextField
                    required={true}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    style={{ backgroundColor: "#F5F5F5",width:"200px" }}
                    placeholder="Language"
                    onChange={(e) => {
                      setDataLanguage(e.target.value);
                    }}
                  /> 
                  <Button size="small" 
                    color="primary"
                    style={{
                        background: "red",
                        color: "white",
                        fontSize:"10px",
                        borderRadius:"50px",
                        textTransform: "None",
                        width: "auto",
                        marginLeft:20,
                        marginRight:20
                    }} onClick={()=>{
                        language.push(dataLanguage);
                        setOpenInputL(!openInputL);
                        console.log("doe",language);
                    }} 
                    >
                      { buttonClicked ? "Saving.." : "Add"} 
                </Button>
                </>}
            </Row>
            
            <Row
                style={{
                  paddingLeft: 110,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"start",
                  marginBottom:"10px"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Stars : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"83px",textTransform:"capitalize"}}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={upadate ? [] : stars}
                    getOptionLabel={(option) => option}
                    value={stars ? stars : []}
                    filterSelectedOptions
                    onChange={(e,value) => {
                        setStars(value);
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Stars"
                        placeholder="Stars"
                        size="small"
                        style={{width:"400px"}}
                        required={true}
                        error={isFormInvalid}
                    />
                    )}
                />
                </Col>
                <Col>
                  <Button size="small" 
                    color="primary"
                    style={{
                        background: "red",
                        color: "white",
                        fontSize:"10px",
                        borderRadius:"50px",
                        textTransform: "None",
                        width: 100,
                        marginLeft:20,
                        marginRight:20
                    }} onClick={()=>{
                        setOpenInputS(!openInputS);
                    }} >
                        Add Stars
                </Button>
                </Col>
                  { openInputS && <>
                  <TextField
                    required={true}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    style={{ backgroundColor: "#F5F5F5",width:"200px" }}
                    placeholder="Stars"
                    onChange={(e) => {
                      setDataStar(e.target.value);
                    }}
                  /> 
                  <Button size="small" 
                    color="primary"
                    style={{
                        background: "red",
                        color: "white",
                        fontSize:"10px",
                        borderRadius:"50px",
                        textTransform: "None",
                        width: "auto",
                        marginLeft:20,
                        marginRight:20
                    }} onClick={()=>{
                        stars.push(dataStar);
                        setOpenInputS(!openInputS);
                        console.log("doe",stars);

                    }} 
                    disabled={buttonClicked}
                    >
                      { buttonClicked ? "Saving.." : "Add"} 
                </Button>
                </>}
            </Row>
            <Row
                style={{
                  paddingLeft: 110,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"start"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Genres : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"70px",textTransform:"capitalize"}}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={genersData}
                    getOptionLabel={(option) => option.type}
                    value={genresd? genresd : []}
                    filterSelectedOptions
                    onChange={(e,value) => {
                        setGenresd(value);  
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Genres"
                        placeholder="Favorites"
                        size="small"
                        style={{width:"400px"}}
                        required={true}
                        error={isFormInvalid}

                    />
                    )}
                />
               
                </Col>
                <Col>
                  <Button size="small" 
                    color="primary"
                    style={{
                        background: "red",
                        color: "white",
                        fontSize:"10px",
                        borderRadius:"50px",
                        textTransform: "None",
                        width: 100,
                        marginLeft:20,
                        marginRight:20
                    }} onClick={()=>{
                        setOpenInput(!openInput)
                    }} >
                        Add Genres
                </Button>
                </Col>
                  { openInput && <>
                  <TextField
                    required={true}
                    margin="dense"
                    variant="outlined"
                    type="text"
                    style={{ backgroundColor: "#F5F5F5",width:"200px" }}
                    placeholder="Genres"
                    onChange={(e) => {
                      setGenres(e.target.value)
                    }}
                  /> 
                  <Button size="small" 
                    color="primary"
                    style={{
                        background: "red",
                        color: "white",
                        fontSize:"10px",
                        borderRadius:"50px",
                        textTransform: "None",
                        width: "auto",
                        marginLeft:20,
                        marginRight:20
                    }} onClick={()=>{
                       addGenres()
                    }} 
                    disabled={buttonClicked}
                    >
                      { buttonClicked ? "Saving.." : "Add"} 
                </Button>
                </>}
              </Row>       
            <Row
                style={{
                  paddingLeft: 110,
                  alignContent: "center",
                  alignItems: "center",
                  display:'flex',
                  flexDirection:"row",
                  justifyContent:"start"
                }}
                sm="8"
              >
                <Col sm="3">
                  <label>
                    <b style={{ fontSize: "14px" }}> Description : </b>
                  </label>
                </Col>
                <Col sm="3" style={{marginLeft:"40px"}}>
                  <TextField
                    multiline
                    required={true}
                    error={isFormInvalid}
                    margin="dense"
                    variant="outlined"
                    value={description}
                    type="text"
                    style={{ backgroundColor: "#F5F5F5",width:"400px" }}
                    placeholder="Description"
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
                </Col>
              </Row>    
            <Row
            style={{
                paddingLeft: 110,
                alignContent: "center",
                alignItems: "center",
                display:'flex',
                flexDirection:"row",
                justifyContent:"start"
            }}
            sm="8"
            >
            <Col sm="3">
                <label>
                <b style={{ fontSize: "14px" }}> Storyline : </b>
                </label>
            </Col>
            <Col sm="3" style={{marginLeft:"58px"}}>
                <TextField
                multiline
                required={true}
                error={isFormInvalid}
                margin="dense"
                variant="outlined"
                type="text"
                value={storyLine}
                style={{ backgroundColor: "#F5F5F5", width:"400px" }}
                placeholder="Storyline"
                onChange={(e) => {
                      setstoryLine(e.target.value)
                    }}
                />
            </Col>
            </Row>    
            <div className="btn_save_update">
              {!saveClicked && <Button size="small" 
                    color="primary"
                    variant="outlined"
                    style={{
                        background: "white",
                        color: "red",
                        fontSize:"17px",
                        fontWeight:"500",
                        borderRadius:"50px",
                        textTransform: "None",
                        width: 110,
                        marginRight:20
                    }} onClick={(e)=>{
                        props.history.goBack();
                    }}
                    >
                    Back
                </Button>
               }
                {upadate ? <Button size="small" 
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
                    }} onClick={(e)=>{
                        updateMovie(e)
                    }}
                    disabled={saveClicked}
                    >
                      {saveClicked ? "Updating.." : "Update" }
                </Button>
                :
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
                    }} onClick={(e)=>{
                        saveMovies(e);
                    }}
                    disabled={saveClicked}
                    >
                      {saveClicked ? "Saving.." : "Save" }
                </Button>}
              </div>
              </form>
        </div>
    )
};

export default AddMovie
