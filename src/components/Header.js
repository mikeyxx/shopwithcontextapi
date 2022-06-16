import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import context from "../context/Context";
import { mobile } from "../Responsive";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = useContext(context);

  // const [currency, setCurrency] = useState();

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">Shopping Cart</Link>
        </Left>
        <CenterAndRightElements>
          <Center>
            <Input
              type="search"
              placeholder="Search for a product"
              onChange={(e) =>
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                })
              }
            />
          </Center>
          <Right>
            <CartElement onClick={() => setIsOpen(!isOpen)}>
              <FiIcons.FiShoppingCart />
              <CartItemCountContainer>
                <CartItemCount>{cart.length}</CartItemCount>
              </CartItemCountContainer>
              <MdIcons.MdOutlineKeyboardArrowDown
                style={{ marginLeft: "5px" }}
              />
              {isOpen && (
                <CartPageContainer>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item) => (
                        <CartItem key={item.id}>
                          <CartItemImage src={item.img} alt={item.name} />
                          <CartDetail>
                            <CartName>{item.name}</CartName>
                            <CartName>£ {item.price}</CartName>
                          </CartDetail>
                          <AiIcons.AiFillDelete
                            style={{ fontSize: "17px", cursor: "pointer" }}
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: item,
                              })
                            }
                          />
                        </CartItem>
                      ))}
                      <Link to="/cart">
                        <Button>Go To Cart</Button>
                      </Link>
                    </>
                  ) : (
                    <CartItem>Cart is empty!</CartItem>
                  )}
                </CartPageContainer>
              )}
            </CartElement>
          </Right>
        </CenterAndRightElements>
      </Wrapper>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  height: 80px;
  ${mobile({ minHeight: "80px" })}
  background-color: #343a40;
  display: flex;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
`;

const Wrapper = styled.nav`
  width: 100%;
  color: white;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile({ flexDirection: "column", marginTop: "1em" })}

  a {
    color: white;
    text-decoration: none;
  }
`;

const CenterAndRightElements = styled.div`
  display: flex;
  ${mobile({ margin: "7px 0px 2em 0" })}
`;

const Left = styled.div`
  //   flex: 1;

  font-size: 2rem;
  ${mobile({ fontSize: "1.7em" })}
`;

const Center = styled.div`
  //   flex: 1;
`;

const Input = styled.input`
  width: 500px;
  border: none;
  height: 30px;
  border-radius: 4px;
  padding: 0 5px;
  ${mobile({ width: "200px" })}
`;

const Right = styled.div`
  //   flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 5em;
  cursor: pointer;

  margin-left: 2em;
`;

const CartElement = styled.div`
  background-color: #078c66;
  border-radius: 3px;
  padding: 5px;
  width: 4em;
  height: 30px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const CartItemCountContainer = styled.div`
  position: absolute;
  background-color: red;
  top: -9px;
  left: 15px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartItemCount = styled.span``;

const CartPageContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 1px;
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.8);
  box-shadow: 5px 3px 8px 0px;
  border-radius: 4px;
  min-width: 16em;
  min-height: 2em;
  display: flex;
  align-items: center;
  padding: 6px;
  flex-direction: column;
  z-index: 1;

  a {
    width: 100%;
  }
`;

const CartItem = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
  background-color: white;
  padding: 6px;
  box-shadow: 5px 3px 8px 3px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const CartItemImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
`;

const CartDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartName = styled.span`
  font-size: 0.8rem;
  ${mobile({ fontSize: "1rem" })}
`;

const Button = styled.button`
  background-color: #0099dd;
  color: white;
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  margin-top: 7px;
  ${mobile({ fontSize: "1.2rem" })}
`;
