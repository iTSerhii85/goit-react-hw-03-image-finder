import React from "react";
import { ImageGalleryList } from "./ImageGallery.style";
// import { ImageGalleryItem } from "./ImageGalleryItem";

export const ImageGallery = ({ children }) => {
    return (
      <ImageGalleryList>
        {children}
      </ImageGalleryList>
    )
};
