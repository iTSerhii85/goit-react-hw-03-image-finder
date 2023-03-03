import { Component } from "react";
import { ImageGalleryListItem, Img } from "./ImageGallery.style";

export class ImageGalleryItem extends Component {
  state = {
    picture: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32843857-becb0ae38391759a35788f5e'
    if (prevProps.searchValue !== this.props.searchValue) {
      fetch(`${BASE_URL}?key=${KEY}&q=${this.props.searchValue}
      &page=1&image_type=photo&orientation=horizontal&per_page=12`)
      .then(resp => resp.json())
      .then(picture => this.setState({ picture }));
    }
  }
  render() {
    return (
      <ImageGalleryListItem>
         <Img src="#" alt="" />
      </ImageGalleryListItem>
    )
  }
};