// complete: Get All Orders Function
function getAllOrders(fetchedOrders, url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((orders) => {
      fetchedOrders(orders);
    })
    .catch((error) => {
      console.log('error fetching data');
    });
}

// complete: Display orders format function
function displayOrders(orders) {
  // api data is in an array
  const orderItems = orders.map(function (order) {
    return `
            <li>
                ${order.email},
                ${order.type},
                ${order.size},
                ${order.price}
            </li>
          `;
  });

  ordersUL.innerHTML = orderItems.join('');
}

// complete: display for search orders
function searchedOrders(order) {
  const orders = `
  <li>
  ${order.email},
  ${order.type},
  ${order.size},
  ${order.price}
</li>
  `;

  ordersUL.innerHTML = orders;
}

// complete: create order function
function createOrders(order) {
  fetch(GET_ALL_ORDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  }) // note: order placed message to console below
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
    });
}

// complete: Delete Orders function
function deleteOrders(url) {
  fetch(url, {
    method: 'DELETE'
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
    });
}

// complete: Create variables for HTML element
const searchEmailText = document.getElementById('searchEmailText');
const saveBtn = document.getElementById('saveBtn');
const orderEmailText = document.getElementById('orderEmailText');
const orderType = document.getElementById('orderType');
const orderSize = document.getElementById('orderSize');
const orderPrice = document.getElementById('orderPrice');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const deleteEmailText = document.getElementById('deleteEmailText');
const deleteOrderBtn = document.getElementById('deleteOrderBtn');
const ordersUL = document.getElementById('ordersUL');
const GET_ALL_ORDERS_URL = 'https://troubled-peaceful-hell.glitch.me/orders';

// complete: Get all orders - display on webpage
// call the get orders function and call display in it
getAllOrders(function (orders) {
  displayOrders(orders);
}, GET_ALL_ORDERS_URL);

// complete: Get order by email
saveBtn.addEventListener('click', function () {
  const searchEmailText = document.getElementById('searchEmailText');
  const GET_USER_ORDERS_URL = `https://troubled-peaceful-hell.glitch.me/orders/${searchEmailText.value}`;
  getAllOrders(function (orders) {
    searchedOrders(orders);
  }, GET_USER_ORDERS_URL);
});

// complete: Create new order
submitOrderBtn.addEventListener('click', function () {
  const email = orderEmailText.value;
  const type = orderType.value;
  const size = orderSize.value;
  const price = orderPrice.value;

  const order = {
    email: email,
    type: type,
    size: size,
    price: price
  };

  createOrders(order);
});

// complete: Delete Order by email
deleteOrderBtn.addEventListener('click', function () {
  const deleteEmailText = document.getElementById('deleteEmailText');
  const DELETE_USER_ORDERS_URL = `https://troubled-peaceful-hell.glitch.me/orders/${deleteEmailText.value}`;
  deleteOrders(DELETE_USER_ORDERS_URL);
});
