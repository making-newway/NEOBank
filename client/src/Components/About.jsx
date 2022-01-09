import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function About() {
    return (
        <div>
            <div className="about container" >
                <div className="content-section" >
                    <div className="title" style={{ textAlign: 'center', fontSize: '27px' }}>
                        <h3>About Us</h3>
                    </div>
                    <div className="content">
                        <h4>Holding and managing currency and precious metal reserves not transferred to the NEO Bank.
                            <br/>Promoting the proper working and stability of the financial system and, without prejudice to the functions of the NEO Bank, of national payment systems. Against this backdrop, reference should be made to emergency liquidity assistance (ELA) operations
                            <br/>Supervising solvency and compliance with the specific rules of credit institutions, other entities and financial markets, for which it has been assigned supervisory responsibility.
                            <br/>Placing coins in circulation and performing, on behalf of the State, all such other functions entrusted to it in this connection.
                            <br/>Providing treasury services and acting as financial agent for government debt.
                            <br/>Advising the Government, and preparing the appropriate reports and studies.
                        </h4>
                    </div>
                    <div className="social">
                        <a href="/"><FacebookIcon /></a>
                        <a href="/"><TwitterIcon /></a>
                        <a href="/"><InstagramIcon /></a>
                    </div>
                </div>
                <div className="image-section">
                    <img src="Images/About.png" alt="" />
                </div>    
            </div>
        </div>
    )
}

export default About
