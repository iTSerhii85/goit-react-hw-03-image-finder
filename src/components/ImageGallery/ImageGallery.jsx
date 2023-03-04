
import { Loader } from "components/Loader/Loader";
import { LoadMoreButton } from "components/LoadMoreButton/LoadMoreButton";
import { Component } from "react";
import { fetchPictures } from "./fetchPictures";

import { ImageGalleryList } from "./ImageGallery.style";
import { ImageGalleryItem } from "./ImageGalleryItem";

export class ImageGallery extends Component {
  state = {
    pictures: null,
    error: null,
    page: 3,
    status: 'idle'
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({pictures: null, status: 'pending'});

      setTimeout(() => {
        fetchPictures(this.props.searchValue, this.state.page)
        .then(obj =>{
          if (obj.data.hits.length !== 0) {
            this.setState({ pictures: obj.data.hits, status: 'resolved' });
          } else {
            alert('There are no images for this request, please try another one!!!');
            this.setState({status: 'idle'});
            return;
          }
        })
        .catch(error => this.setState({error, status: 'rejected'}))
      }, 2000)
    }
  };

  render() {
    const {status, pictures, error} = this.state;
    if (status === 'idle') {
      return (
        <h1>Enter the name of the picture</h1>
      );
    }

    if (status === 'pending') {
      return (
        <Loader/>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          <h1>Oops, something went wrong, try again</h1>
          <p>{error}</p>
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            <ImageGalleryItem pictures={pictures} />
          </ImageGalleryList>
          <LoadMoreButton />
        </>
      );
    }
  }
};
