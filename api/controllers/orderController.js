const db = require('../dbConfig');

exports.add = async (req, res) => {
  const {
    name,
    email,
    address,
    addressNumber,
    zipCode,
    city,
    timestamp,
    subTotal,
  } = req.body.info;

  const { cart } = req.body;
  //   create new order
  // console.log(cart);
  const newOrder = await db('orders')
    .insert(req.body.info)
    .then(async (orderId) => {
      const items = () => {
        let itemList = [];
        cart.map((item) => {
          item.set.map((set) => {
            const newSet = {
              ...set,
              quantity: set.quantity * item.quantity,
              orderId: orderId,
            };
            itemList.push(newSet);
          });
        });

        return itemList;
      };
      //   create order items with order number
      await db('orderItems')
        .insert(items())
        .then((response) => res.json(orderId))
        .catch((err) => {
          console.log(err);
          return res.json({ message: 'there was an error with the items' });
        });
    })
    .catch((err) => {
      res.json({ message: 'There was an error in order' });
      console.log(err);
    });
};

exports.fetchOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderInfo = await db('orders').where({ id: orderId });
    const orderItems = await db('orderItems').where({ orderId: orderId });
    res.json({ orderInfo, orderItems });
  } catch (err) {
    res.json({ message: 'error fetching order' });
    console.log(err);
  }
};

exports.fetchUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    // get orders
    const orders = await db('orders').where({ userId: userId });
    // get orderId for all orders
    const orderIds = orders.map((o) => o.id);
    // get all items with [orderIds]
    const items = await db('orderItems').whereIn('orderId', orderIds);
    // combine items into orders
    const fullOrders = orders.map((o) => {
      const orderItems = items.filter((i) => i.orderId === o.id);
      return { ...o, items: orderItems };
    });
    res.json(fullOrders);
  } catch (err) {
    res.json({ message: 'error in fetchin orders' });
  }
};
