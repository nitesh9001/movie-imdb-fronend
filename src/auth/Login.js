import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/CloseRounded";
import { useDispatch } from 'react-redux';
import { doLogin } from '../services/AuthService';
import { validateEmail } from '../utlis/genric';

function Login(props) {
    
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isErrorE, setIsErrorE] = useState(false);
    const [isErrorP, setIsErrorP] = useState(false);
    const [isErrorC, setIsErrorC] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    
    const dologinCall = () => {
      setButtonClicked(true);
      console.log(email,password,"jej")
      if(email && password){
          const dataAuth ={
          email: email.toLowerCase(),
          password: password
        };
        doLogin(dataAuth, dispatch, setIsErrorC, setButtonClicked)
      }
      else{
        setButtonClicked(false)
        setIsErrorP(!password && true);
        setIsErrorE(!email && true);
      }
    }
    return (
      <Dialog
        open={props.open}
        onClose={() => {
          props.close(false);
        }}
        aria-labelledby="responsive-dialog-title"
        style={{background: 'rgba(255,0,0,0.5)'}}
      >
        <DialogTitle id="responsive-dialog-title">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon
              style={{ cursor: "pointer" }}
            onClick={() => {
            props.close(false);
            }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
              <span><b style={{color:"black", fontSize:"28px", fontFamily:"revert"}}>Login</b></span>
              <span style={{color:"red", fontSize:"18px", fontFamily:"revert"}}>Welcome Again Master !</span>   
          </div>
        </DialogTitle>
        <DialogContent>
           <br/>
              <TextField 
                 type="email"  
                 variant="outlined" 
                 size="small" 
                 placeholder="Enter your email" 
                 onChange = {(e)=> {
                   setIsErrorE(validateEmail(e.target.value) ? false : true);
                   setEmail(e.target.value)
                 }}
                 required
                 error={isErrorE || isErrorC}
                 helperText={isErrorE && "Email is required / Invalid"}
                 />
              <br/>
              <br/>
              <TextField 
              type="password" 
              variant="outlined" 
              size="small" 
              placeholder="Enter your Password" 
              onChange = {(e)=> {
                   setIsErrorP(false);
                   setPassword(e.target.value)
              }}
              required
              error={isErrorP || isErrorC}
              helperText={isErrorP && "Password is required"}
                 />
          <br/><br/><br/>
          <div style={{ display: "flex", justifyContent: "center" }}>
           
            <Button
              onClick={dologinCall}
              variant="contained"
              color="primary"
              size="small"
              style={{
                height:"30px",
                background: "red",
                color: "white",
                fontSize:"18px",
                fontWeight:"500",
                borderRadius:"50px",
                textTransform: "None",
                marginBottom:"20px"
              }}
              disabled={buttonClicked}
            >
                {buttonClicked ? "Login ..." : "Login" }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}

export default Login
