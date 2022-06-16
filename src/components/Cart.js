import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import context from "../context/Context";
import Rating from "./Rating";
import * as AiIcons from "react-icons/ai";
import { mobile } from "../Responsive";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(context);
  // console.log(cart);
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + Number(current.price) * current.qty,
        0
      )
    );
  }, [cart]);

  return (
    <Container>
      <Wrapper>
        {cart.map((item) => (
          <CartItem key={item.id}>
            <Image src={item.img} alt={item.name} />
            <CartItemName>{item.name}</CartItemName>
            <CartItemPrice>£ {item.price}</CartItemPrice>
            <CartItemRating>
              <Rating rating={item.rating} />
            </CartItemRating>

            <Select
              value={item.qty}
              onChange={(e) =>
                dispatch({
                  type: "CHANGE_CART_QTY",
                  payload: { id: item.id, qty: e.target.value },
                })
              }
            >
              {[...Array(item.inStock).keys()].map((x) => (
                <Option key={x + 1}>{x + 1}</Option>
              ))}
            </Select>
            <RemoveItemButton
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item })
              }
            >
              <AiIcons.AiFillDelete />
            </RemoveItemButton>
          </CartItem>
        ))}
        <CartItemSummary>
          <CartItemSummaryHeader>
            Subtotal ({cart.length}) {cart.length > 1 ? "items" : "item"}
          </CartItemSummaryHeader>
          <CartItemPriceTotal>Total: £ {total}</CartItemPriceTotal>
          <Button disabled={cart.length === 0}>Proceed to CheckOut</Button>
        </CartItemSummary>
      </Wrapper>
    </Container>
  );
};

export default Cart;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100vh;
  width: 100%;
`;

const Wrapper = styled.div`
  padding-top: calc(10em - 80px);
  display: flex;
  flex-direction: column;
  margin: 0em 27em 0.3em 1em;
  ${mobile({
    marginRight: 0,
    marginLeft: 0,

    PlaceContent: "center",
    paddingLeft: "1em",
    paddingRight: "1em",
  })}
`;

const CartItem = styled.div`
  width: 100%;
  padding: 1em;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", marginTop: "1em" })}
  background-color: white;

  &:first-of-type {
    margin-top: 1em;
  }
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  ${mobile({ margin: "auto", height: "120px", width: "120px" })}
  object-fit: cover;
  border-radius: 4px;
`;
const CartItemName = styled.p`
  ${mobile({ margin: "7px auto", fontSize: "1.5rem" })}
`;

const CartItemSummary = styled.div`
  background-color: #343a40;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100vh;
  position: fixed;
  top: 4em;
  bottom: 0;
  right: 0;
  border-radius: 6px;
  ${mobile({
    position: "relative",
    top: "0",
    width: "100%",
    height: "15em",
    marginTop: "1em",
    marginBottom: "1em",
  })}
  z-index: -1;
`;

const CartItemSummaryHeader = styled.h2``;

const CartItemPriceTotal = styled.span`
  margin-top: 18px;
  ${mobile({ fontSize: "1.5rem" })}
`;

const Button = styled.button`
  margin-top: 3.5em;
  padding: 10px;
  font-size: 1rem;
  border: 0;
  border-radius: 3px;
  background-color: #0099dd;
  color: white;
  ${mobile({ fontSize: "1.2rem" })}
`;

const CartItemPrice = styled.span`
  ${mobile({ margin: "7px auto", fontSize: "1.5rem" })}
`;

const CartItemRating = styled.div`
  ${mobile({ margin: "7px auto", fontSize: "1.5rem" })}
`;

const Select = styled.select`
  width: 5em;
  height: 2em;
  ${mobile({ margin: "7px auto", fontSize: "1.5rem" })}
`;
const Option = styled.option``;

const RemoveItemButton = styled.button`
  background-color: transparent;
  border: 0;
  display: flex;
  font-size: 1.2rem;
  ${mobile({ margin: "7px auto", fontSize: "1.5rem" })}
  cursor: pointer;
`;
