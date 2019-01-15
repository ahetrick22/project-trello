import React, { Component } from 'react'
import styled from 'styled-components'
import { compose } from 'redux';
import { connect } from 'react-redux';
import {fetchLogin }from '../../Actions/index'

const LoginPageInputField = styled.div`
    text-align: center;
    position: fixed;
    padding-top:200px;
    padding-left:550px;
    padding-bottom:500px
    justify-content: center;
    width: 100px;`

const Title = styled.div`
    padding-top: 50px;
    padding-left: 555px
    font-size: 20px;`


const Button = styled.button`
    border:0;
    border-radius:5px;
    font-size:1.5em;
    font-weight:600;
    margin:10px;
    padding:5px;`

const LoginButton = styled.button`
    background-color: #4CAF50;`
    
class login extends Component {
  constructor(props){
    super(props)
    this.state = {
        email:'',
        password:''
      }
    this.onSubmit= this.onSubmit.bind(this)
}

    onSubmit = props => {
     this.props.login(props, () => {
     this.props.history.push('/');
    });
  };
    
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className='title'>
            <Title>
            <h1>Trello</h1>
            </Title>
        </div>
        
        <div className='input-fields'>
         <div>
           
            <LoginPageInputField>
        
            <br />

        <input type='text' className='form-control' placeholder='email' onChange={event =>
          this.setState({ username: event.target.value })
        }/>
            
            <input type='text' className='form-control' value={this.state.email} placeholder='Email' onChange={event =>
            this.setState({ email: event.target.value }) 
            }/>
       
            <br/>

       
            <br/>
        
            <input type='text' className='form-control' value={this.state.password} placeholder='Password' onChange={event =>
             this.setState({ password: event.target.value })}/>
       
        
            <LoginButton onClick={()=>this.props.login(this.state.email,this.state.password)}>
            Login
            </LoginButton>
        

           </LoginPageInputField>
        
        </div>
        
      </div>
      </div>
      
    )
  }
}


const mapDispatchToProps = {
  login:fetchLogin
}

export default connect(null, mapDispatchToProps)(login) 



