
import AboutUs from '../AboutUs/AboutUs';
import Banner from '../Banner/Banner';
import ContactUs from '../ContactUs/ContactUs';
import Count from '../Count/Count';
import Gallery from '../Gallery/Gallery';
import OurStudentSay from '../OurStudentSay/OurStudentSay';
import PopularWorks from '../PopularWorks/PopularWorks';
import SessionCardContainer from '../SessionCardContainer/SessionCardContainer';
import Tutors from '../Tutor/Tutors';

const Home = () => {
    return (
        <div>
            <Banner/>
            <div className='container mx-auto'>
                <PopularWorks/>
                <AboutUs/>
                <Count/>
            <SessionCardContainer/>
            <Tutors/>
            <Gallery/>
            <OurStudentSay/>
            <ContactUs/>
            </div>
        </div>
    );
};

export default Home;