import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';

function Home() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img className="d-block w-100" src="/Images/NEO_BANK_1.jpg" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="/Images/NEO_BANK_2.jpg" alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="/Images/NEO_BANK_3.jpg" alt="Third slide" />
                </Carousel.Item>
            </Carousel>
            
            <section className="mb-4">
                <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                    <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>Contact us</h3></div>
                    <div className="card-body">
                        <form action="/" encType="multipart/form-data" autoComplete="off" className='details'>
                            <div className="group form-group">
                                <label className="mb-0">Your name<span className="text-danger">*</span></label>
                                <input name="name" type="text" className="form-control" placeholder="Name" />
                            </div>
                            <div className="group form-group">
                                <label className="mb-0">Your email<span className="text-danger">*</span></label>
                                <input name="email" type="email" className="form-control" placeholder="Email"  />
                            </div>
                            <div className="group form-group">
                                <label className="mb-0">Your contact number (Optional)</label>
                                <input name="contact" type="text" className="form-control" placeholder="Contact" />
                            </div>
                            <div className="group form-group">
                                <label className="mb-0">Message<span className="text-danger">*</span></label>
                                <textarea name="message" type="text" className="form-control" placeholder="Message" />
                            </div>
                            <p className="text-center mb-0"><input type="submit" className="btn btn-primary btn-md w-100 text-uppercase" value="Submit Now" /></p>
                        </form>

                        <div className='details'>
                            <div className='person group'>
                                <PersonPinIcon />
                                <span>{' '}15, Nilgung Road, Subhas Uddyan</span>
                            </div>

                            <div className='person group'>
                                <LocalPhoneIcon />
                                <span>{' '}+91 90645 26453</span>
                            </div>

                            <div className='person group'>
                                <MailIcon />
                                <span>{' '}sayandey15102001@gmail.com</span>
                            </div>
                        </div>
                    
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Home
