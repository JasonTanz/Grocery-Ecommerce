import React, { useState, useRef, useEffect } from 'react';
import { PageWrapper } from '../../components/organisms';
import {
  Center,
  Container,
  VStack,
  Heading,
  HStack,
  Text,
  Divider,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { Orders as OrdersProps } from '../../types/orderTypes';
import { findOrderByCustId } from '../../graphql/order';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { OrderRow } from '../../components/molecules';
const Dashboard = () => {
  const [tab, setTab] = useState<number>(1);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const authState = useSelector((state: any) => state.auth);
  const [pendingOrder, setPendingOrder] = useState<OrdersProps[]>([]);
  const [completedOrder, setCompletedOrder] = useState<OrdersProps[]>([]);
  const setActive = (currentTab: string) => {
    if (indicatorRef.current) {
      if (currentTab === '1') {
        indicatorRef.current.style.left = '-24px';
        indicatorRef.current.style.width = '35%';
      } else if (currentTab === '2') {
        indicatorRef.current.style.left = '58px';
        indicatorRef.current.style.width = '50%';
      }
    }
  };
  const {
    data: orders,
    loading: orderLoading,
    error: orderErr,
  } = useQuery(findOrderByCustId, {
    variables: { cust_id: authState.user.id },
  });

  useEffect(() => {
    if (orders) {
      setPendingOrder([
        ...orders.findOrderByCustId.filter(
          (data: OrdersProps) =>
            data.order_status === 'Pending' ||
            data.order_status === 'Out for delivery',
        ),
      ]);
      setCompletedOrder([
        ...orders.findOrderByCustId.filter(
          (data: OrdersProps) => data.order_status === 'Completed',
        ),
      ]);
    }
    if (orderErr) {
      toast({
        title: 'Fail to create order',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, orders, orderErr]);
  return (
    <PageWrapper>
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
          <Center py="2em" w="100%">
            <Container maxW="container.xl">
              <VStack w="100%" alignItems={'flex-start'}>
                <Heading>My Order</Heading>
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
                    <Text fontSize={'1rem'}>Pending</Text>
                  </Center>
                  <Center
                    cursor={'pointer'}
                    onClick={() => {
                      setTab(2);
                      setActive('2');
                    }}
                  >
                    <Text fontSize={'1rem'}>Completed</Text>
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
                            <Th>Total Price</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {pendingOrder.map((order: OrdersProps) => (
                            <OrderRow
                              order={order}
                              key={order.order_id}
                              pendingOrder={pendingOrder}
                              setPendingOrder={setPendingOrder}
                              completedOrder={completedOrder}
                              setCompletedOrder={setCompletedOrder}
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
                            <Th>Total Price</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {completedOrder.map((order: OrdersProps) => (
                            <OrderRow order={order} key={order.order_id} />
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
      )}
    </PageWrapper>
  );
};

export default Dashboard;
