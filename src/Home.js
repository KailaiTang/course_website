import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import cart from './cart.jpg'
import search from './search.jpg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Container'


class Home extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col><Card style={{ width: '20rem', height: '30rem' }}>
                        <Card.Img variant="top" src={search} />
                        <Card.Body>
                            <Card.Title>Search</Card.Title>
                            <Card.Text>
                                Search your favorite courses!
                                </Card.Text>
                            <Button variant="primary" onClick={() => this.props.updateActiveKey("search")}>Go to Search</Button>
                        </Card.Body>
                    </Card></Col>
                    <Col><Card style={{ width: '20rem', height: '30rem' }}>
                        <Card.Img variant="top" src={cart} />
                        <Card.Body>
                            <Card.Title>Cart</Card.Title>
                            <Card.Text>
                                Check courses in your cart!
                                </Card.Text>
                            <Button variant="primary" onClick={() => this.props.updateActiveKey("cart")}>Go to Cart</Button>
                        </Card.Body>
                    </Card></Col>
                </Row>
            </Container>

        )
    }

}


export default Home;