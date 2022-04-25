import { useState } from 'react'
import validator from 'validator';
import './SignUp.css';

function SignUp() {

    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState(null)
    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState(null)
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState(null)
    const [signUpErr, setSignUpErr] = useState(null)

    function handleData(event) {
        event.preventDefault()
        let user = { name, email, password }
        if (emailErr || passwordErr || nameErr) {
            setSignUpErr(true)
        } else {
            user.userType = 1000
            console.log(user)
            setName(null)
            setEmail(null)
            setPassword(null)

            fetch('http://104.154.234.222:8080/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("refreshToken", data.refreshToken)
                    localStorage.setItem("email", data.userProfile.email)
                    localStorage.setItem("userId", data.userProfile.userId)
                    localStorage.setItem("userType", data.userProfile.userType)
                    //localStorage.removeItem("name of the item")

                })
                .catch(error => {
                    //this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                });

        }

        // const response = await fetch('https://api.npms.io/v2/search?q=react');
        // const data = await response.json();
        // this.setState({ totalReactPackages: data.total })
    }

    function nameHandler(event) {
        let name = event.target.value
        setName(name)
        setSignUpErr(false)

        if (name.length === 0) setNameErr(true)
        else setNameErr(false)
    }

    function emailHandler(event) {
        let email = event.target.value
        setEmail(email)
        setSignUpErr(false)

        let isValidEmail = validator.isEmail(email)

        if (!isValidEmail) setEmailErr(true)
        else setEmailErr(false)

        console.log(emailErr)
    }

    function passwordHandler(event) {
        let password = event.target.value
        setPassword(password)
        setSignUpErr(false)

        let isValidPassword = validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false
        })
        console.log(isValidPassword)
        if (!isValidPassword) setPasswordErr(true)
        else setPasswordErr(false)
    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleData}>
                <div>
                    <h2>Sign Up Form</h2>
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Name</label><br />
                    <input 
                        name="name" 
                        type="text" 
                        value={name} 
                        className={`form-control  ${nameErr ? 'invalid' : 'valid'}`} 
                        placeholder="Enter Name" 
                        onChange={nameHandler} 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label><br />
                    <input name="email" type="email" value={email} className={`form-control  ${emailErr ? 'invalid' : 'valid'}`} placeholder="Enter Email" onChange={emailHandler} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label><br />
                    <input name="password" type="password" value={password} className={`form-control  ${passwordErr ? 'invalid' : 'valid'}`} placeholder="Enter Password" onChange={passwordHandler} />
                </div>
                <div className='signUpButton'>
                    <button type="submit" className='signUp'>Sign Up</button><br />
                </div>
                <div className='textAlignCenter'>
                    {
                        signUpErr ? <span>Invalid Email or Password</span> : <span></span>
                    }
                </div>

            </form>
        </div>
    )
}
export default SignUp