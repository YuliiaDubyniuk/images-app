import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchPictures } from '../api/api';
import { StyledApp } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    imgPerPage: 12,
    inputValue: '',
    modalImg: '',
    
    isLoading: false,
    showMoreBtn: false,
    showModal: false,

    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { inputValue, page, imgPerPage, images} = this.state;

    if (inputValue !== prevState.inputValue || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });
        const { data } = await fetchPictures(inputValue, page);
        if (data.hits.length) {
          this.setState({
            images: [...images, ...data.hits],
          })
        } else {
          Notify.info('Sorry, there are no images on your request. Try again.');
        }

        if (data.total > imgPerPage * page) {
          this.setState({ showMoreBtn: true });
        } else {
          this.setState({ showMoreBtn: false });
        }
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = evt => {
    evt.preventDefault();
    const searchWord = evt.currentTarget.searchInput.value;
    if (searchWord.trim() === '') {
      Notify.warning('Please, enter your search word!');
    }
    this.setState({
      page: 1,
      images: [],
      isLoading: false,
      inputValue: searchWord,
    });
    evt.currentTarget.reset();
  };

  onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImgClick = (evt) => {
    this.setState({
      showModal: true,
      modalImg: evt.target.dataset.largeimg,
    })
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };


  render() {
    const { isLoading, error, images, showModal, modalImg} = this.state;
    return (
      <StyledApp>
        <Searchbar handleSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        {error && 
          <p className="error">
            Oops! Something does wrong. Reload your page or try again later.
          </p>
        }
        <ImageGallery images={images} onImgClick={this.onImgClick}/>
        {this.state.showMoreBtn && <Button onLoadMore={this.onloadMore} />}
        {showModal && <Modal largeImg={modalImg} onClose={this.onCloseModal} />}
      </StyledApp>
    );
  }
}
