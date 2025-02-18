
import AboutUs from '../AboutUs/AboutUs';
import Banner from '../Banner/Banner';
import Count from '../Count/Count';
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
            <OurStudentSay/>
            </div>
        </div>
    );
};

export default Home;