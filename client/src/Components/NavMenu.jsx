import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';

function NavMenu() {
    return (
        <div>
            <Navbar collapseOnSelect bg="light" expand="lg" sticky="top">
                <Container >
                    <Navbar.Brand href="/">
                        <img src="https://image.freepik.com/free-vector/finance-services-financial-transaction-e-commerce-e-payment_335657-3134.jpg" alt="" height="50" className="d-inline-block align-text-top" />
                        <span className='head'>NEO Bank</span>
                    </Navbar.Brand>
                    <Navbar.Toggle className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/customers">Customers</Nav.Link>
                            <Nav.Link href="/adduser">Add User</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavMenu;