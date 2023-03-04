import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { SearchBar } from "./Searchbar/Searchbar";
import { Layout } from "./Layout";

export class App extends Component {
  state = {
    searchValue: ''
  };

  handleFormSubmit=(searchText)=>{
    this.setState({ searchValue: searchText })
  };

  render() {
    const {searchValue} = this.state;

    return (
      <Layout>
        <GlobalStyle/>
        <SearchBar onSearch={this.handleFormSubmit}/>
        <ImageGallery searchValue={searchValue}/>
        <Modal></Modal>
      </Layout>
    );
  }
};

