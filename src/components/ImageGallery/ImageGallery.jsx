import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onImgClick }) => (
  <StyledGallery onClick={onImgClick}>
    {images.map(({ id, webformatURL, largeImageURL, tags}) => (
      <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
      />
    ))}
  </StyledGallery>
);
