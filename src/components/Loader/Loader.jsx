import { MagnifyingGlass } from 'react-loader-spinner';
import { SearchGlass } from './Loader.styled';

export const Loader = () => {
  return (
    <SearchGlass>
      <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#212121"
      />
    </SearchGlass>
  );
};
