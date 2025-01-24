import { IconSearch } from "@tabler/icons-react";
import { Button } from "../button/Button";
import { ButtonContent } from "../button/Button.styles";
import {
  OuterWrapper,
  SearchbarWrapper,
  SearchError,
  SearchInput,
  SearchLabel,
} from "./Searchbar.styles";
import { theme } from "../../styles";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QueryOptions } from "../../types";

interface SearchbarProps {
  queryOptions: QueryOptions;
}

const Searchbar = ({ queryOptions }: SearchbarProps) => {
  const { order, sort, searchQuery } = queryOptions;

  const [query, setQuery] = useState(searchQuery);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [error, setError] = useState("");

  const [_, setSearchParams] = useSearchParams();

  const updateSearchParams = (newQuery: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", "1");
      newParams.set("sort", sort);
      newParams.set("order", order);
      newParams.set("q", newQuery);

      return newParams;
    });
  };

  useEffect(() => {
    console.log("searchparams: ", searchQuery);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeout = setTimeout(() => {
      // update searchparams
      if (query !== searchQuery) {
        updateSearchParams(query);
      }
    }, 500);

    setTimeoutId(newTimeout);

    return () => clearTimeout(newTimeout);
  }, [query]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearchParams(query);
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
              onChange={handleChange}
              value={query}
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
        {error && <SearchError>{error}</SearchError>}
      </OuterWrapper>
    </>
  );
};

export default Searchbar;
