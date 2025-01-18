import React from "react";

const Banner = () => {
  return (
    <div className="hero min-h-80vh bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        
        

        {/* Text Content */}
        <div className="flex-1 px-6">
          <h1 className="text-5xl font-bold text-[#71a45e]">Unlock Your Potential!</h1>
          <p className="py-6">
            Join us on an incredible journey of learning and growth. Explore our
            wide range of educational resources, courses, and tools tailored to help
            you succeed in your academic and professional life.
          </p>
          <button className="btn text-white bg-[#71a45e]">Get Started</button>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://i.ibb.co.com/Cwn0wL7/Education-pana-1.png"
            alt="Education Illustration"
            className="max-w-full rounded-lg "
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;
