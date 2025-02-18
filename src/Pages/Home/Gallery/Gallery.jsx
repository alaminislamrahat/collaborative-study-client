import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox effect

  const images = [
    "https://i.ibb.co.com/Z1vCzRRM/pensive-young-woman-glasses-red-hat-looking-away.jpg",
    "https://i.ibb.co.com/JFWYkDQF/student-man-with-thumb-up.jpg",
    "https://i.ibb.co.com/kkgvX9L/handsome-man-wearing-fashion-glasses-wool-hat-with-notebook-school-bag.jpg",
    "https://i.ibb.co.com/Y4c2cs2k/portrait-satisfied-african-american-female-student-smiling-pleased-showing-okay-sign-like-something.jpg",
    "https://i.ibb.co.com/bMM8pvrw/smiling-young-woman-with-books-backpack-standing-white-background.jpg",
    "https://i.ibb.co.com/23fJ6Dd4/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink.jpg",
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Animation variants for grid items
  const gridItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  // Animation variants for lightbox
  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Activity Gallery
      </motion.h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => openLightbox(image)}
            variants={gridItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered animation
          >
            <motion.img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              whileHover={{ scale: 1.1 }} // Smooth zoom on hover
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.button
                onClick={closeLightbox}
                className="absolute top-2 right-2 text-white text-2xl font-bold bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                whileHover={{ scale: 1.2 }} // Button hover animation
              >
                ×
              </motion.button>
              <motion.img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-screen rounded-lg"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;