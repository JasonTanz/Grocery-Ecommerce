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
import moment from 'moment';
import { updateOrderById } from '../../../graphql/order';
import { Orders } from '../../../types/orderTypes';
import { Category } from '../../../types/categoryType';
interface Props {
  order: Orders;
  setCart?: any;
  pendingOrder?: any;
  setPendingOrder?: any;
  deliveryOrder?: any;
  setDeliveryOrder?: any;
}
const AllOrderRows = ({
  order,
  pendingOrder,
  setPendingOrder,
  deliveryOrder,
  setDeliveryOrder,
}: Props) => {
  const toast = useToast();
  const [
    updateOrder,
    { data: updatedData, loading: updateLoading, error: updateErr },
  ] = useMutation(updateOrderById);
  useEffect(() => {
    if (updatedData) {
      setPendingOrder(
        pendingOrder.filter(
          (data: Orders) =>
            data.order_id !== updatedData.UpdateOrderById.order_id,
        ),
      );
      setDeliveryOrder([...deliveryOrder, updatedData.UpdateOrderById]);
    }
    if (updateErr) {
      toast({
        title: 'Fail to delete cart item',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedData, updateErr, toast]);
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
      <Td>{order.customer.cust_username}</Td>
      <Td>
        {' '}
        <Text>{order.order_phone_number}</Text>
        <Text>{order.order_delivery_address}</Text>
      </Td>
      <Td>
        <Text fontSize={'12px'} color="#6c757d">
          {console.log(order.order_status)}
          {order.order_status === 'Pending'
            ? moment(order.createdAt).format('DD-MM-YY hh:mm A')
            : order.order_status === 'Out for delivery'
            ? moment(order.createdAt).format('DD-MM-YY hh:mm A')
            : moment(order.updatedAt).format('DD-MM-YY hh:mm A')}
        </Text>
      </Td>
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
              isLoading={updateLoading}
              isDisabled={order.order_status === 'Out for delivery'}
              onClick={() => {
                updateOrder({
                  variables: {
                    input: {
                      order_status: 'Out for delivery',
                      order_id: order.order_id,
                    },
                  },
                });
              }}
            >
              {order.order_status === 'Out for delivery' ? (
                <Text>Delivery In Progress</Text>
              ) : (
                <Text>Deliver Item</Text>
              )}
            </Button>
          </Td>
        </>
      ) : (
        <></>
      )}
    </Tr>
  );
};

export default AllOrderRows;
