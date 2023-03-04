import { Component } from "react";
import axios from 'axios';
import { ImageGalleryList } from "./ImageGallery.style";
import { ImageGalleryItem } from "./ImageGalleryItem";

async function fetchPictures (text) {
  return await axios.get('https://pixabay.com/api/', {
    params: {
        key: '32843857-becb0ae38391759a35788f5eb',
        q: `${text}`,
        page: `1`,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
    },
 })
}

export class ImageGallery extends Component {
  state = {
    pictures: null,
  };



  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      fetchPictures(this.props.searchValue)
      .then(obj => this.setState({ pictures: obj.data.hits }));
    }
  }

  render() {
    return (
      <ImageGalleryList>
        {this.state.pictures && <ImageGalleryItem pictures={this.state.pictures} />}
      </ImageGalleryList>
    )
  }

};
