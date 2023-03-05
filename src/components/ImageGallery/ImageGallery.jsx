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
    showModal: null,
    status: 'idle'
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: 'pending', page: 1, pictures: null});

      setTimeout(() => {
        fetchPictures(this.props.searchValue, this.state.page)
        .then(obj =>{
          if (obj.data.hits.length !== 0) {
            this.setState({ pictures: obj.data.hits, status: 'resolved' });
          } else {
            toast.info('There are no images for this request, please try another one!!!');
            this.setState({status: 'idle'});
            return;
          }
        })
        .catch(error => this.setState({error, status: 'rejected'}))
      }, 500)
    }
  };

  LoadMore=()=>{
    this.setState({ status: 'pending' });
    setTimeout(() => {
      fetchPictures(this.props.searchValue, this.state.page +1)
      .then(obj =>{
        if (obj.data.hits.length !== 0) {
          this.setState(prevState => {return {pictures: [...prevState.pictures, ...obj.data.hits]}});
        } else {
          toast.info('There are no more images for this request, please try another one!!!');
          return;
        }})
      .then(this.setState({ status: 'resolved' }))
      .then(this.setState({page: this.state.page + 1}))
      .catch(error => this.setState({error, status: 'rejected'}));
    }, 500)
  }

  handleShowModal=(largeImageURL)=>{
    this.setState({showModal: largeImageURL})
  }

  handleCloseModal=()=>{
    this.setState({showModal: false})
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
            </>}
          <Loader/>
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
          <LoadMoreButton onLoadMore={this.LoadMore} />
          {showModal && <Modal
            imgUrl={showModal}
            CloseModal={this.handleCloseModal}
          />}
        </>
      );
    }
  }
};
