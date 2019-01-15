import React, { Component } from 'react'
import styled from 'styled-components'


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
    padding:5px;
    `
    

export default class login extends Component {

  
  render() {
    return (
      <div>
        <div className='title'>
            <Title>
            <h1>Trello</h1>
            </Title>
        </div>
        
        <div className='input-fields'>
            <form>
           
            <LoginPageInputField>
        
            <br />
        <input type='text' className='form-control' placeholder='email' onChange={event =>
          this.setState({ username: event.target.value })
        }/>
       
        <br/>
        <label></label>
        <br />
        
        <input type='text' className='form-control'placeHolder='Password' onChange={event =>
          this.setState({ password: event.target.value })}/>
        
        <Button>
        Login
        </Button>
        
        </LoginPageInputField>
        
        </form>
        
      </div>
      </div>
      
    )
  }
}