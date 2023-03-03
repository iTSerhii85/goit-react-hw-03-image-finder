import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";

import { LoadMoreButton } from "./LoadMoreButton/LoadMoreButton";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { SearchBar } from "./Searchbar/Searchbar";
import { Layout } from "./Layout";
import { ImageGalleryItem } from "./ImageGallery/ImageGalleryItem";

export class App extends Component {
  state = {
    searchValue: "",
    loading: false,
  };

  handleFormSubmit=(searchText)=>{
    this.setState({ searchValue: searchText })
  }

  render() {
    return (
      <Layout>
        <GlobalStyle/>
        <SearchBar onSearch={this.handleFormSubmit}/>
        <ImageGallery>
          <ImageGalleryItem searchValue={this.state.searchValue} />
        </ImageGallery>
        {this.state.loading && <Loader/>}
        <LoadMoreButton/>
        <Modal></Modal>
      </Layout>
    );
  }
};

