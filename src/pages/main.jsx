import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Main = () => {
    const navigate = useNavigate()
    return (
        <>
            <Container fluid className="main-page-container d-flex row align-items-center">
                <Row className="text-center">
                    <Col md={12}><h1>Main Page</h1></Col>
                    <Col md={12}>
                        <Button onClick={() => { navigate('/login') }}>Login</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Main;
