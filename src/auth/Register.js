import { Button, Card, Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import CloseIcon from "@material-ui/icons/CloseRounded";
import { useDispatch } from 'react-redux';
import {  doRegister } from '../services/AuthService';
import { validateEmail } from '../utlis/genric';

function Register(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isErrorE, setIsErrorE] = useState(false);
    const [isErrorN, setIsErrorN] = useState(false);
    const [isErrorP, setIsErrorP] = useState(false);
    const [isErrorC, setIsErrorC] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    
    const doregisterCall = () => {
      setButtonClicked(true);
      if(email && password && name){
          const dataAuth ={
            name: name,
            email: email.toLowerCase(),
            password: password
        };
        doRegister(dataAuth, dispatch, setIsErrorC, setButtonClicked)
      }
      else{
        setButtonClicked(false)
        setIsErrorP(!password && true);
        setIsErrorE(!email && true);
        setIsErrorN(!name && true);
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
              <span><b style={{color:"black", fontSize:"28px", fontFamily:"revert"}}>Register</b></span>
              <span style={{color:"red", fontSize:"18px", fontFamily:"revert"}}>We Welcome You Master !</span>
             
          </div>
        </DialogTitle>
        <DialogContent>
           <br/>
            <TextField 
              type="text" 
              variant="outlined" 
              size="small" 
              placeholder="Enter your Name" 
              onChange = {(e)=> {
                   setIsErrorN(false);
                   setName(e.target.value)
              }}
              required
              error={isErrorN}
              helperText={isErrorN && "Name is required"} />
              <br/>
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
                 error={isErrorE }
                 helperText={isErrorE && "Email is required / Invalid"} />
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
                error={isErrorP}
                helperText={isErrorP && "Password is required"}/>
          <br/><br/><br/>
          <div style={{ display: "flex", justifyContent: "center" }}>
           
            <Button
              onClick={() => doregisterCall()}
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
                {buttonClicked ? "Requesting.." : "Singup" }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}

export default Register
