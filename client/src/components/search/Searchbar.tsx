import { IconSearch } from "@tabler/icons-react";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import {
  OuterWrapper,
  SearchbarWrapper,
  SearchInput,
  SearchLabel,
} from "./Searchbar.styles";
import { theme } from "../../styles";

const Searchbar = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);
  };
  return (
    <>
      <OuterWrapper>
        <SearchLabel htmlFor="query">Search</SearchLabel>
        <form onSubmit={handleSubmit}>
          <SearchbarWrapper>
            <SearchInput
              name="query"
              id="query"
              placeholder="Search tasks..."
            />
            <div>
              <Button type="submit">
                <ButtonContent>
                  <IconSearch size={theme.iconSizes.button} />
                  {/* <span>Search</span> */}
                </ButtonContent>
              </Button>
            </div>
          </SearchbarWrapper>
        </form>
      </OuterWrapper>
    </>
  );
};

export default Searchbar;
