import React, { useEffect } from 'react';
import {
  Tr,
  Td,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { updateOrderById } from '../../../graphql/order';
import { Orders } from '../../../types/orderTypes';
import { Category } from '../../../types/categoryType';
interface Props {
  order: Orders;
  setCart?: any;
  deliveryOrder?: any;
  setDeliveryOrder?: any;
  completedOrder?: any;
  setCompletedOrder?: any;
}
const OrderRow = ({
  order,
  deliveryOrder,
  setDeliveryOrder,
  completedOrder,
  setCompletedOrder,
}: Props) => {
  const toast = useToast();
  const [
    updateOrder,
    { data: updatedData, loading: updateLoading, error: updateErr },
  ] = useMutation(updateOrderById);
  useEffect(() => {
    if (updatedData) {
      setDeliveryOrder([
        ...deliveryOrder.filter(
          (order: Orders) =>
            order.order_id !== updatedData.UpdateOrderById.order_id,
        ),
      ]);
      setCompletedOrder([...completedOrder, updatedData.UpdateOrderById]);
    }
    if (updateErr) {
      toast({
        title: 'Fail to delete cart item',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [
    updatedData,
    updateErr,
    toast,
    setCompletedOrder,
    completedOrder,
    setDeliveryOrder,
    deliveryOrder,
  ]);
  return (
    <Tr>
      <Td>
        <HStack gap="1.5em">
          <VStack
            border="1px solid #ececec"
            borderRadius={'12px'}
            onClick={() =>
              (window.location.href = `/product/detail/${order.product.product_id}`)
            }
            cursor="pointer"
          >
            <Image
              src={order.product.product_img}
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
                (window.location.href = `/product/detail/${order.product.product_id}`)
              }
            >
              {order.product.product_name}
            </Text>
            <VStack alignItems={'flex-start'}>
              {order.product.categories.map((cat: Category) => (
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
      <Td>{order.order_total_price}</Td>
      <Td>{order.order_status}</Td>
      {order.order_status === 'Pending' ||
      order.order_status === 'Out for delivery' ? (
        <>
          <Td>
            <Button
              backgroundColor="#48BB78"
              color="#FFFFFF"
              _hover={{
                backgroundColor: '#31a36f',
              }}
              isDisabled={order.order_status === 'Pending'}
              isLoading={updateLoading}
              onClick={() => {
                updateOrder({
                  variables: {
                    input: {
                      order_status: 'Completed',
                      order_id: order.order_id,
                    },
                  },
                });
              }}
            >
              <>
                {order.order_status === 'Pending' ? (
                  <Text>Pending Delivery</Text>
                ) : (
                  <Text>Order Received</Text>
                )}
              </>
            </Button>
          </Td>
        </>
      ) : (
        <></>
      )}
    </Tr>
  );
};

export default OrderRow;
