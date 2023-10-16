import React, { useState, memo } from "react";

const AppGuide = () => {
  const [zoomedImages, setZoomedImages] = useState([]);

  const handleImageClick = (index) => {
    const updatedZoomedImages = [...zoomedImages];
    updatedZoomedImages[index] = !updatedZoomedImages[index];
    setZoomedImages(updatedZoomedImages);
  };

  const images = [
    "apks/1.png",
    "apks/2.png",
    "apks/3.png"
  ];

  const imagLabel = [
    "گام اول",
    "گام دوم",
    "گام سوم"
  ];

  return (
    <div className="container marginTop">
      <div className="row mb-2 text-right">
        <h4 style={{padding:"1rem"}}>طریقه استفاده از نسخه IOS </h4>
      </div>
      <div className="guid-container">
        {images.map((imageUrl, index) => (
          <div key={index} className={`image-container ${zoomedImages[index] ? 'zoomed' : ''}`}
            onClick={() => handleImageClick(index)}>
            <img src={imageUrl} alt="Image" className="guid-image" />
            <figcaption className="caption">{imagLabel[index]}</figcaption>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(AppGuide);
