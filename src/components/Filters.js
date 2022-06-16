import React, { useContext } from "react";
import styled from "styled-components";
import context from "../context/Context";
import Rating from "./Rating";
import { mobile } from "../Responsive";

function Filters() {
  // const [rate, setRate] = useState(3);

  const {
    productState: { byStock, byFastDelivery, sort, byRating },
    productDispatch,
  } = useContext(context);

  return (
    <Container>
      <FilterTitle>Filter Products</FilterTitle>
      <AscendingFilter>
        <InputLabel htmlFor="ascending">
          <Input
            type="radio"
            name="group1"
            id="ascending"
            onChange={() =>
              productDispatch({ type: "SORT_BY_PRICE", payload: "lowToHigh" })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
          Ascending
        </InputLabel>
      </AscendingFilter>
      <DescendingFilter>
        <InputLabel htmlFor="descending">
          <Input
            type="radio"
            name="group1"
            id="descending"
            onChange={() =>
              productDispatch({ type: "SORT_BY_PRICE", payload: "highToLow" })
            }
            checked={sort === "highToLow" ? true : false}
          />
          Descending
        </InputLabel>
      </DescendingFilter>
      <StockFilter>
        <InputLabel htmlFor="inStock">
          <Input
            type="checkbox"
            name="group1"
            id="inStock"
            onChange={() => productDispatch({ type: "FILTER_BY_STOCK" })}
            checked={byStock}
          />
          Include Out of Stock
        </InputLabel>
      </StockFilter>
      <FastDeliveryFilter>
        <InputLabel htmlFor="fastDeliveyStat">
          <Input
            type="checkbox"
            name="group1"
            id="fastDeliveyStat"
            onChange={() => productDispatch({ type: "FILTER_BY_DELIVERY" })}
            checked={byFastDelivery}
          />
          Fast Delivery Only
        </InputLabel>
      </FastDeliveryFilter>
      <RatingFilter>
        <InputLabel>Rating:</InputLabel>
        <Rating
          rating={byRating}
          // onClick={(index) => setRate(index + 1)}
          onClick={(i) =>
            productDispatch({ type: "FILTER_BY_RATING", payload: i + 1 })
          }
          style={{ cursor: "pointer" }}
        />
      </RatingFilter>

      <Button onClick={() => productDispatch({ type: "CLEAR_FILTER" })}>
        Clear Filters
      </Button>
    </Container>
  );
}

export default Filters;

const Container = styled.div`
  background-color: #343a40;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 20%;
  //   margin: 10px;
  height: 100vh;
  position: fixed;
  top: 4em;
  bottom: 0;
  left: 0;
  ${mobile({ display: "none" })}

  span {
    padding-bottom: 20px;
  }
`;

const FilterTitle = styled.span`
  font-size: 30px;
`;

const AscendingFilter = styled.span``;

const InputLabel = styled.label``;

const Input = styled.input`
  margin-right: 1em;
`;

const DescendingFilter = styled.span``;

const StockFilter = styled.span``;

const FastDeliveryFilter = styled.span``;

const Button = styled.button`
  padding: 0.5em;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
`;

const RatingFilter = styled.span`
  label {
    padding-right: 10px;
  }
`;
