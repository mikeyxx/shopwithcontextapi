import React, { useContext } from "react";
import context from "../context/Context";
import styled from "styled-components";
import ProductDetails from "./ProductDetails";
import Filters from "./Filters";
import { mobile } from "../Responsive";

function Home() {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = useContext(context);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((item) => item.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((item) => item.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((item) => item.rating >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <Container>
      <Filters />
      <ProductContainer>
        {transformProducts().map((item) => (
          <ProductDetails key={item.id} item={item} />
        ))}
      </ProductContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
`;
const ProductContainer = styled.div`
  display: flex;
  width: 78%;
  margin: 8em 0 3em 20em;
  ${mobile({ marginLeft: 0, width: "100%" })}
  flex-wrap: wrap;
  justify-content: space-around;
`;
