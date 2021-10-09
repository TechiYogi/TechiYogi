import React from 'react'
import GoogleLogin from 'react-google-login'

const LandingPage = (props) => {
    const responseGoogle = (response)=>{
        console.log(response.profileObj);
    }
    return (
        <div>
                Techiyogi landing page
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> 
            </div>
    )
}

export default LandingPage
