import React from "react";
import { useSpring ,animated} from "react-spring";

function About()
{
    const props = useSpring({
        from: {opacity:0},
        to :{opacity:1},
        config:{delay:15000,duration:5000}

    })

    const textprop = useSpring({
        from:{x:-500},
        to:{x:0},
        config:{duration:1500}
    })

    const picprop = useSpring({
        from:{x:500},
        to:{x:0},
        config:{duration:1500}
    })

    return (
       <animated.div style={props}>

           <div style={{backgroundColor:"lightgreen"}}>
                <h1><u>About</u></h1>
                <div className="container">
                    <div className="row">
                        <animated.div style={textprop} className="col-md-5">
                            <br /> <br /><br /><br />
                            <p>Techi Yogi is a platform where you can perform yoga aasan without the presence of an instructor</p>   
                        </animated.div>
                        <div className="col-md-3"></div>
                        <animated.div style={picprop} className="col-md-4">
                            <img src="images/yoga_themes/yog1.jpeg" style={{height:"300px",width:"400px",padding:"20px"}} />
                        </animated.div>
                    </div>
                </div>
                </div>

       </animated.div>
        
    )
}

export default About;