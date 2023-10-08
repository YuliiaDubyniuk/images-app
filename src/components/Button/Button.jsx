import { StyledBtn } from "./Button.styled";

export const Button = ({onLoadMore}) => (
    <StyledBtn type="button" onClick={onLoadMore}>Load more</StyledBtn>
)