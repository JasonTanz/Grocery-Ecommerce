import React, { useEffect } from 'react';
import {
  Tr,
  Td,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { Category } from '../../../types/categoryType';
import { BsFillTrashFill } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { deleteCartById } from '../../../graphql/cart';
import { useDispatch, useSelector } from 'react-redux';
import { Cart } from '../../../types/cartTypes';
import { UPDATECART } from '../../../reducers/cartSlice';
interface Props {
  item: Cart;
  setCart: any;
}
const CartItemRow = ({ item, setCart }: Props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [
    deleteCart,
    { data: deleteCartData, loading: deleteLoading, error: deleteErr },
  ] = useMutation(deleteCartById);
  const currentCartQty = useSelector((state: any) => state.cart.cart_qty);
  useEffect(() => {
    if (deleteCartData) {
      console.log(deleteCartData);
      dispatch(
        UPDATECART({
          cart_qty: currentCartQty - 1,
        }),
      );
      setCart((prev: Cart[]) => [
        ...prev.filter(
          (cart: Cart) => cart.cart_id !== deleteCartData.DeleteCartItemById,
        ),
      ]);
    }
    if (deleteErr) {
      toast({
        title: 'Fail to delete cart item',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, deleteErr, deleteCartData, dispatch]);
  return (
    <Tr>
      <Td>
        <HStack gap="1.5em">
          <VStack
            border="1px solid #ececec"
            borderRadius={'12px'}
            onClick={() =>
              (window.location.href = `/product/detail/${item.product.product_id}`)
            }
            cursor="pointer"
          >
            <Image
              src={item.product.product_img}
              maxH="120px"
              className="product-img"
            />
          </VStack>
          <VStack alignItems={'flex-start'}>
            <Text
              color="#253D4E"
              fontSize={'16px'}
              fontWeight="600"
              cursor="pointer"
              onClick={() =>
                (window.location.href = `/product/detail/${item.product.product_id}`)
              }
            >
              {item.product.product_name}
            </Text>
            <VStack alignItems={'flex-start'}>
              {item.product.categories.map((cat: Category) => (
                <Text
                  style={{
                    marginTop: 0,
                    marginLeft: 0,
                  }}
                  color="#adadad"
                  fontSize={'12px'}
                  key={cat.category_id}
                >
                  {cat.category_name}
                </Text>
              ))}
            </VStack>
          </VStack>
        </HStack>
      </Td>
      <Td>
        {' '}
        <VStack w="100%" alignItems={'center'}>
          <Text>RM{item.product.product_price}</Text>
        </VStack>
      </Td>
      <Td>
        <VStack w="100%" alignItems={'center'}>
          <Text>{item.item_qty}</Text>
        </VStack>
      </Td>
      <Td>
        <VStack w="100%" alignItems={'center'}>
          <Text>RM{item.product.product_price * item.item_qty}</Text>
        </VStack>
      </Td>
      <Td>
        <VStack w="100%" alignItems={'center'}>
          <IconButton
            aria-label="Delete Cart"
            colorScheme={'red'}
            isLoading={deleteLoading}
            onClick={() => {
              deleteCart({
                variables: {
                  cart_id: item.cart_id,
                },
              });
            }}
            icon={
              <BsFillTrashFill
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                }}
              />
            }
          />
        </VStack>
      </Td>
    </Tr>
  );
};

export default CartItemRow;
