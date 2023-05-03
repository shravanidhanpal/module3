import React, { useState, useEffect,useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../Input/Input';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return{value: action.val, isValid:action.val.includes('@')};
  }
  if(action.type==='INPUT_BLUR'){
    return{value: state.value,isValid:state.value.includes('@')};
  }
  return{value:'',isValid:false};
};

const passwordReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return{value: action.val, isValid:action.val.trim().length>6};
  }
  if(action.type==='INPUT_BLUR'){
    return{value: state.value,isValid:state.value.trim().length>6};
  }
  return{value:'',isValid:false};
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const AuthCtx=useContext(AuthContext);
  const[emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:null});
  const[passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null});
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value});
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length>6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
           isValid={emailState.isValid}
           htmlFor="email"
           label="E-Mail"
           type="email"
           id="email"
           value={emailState.value}
           onChange={emailChangeHandler}
           onBlur={validateEmailHandler}
        />
        <Input
           isValid={passwordState.isValid}
           htmlFor="password"
           label="Password"
           type="password"
           id="password"
           value={passwordState.value}
           onChange={passwordChangeHandler}
           onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
