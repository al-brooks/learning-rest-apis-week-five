// In-progress: Callback Functions:

// code-block: Get All Orders Function
function getAllOrders(completed) {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://troubled-peaceful-hell.glitch.me/orders');
  request.send();

  request.addEventListener('load', function () {
    const orders = JSON.parse(this.responseText);
    //   console.log(orders);
    completed(orders);
  });
}

// code-block: Display orders format function
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

// complete: Get all orders - display on webpage

// code-block: call the get orders function and call display in it
getAllOrders(function (orders) {
  displayOrders(orders);
});

// complete: Create new order
submitOrderBtn.addEventListener('click', function () {
  const email = orderEmailText.value;
  const type = orderType.value;
  const size = orderSize.value;
  const price = orderPrice.value;

  let orderRequest = new XMLHttpRequest();

  orderRequest.open('POST', 'https://troubled-peaceful-hell.glitch.me/orders');

  orderRequest.setRequestHeader('Content-Type', 'application/json');

  const body = {
    email: email,
    type: type,
    size: size,
    price: price
  };

  const jsonBody = JSON.stringify(body);

  orderRequest.send(jsonBody);

  orderRequest.addEventListener('load', function () {
    const order = JSON.parse(this.responseText);
    const orderItem = `
      <li>
          ${order.email},
          ${order.type},
          ${order.size},
          ${order.price}
      </li>
    `;

    ordersUL.insertAdjacentHTML('beforeend', orderItem);
  });
});

// To-do: Get order by email

// To-do: Delete Order by email
deleteOrderBtn.addEventListener('click', function () {
  const delEmail = deleteEmailText.value;

  let request = new XMLHttpRequest();

  request.open(
    'delete',
    `https://troubled-peaceful-hell.glitch.me/orders/${delEmail}`
  );

  request.send();
});

order = { success: false, messge: 'Required fields are missing!' };
