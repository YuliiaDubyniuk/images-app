import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchPictures } from '../api/api';
import { StyledApp } from './App.styled';

export const App = () => {

const [gallery, setGallery] = useState([]);
const [page, setPage] = useState(1);
const [inputValue, setInputValue] = useState('');
const [modalImg, setModalImg] = useState('');

const [isLoading, setIsLoading] = useState(false);
const [showMoreBtn, setShowMoreBtn] = useState(false);
const [showModal, setShowModal] = useState(false);

const [error, setError] = useState(null);
const imgPerPage = 12;
  
  useEffect(() => {
    if (inputValue === '') return;
    async function getImages() {
      try {
        setIsLoading(true);
        const { data } = await fetchPictures(inputValue, page);
        if (data.hits.length) {
          setGallery(prevGallery => [...prevGallery, ...data.hits])
        } else {
          Notify.info('Sorry, there are no images on your request. Try again.');
        };
        if (data.total > imgPerPage * page) {
          setShowMoreBtn(true);
        } else {
          setShowMoreBtn(false);
        };
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
      getImages();
  }, [inputValue, page]);

  const onSubmit = evt => {
    evt.preventDefault();
    const searchWord = evt.currentTarget.searchInput.value;
    if (searchWord.trim() === '') {
      Notify.warning('Please, enter your search word!');
    }
    setPage(1);
    setGallery([]);
    setIsLoading(false);
    setInputValue(searchWord);

    evt.currentTarget.reset();
  };

  const onloadMore = () => {
    setPage(prevPage => prevPage + 1);
  }

  const onImgClick = (evt) => {
    setShowModal(true);
    setModalImg(evt.target.dataset.largeimg);
  };

  const onCloseModal = () => {
    setShowModal(false);
};
  
    return (
      <StyledApp>
        <Searchbar handleSubmit={onSubmit} />
        {isLoading && <Loader />}
        {error && 
          <p className="error">
            Oops! Something does wrong. Reload your page or try again later.
          </p>
        }
        <ImageGallery images={gallery} onImgClick={onImgClick}/>
        {showMoreBtn && <Button onLoadMore={onloadMore} />}
        {showModal && <Modal largeImg={modalImg} onClose={onCloseModal} />}
      </StyledApp>
    );
  }
