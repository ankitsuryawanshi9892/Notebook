import React, {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import '../css/style.css'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email:"",password:"",cpassword:""})

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
  
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the authtoken and  redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Logged In Successfully", "success");     

    }
    else {
      props.showAlert("Invalid details", "danger"); // Modified this line
    }
  }
  
  const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name='name' className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" onChange={onChange} id="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' onChange={onChange} id="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary button">Submit</button>
      </form>
      <h5 className='my-3'>Already have an account?</h5><Link to="/login">Login</Link>
    </div>
  )
}

export default Signup
