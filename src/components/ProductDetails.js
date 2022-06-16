import React, { useContext } from "react";
import styled from "styled-components";
import context from "../context/Context";
import Rating from "./Rating";
import { mobile } from "../Responsive";

function ProductDetails({ item }) {
  const {
    state: { cart },
    dispatch,
  } = useContext(context);

  return (
    <ProductContainer>
      <ProductWrapper>
        <Image src={item.img} alt={item.name} />
        <ProductBody>
          <ProductName>{item.name}</ProductName>
          <ProductSubtitle style={{ paddingBottom: "10px" }}>
            <ProductPrice>£ {item.price}</ProductPrice>
            {item.fastDelivery ? <p>Fast Delivery</p> : <p>4 days delivery</p>}
            <Rating rating={item.rating} />
          </ProductSubtitle>
          {cart.some((p) => p.id === item.id) ? (
            <Button
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item })
              }
              danger
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
              disabled={!item.inStock}
            >
              {!item.inStock ? "Out of Stock" : "Add to cart"}
            </Button>
          )}
        </ProductBody>
      </ProductWrapper>
    </ProductContainer>
  );
}

export default ProductDetails;

const ProductContainer = styled.div``;
const ProductWrapper = styled.div``;
const Image = styled.img`
  height: 300px;
  width: 300px;
  object-fit: cover;
`;
const ProductBody = styled.div`
  margin: 1em 0;
`;

const ProductName = styled.p`
  ${mobile({ fontSize: "1.5rem" })}
`;
const ProductSubtitle = styled.div`
  ${mobile({ fontSize: "1.5rem" })}
`;
const ProductPrice = styled.span`
  ${mobile({ fontSize: "1.5rem" })}
`;
const Button = styled.button`
  color: white;
  cursor: pointer;
  border: 0;
  padding: 4px;
  border-radius: 3px;
  background-color: ${(props) => (props.danger ? "#BD2A2E" : "#0099DD")};
  ${mobile({ fontSize: "1.2rem" })}
`;
