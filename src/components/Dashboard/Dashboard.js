import React, { Component } from 'react'
import Header from './Header';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, CardFooter, Popover
  } from 'reactstrap';
import CreateSchedule from './CreateSchedule';
import Cari from './Cari';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state={
            yoga_themes: [
                {
                    themeName: 'Mental Health',
                    description: 'Check out these sets of aasans',
                    open: false,
                    id: 0 
                },
                {
                    themeName: 'Surya Namaskar',                   
                    description: 'Check out these sets of aasans',
                    open: false,
                    id: 1 
                },
                {
                    themeName: 'Yoga for Physical fitness',                   
                    description: 'Check out these sets of aasans',
                    open: false ,
                    id: 2
                },
                {
                    themeName: 'Yoga for Digestive System',                   
                    description: 'Check out these sets of aasans',
                    open: false ,
                    id: 3
                },
            ]
        }
        this.setPopover = this.setPopover.bind(this);
    }

    setPopover = (id) => {
        const yoga_themes = this.state.yoga_themes;
        yoga_themes[id].open = !yoga_themes[id].open
        this.setState({
            yoga_themes: yoga_themes
        })                       
    }

    render() {
        const yoga_themes = this.state.yoga_themes;
        const cards = yoga_themes.map( theme => (
            <Col>
                <div>
                    <Card>
                        <CardImg style={{ width: '300px', height: '250px' }} src={`images/yoga_themes/${theme.themeName}.jpg`} alt={theme.themeName} />
                        <CardBody>
                            <CardTitle>
                            <Button id={`popover_${theme.id}`} outline color='info' >{theme.themeName}</Button>
                                
                            </CardTitle>
                            <Popover placement='bottom' isOpen={theme.open} target={`popover_${theme.id}`}
                            toggle={ () =>this.setPopover(theme.id) }>
                                {theme.description}
                            </Popover>
                        </CardBody>
                        <CardFooter>
                            <Button style={{float:'left'}} color='primary' size='sm' onClick={()=>window.location="/session"}>Start Session</Button>
                            <Button style={{float:'right'}} color='info' size='sm'> Add in Schedule</Button>
                        </CardFooter>
                    </Card>
                </div>
            </Col>
        ))
        return (
            <div>
                <Header/>
                <div className='container-fluid' style={{marginBlockStart:'5%', paddingLeft:'5%', paddingRight:'5%'}} >
                <Row>
                {cards}
                </Row>
                <Cari/>
                </div>
            </div>
        )
    }
}

export default Dashboard
