
import Banner from '../Banner/Banner';
import SessionCardContainer from '../SessionCardContainer/SessionCardContainer';
import Tutors from '../Tutor/Tutors';

const Home = () => {
    return (
        <div>
            <Banner/>
            <div className='container mx-auto'>
            <SessionCardContainer/>
            <Tutors/>
            </div>
        </div>
    );
};

export default Home;