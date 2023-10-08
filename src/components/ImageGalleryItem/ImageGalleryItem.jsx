import { StyledGalleryItem } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({webformatURL, largeImageURL, tags}) => (
    <StyledGalleryItem>
        <img className="gallery-img" src={webformatURL} alt={tags} data-largeimg={largeImageURL} />
    </StyledGalleryItem>
)
