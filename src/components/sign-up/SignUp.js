import { useState } from 'react'
import './SignUp.css';

function SignUp() {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    function handleData(event) {
        event.preventDefault()
        let user = { name, email, password }
        user.userType = 1000
        console.log(user)
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

        // const response = await fetch('https://api.npms.io/v2/search?q=react');
        // const data = await response.json();
        // this.setState({ totalReactPackages: data.total })
    }

    return (
        <div className='formContainer'>
            <form onSubmit={handleData}>
                <div>
                    <h2>Sign Up Form</h2>
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Name</label><br />
                    <input name="name" type="text" value={name} className='form-control' placeholder="Enter Name" onChange={(event) => setName(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label><br />
                    <input name="email" type="email" value={email} className='form-control' placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label><br />
                    <input name="password" type="password" value={password} className='form-control' placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className='signUpButton'>
                    <button type="submit" className='signUp'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
export default SignUp