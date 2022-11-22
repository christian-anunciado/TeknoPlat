import React from 'react'
import { Helmet } from 'react-helmet'
import TopNavbar from '../components/Nav/TopNavbar'
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Contact from "../components/Sections/Contact";

function LandingPage() {

    return (
        <div>
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
            </Helmet>
            <TopNavbar />
            <Header />
            <Services />
            <Projects />
            <Contact />
        </div>
    )
}

export default LandingPage
