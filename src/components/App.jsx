import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";

import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Modal } from "./Modal/Modal";
import { SearchBar } from "./Searchbar/Searchbar";
import { Layout } from "./Layout";

export class App extends Component {
  state = {
    searchValue: '',
    // showModal: false
  };

  handleFormSubmit=(searchText)=>{
    this.setState({ searchValue: searchText })
  };

  // handleShowModal=()=>{
  //   this.setState({showModal: true})
  // }

  render() {
    // const {searchValue, showModal} = this.state;
    const {searchValue} = this.state;

    return (
      <Layout>
        <GlobalStyle/>
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <SearchBar onSearch={this.handleFormSubmit}/>
        <ImageGallery
          searchValue={searchValue}
          // showModal={this.handleShowModal}
        />
        {/* {showModal && <Modal></Modal>} */}
      </Layout>
    );
  }
};

