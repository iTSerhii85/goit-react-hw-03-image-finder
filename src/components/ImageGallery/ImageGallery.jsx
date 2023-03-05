import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Loader } from "components/Loader/Loader";
import { LoadMoreButton } from "components/LoadMoreButton/LoadMoreButton";
import { Component } from "react";
import { fetchPictures } from "./fetchPictures";

import { ImageGalleryList } from "./ImageGallery.style";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { NextLoader } from 'components/Loader/NextLoader';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    pictures: null,
    error: null,
    page: null,
    totalHits: null,
    showModal: null,
    status: 'idle'
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: 'pending', page: 1, pictures: null });

        fetchPictures(this.props.searchValue, 1)
        .then(obj =>{
          if (obj.data.hits.length !== 0) {
            this.setState({ pictures: obj.data.hits, status: 'resolved', totalHits: obj.data.totalHits });
          } else {
            toast.info('There are no images for this request, please try another one!!!');
            this.setState({status: 'idle'});
            return;
          }
        })
        .catch(error => this.setState({error, status: 'rejected'}))
    }
  };

  LoadMore=()=>{
    this.setState({ status: 'pending' });
 
      fetchPictures(this.props.searchValue, this.state.page +1)
      .then(obj =>{
        if (obj.data.hits.length !== 0) {
          this.setState(prevState => {return {pictures: [...prevState.pictures, ...obj.data.hits]}});
        }})
      .then(this.setState({ status: 'resolved' }))
      .then(this.setState({page: this.state.page + 1}))
      .catch(error => this.setState({error, status: 'rejected'}));
  }

  handleShowModal=(largeImageURL)=>{
    this.setState({showModal: largeImageURL})
  }

  handleCloseModal=()=>{
    this.setState({showModal: null})
  }

  render() {
    const {status, pictures, error, showModal} = this.state;
    if (status === 'idle') {
      return (
          <h1>Enter the name of the picture</h1>
      );
    }

    if (status === 'pending') {
      return (
        <>
          {this.state.pictures && 
            <>
              <ImageGalleryList>
                <ImageGalleryItem
                  pictures={pictures}
                  showModal={this.handleShowModal}
                />
              </ImageGalleryList>
              <NextLoader/>
            </>
          }
          {!this.state.pictures && <Loader/>}
        </>
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
            <ImageGalleryItem
              pictures={pictures}
              showModal={this.handleShowModal}
            />
          </ImageGalleryList>

          {this.state.pictures.length < this.state.totalHits && <LoadMoreButton onLoadMore={this.LoadMore} />}

          {showModal && <Modal
            imgUrl={showModal}
            CloseModal={this.handleCloseModal}
          />}
        </>
      );
    }
  }
};
