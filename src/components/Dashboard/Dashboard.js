import React, { Component } from 'react'
import Header from './Header';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
  } from 'reactstrap';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state={
            yoga_themes: [
                {
                    themeName: 'Mental Health',
                    description: 'Check out these sets of aasans'
                },
                {
                    themeName: 'Mental Health',                   
                    description: 'Check out these sets of aasans'
                },
                {
                    themeName: 'Mental Health',                   
                    description: 'Check out these sets of aasans'
                },
                {
                    themeName: 'Mental Health',                   
                    description: 'Check out these sets of aasans'
                },
            ]
        }
    }

    render() {
        const yoga_themes = this.state.yoga_themes;
        const cards = yoga_themes.map( theme => {
            return(
                <Col>
                    <div>
                    <Card style={{}} >
                <CardImg style={{width: '300px', height: '250px'}} src={`images/yoga_themes/${theme.themeName}.jpg`} alt={theme.themeName}/>
                <CardBody>
                    <CardTitle >{theme.themeName}</CardTitle>
                    <CardText >{theme.description}</CardText>
                </CardBody>
                </Card>
                    </div>
                </Col>
            )
        })
        return (
            <div>
                <Header/>
                <div className='container-fluid' style={{marginBlockStart:'5%', paddingLeft:'5%', paddingRight:'5%'}} >
                <Row>
                {cards}
                </Row>
                </div>
            </div>
        )
    }
}

export default Dashboard
