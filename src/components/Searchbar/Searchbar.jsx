import { Component } from "react";
import { ImSearch } from "react-icons/im";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Label, Searchbar, SearchForm, SearchFormButton, SearchFormInput } from "./SearchBar.style";

export class SearchBar extends Component {
  state = {
    inputValue:'',
  }

  handleChange = (evt) => {
    this.setState({ inputValue: evt.target.value.toLowerCase() });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.state.inputValue.trim() === "") {
      toast.info('enter something!!!')
      return;
    };
    this.props.onSearch(this.state.inputValue);
    this.setState ({ inputValue: '' });
  }

  render() {
    return (
      <Searchbar>
          <SearchForm onSubmit={this.handleSubmit}>
              <SearchFormButton type="submit">
                <Label>
                  <ImSearch/>
                </Label>
              </SearchFormButton>
  
              <SearchFormInput
              type="text"
              autocomplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.inputValue}
              onChange = {this.handleChange}
              />
          </SearchForm>
      </Searchbar>
      )
  }
};