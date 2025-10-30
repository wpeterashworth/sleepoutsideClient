import {getJSONData} from './utils.mts';
import {Order} from './types.mts';
import * as utils from './utils.mts';

const user = utils.getLocalStorage('so-user');
export async function submitOrder(order:Order) {
  // to submit an order we must be logged in. Check for a token
  if (!user) {
    throw new Error('You must be logged in to submit an order');
  }

  //if there is a token we can proceed to build the headers. We can send the token with the `Authorization` header.
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`
  })
  return await getJSONData('/orders', 'POST', headers, order);
}
export async function getOrdersForUser(userId: string) {
  // to get an order we must be logged in. Check for a token

  //if there is a token we can proceed to build the headers. We can send the token with the `Authorization` header.
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`
  })
  return await getJSONData(`/orders/user/${userId}`, 'GET', headers);
}   
export async function getOrderById(orderId: string) {
  // to get an order we must be logged in. Check for a token

  //if there is a token we can proceed to build the headers. We can send the token with the `Authorization` header.
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`
  })
  return await getJSONData(`/orders/${orderId}`, 'GET', headers);
}