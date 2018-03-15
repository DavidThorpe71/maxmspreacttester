import React from "react";

const Login = (props) => (
    <nav className="login">
        <h2>Page login</h2>
        <p>Sign in here:</p>
        <button className="gitHub" onClick={() => props.authenticate('Github')}>Login in with GitHub</button>
        <button className="google" onClick={() => props.authenticate('Google')}>Login with Google</button>      
    </nav>
);

export default Login;