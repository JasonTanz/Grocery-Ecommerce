import { GridItem } from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import {
  VStack,
  Text,
  useToast,
  Center,
  Container,
  Spinner,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { findAllOrders } from '../../graphql/order';
import { useQuery } from '@apollo/client';
import { Orders as OrdersProps } from '../../types/orderTypes';
import { AllOrderRows } from '../../components/molecules';

import { AdminWrapper } from '../../components/organisms';
const Dashboard = () => {
  const [tab, setTab] = useState<number>(1);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [pendingOrder, setPendingOrder] = useState<OrdersProps[]>([]);
  const [deliveryOrder, setDeliveryOrder] = useState<OrdersProps[]>([]);
  const [completedOrder, setCompletedOrder] = useState<OrdersProps[]>([]);
  const setActive = (currentTab: string) => {
    if (indicatorRef.current) {
      if (currentTab === '1') {
        indicatorRef.current.style.left = '-24px';
        indicatorRef.current.style.width = '35%';
      } else if (currentTab === '2') {
        indicatorRef.current.style.left = '80px';
        indicatorRef.current.style.width = '50%';
      }
    }
  };
  const {
    data: orders,
    loading: orderLoading,
    error: orderErr,
  } = useQuery(findAllOrders);

  useEffect(() => {
    if (orders) {
      setPendingOrder([
        ...orders.Orders.filter(
          (data: OrdersProps) => data.order_status === 'Pending',
        ),
      ]);
      setDeliveryOrder([
        ...orders.Orders.filter(
          (data: OrdersProps) => data.order_status === 'Out for delivery',
        ),
      ]),
        setCompletedOrder([
          ...orders.Orders.filter(
            (data: OrdersProps) => data.order_status === 'Completed',
          ),
        ]);
    }
    if (orderErr) {
      toast({
        title: 'Fail to get all orders',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, orders, orderErr]);
  return (
    <>
      {orderLoading ? (
        <>
          <Center minH="75vh">
            <Container
              d="flex"
              justifyContent={'center'}
              maxW="container.xl"
              mb="30px"
            >
              <Spinner
                thickness="5px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Container>
          </Center>
        </>
      ) : (
        <>
          <AdminWrapper>
            <GridItem bg="#f8f9fa">
              <>
                <Center py="2em" w="100%">
                  <Container maxW="container.xl">
                    <Heading pb="1.2em">All Orders</Heading>
                    <VStack
                      w="95%"
                      alignItems={'flex-start'}
                      border="1px solid #eee"
                      bg="#fff"
                      py="1.2"
                      px="1.4em"
                      borderRadius={'12px'}
                    >
                      <HStack
                        spacing={'25px'}
                        style={{ marginTop: '30px', marginBottom: '4px' }}
                        position={'relative'}
                      >
                        <Center
                          cursor={'pointer'}
                          onClick={() => {
                            setTab(1);
                            setActive('1');
                          }}
                        >
                          <Text fontSize={'1rem'}>
                            Pending (
                            {pendingOrder.length + deliveryOrder.length})
                          </Text>
                        </Center>
                        <Center
                          cursor={'pointer'}
                          onClick={() => {
                            setTab(2);
                            setActive('2');
                          }}
                        >
                          <Text fontSize={'1rem'}>
                            Completed ({completedOrder.length})
                          </Text>
                        </Center>
                        <VStack
                          ref={indicatorRef}
                          position={'absolute'}
                          background="#000000"
                          h="2px"
                          w="35%"
                          left="-24px"
                          top="36px"
                          transition="all 300ms cubic-bezier(0.740, -0.175, 0.000, 1.080)"
                          transitionTimingFunction="cubic-bezier(0.740, -0.175, 0.000, 1.080)"
                        ></VStack>
                      </HStack>

                      <Divider />

                      <VStack py="1.5em" w="100%">
                        {tab === 1 && (
                          <>
                            <Table variant="simple">
                              <Thead>
                                <Tr>
                                  <Th>Product</Th>
                                  <Th>Customer</Th>
                                  <Th>Delivery Info</Th>
                                  <Th>Ordered At</Th>
                                  <Th>Status</Th>

                                  <Th>Action</Th>
                                </Tr>
                              </Thead>

                              <Tbody>
                                {pendingOrder.map((order: OrdersProps) => (
                                  <AllOrderRows
                                    order={order}
                                    key={order.order_id}
                                    pendingOrder={pendingOrder}
                                    setPendingOrder={setPendingOrder}
                                    deliveryOrder={deliveryOrder}
                                    setDeliveryOrder={setDeliveryOrder}
                                  />
                                ))}
                              </Tbody>
                              <Tbody>
                                {deliveryOrder.map((order: OrdersProps) => (
                                  <AllOrderRows
                                    order={order}
                                    key={order.order_id}
                                    pendingOrder={pendingOrder}
                                    setPendingOrder={setPendingOrder}
                                    deliveryOrder={deliveryOrder}
                                    setDeliveryOrder={setDeliveryOrder}
                                  />
                                ))}
                              </Tbody>
                            </Table>
                          </>
                        )}
                        {tab === 2 && (
                          <>
                            <Table variant="simple">
                              <Thead>
                                <Tr>
                                  <Th>Product</Th>
                                  <Th>Customer</Th>
                                  <Th>Delivery Info</Th>
                                  <Th>Received At</Th>
                                  <Th>Status</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {completedOrder.map((order: OrdersProps) => (
                                  <AllOrderRows
                                    order={order}
                                    key={order.order_id}
                                  />
                                ))}
                              </Tbody>
                            </Table>
                          </>
                        )}
                      </VStack>
                    </VStack>
                  </Container>
                </Center>
              </>
            </GridItem>
          </AdminWrapper>
        </>
      )}
    </>
  );
};

export default Dashboard;
