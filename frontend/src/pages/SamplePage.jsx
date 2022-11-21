import React from 'react'
import { Helmet } from 'react-helmet'
import TopNavbar from '../components/Nav/TopNavbar'
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Blog from "../components/Sections/Blog";
import Pricing from "../components/Sections/Pricing";
import Contact from "../components/Sections/Contact";

function SamplePage() {
    /*
    const [api, setApi] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        //fetchApi()
        (
            async () => {
                const user = await fetch('http://localhost:8000/api/authUser', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const loggedUser = await user.json()
                setName(loggedUser.username)
            }
        )();
    })
    

    /*const fetchApi = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/users')
        const data = await response.data
        setApi(data)
    }

    console.log('api: ', typeof (api));
    */

    return (
        <div>
        
        <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
            </Helmet>
            <TopNavbar />
            <Header/>
            <Services/>
            <Projects/>
         
            <Contact/>
            
        </div>
    )
}

export default SamplePage