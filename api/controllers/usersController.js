const db = require('../dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.usersAll = async (req, res) => {
  const users = await db('users');
  res.json(users);
};

exports.userRegister = async (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;
  // const name = req.body.name;
  const { name, email, password } = req.body;
  //   encrypts the password
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.json({ message: err });
    }

    await db('users')
      .insert({
        name,
        email,
        // crypted password stored to database
        password: hash,
      })
      .then((response) => {
        // Send a success message in response
        console.log(response);
        res.json({ registered: true });
      })
      .catch((err) => {
        // Send a error message in response
        res.json({ message: `There was an error creating registering` });
        console.log(err);
      });
  });
};

exports.userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  await db('users')
    .where({ email: email })
    .then((response) => {
      //   check if password match crypted password
      if (response.length > 0) {
        bcrypt.compare(password, response[0].password, (error, result) => {
          // if true return user object
          if (result) {
            console.log(result);
            return res.json(response);
          }
          //   return message if false
          else {
            return res.json({
              message: ' wrong username/password combination',
            });
          }
        });
        return;
      }

      //   return message user email not found
      return res.json({ message: 'Email not registered' });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: err.message });
    });
};

exports.userUpdate = async (req, res) => {
  const { id, updateInfo } = req.body;
  console.log(req.body);
  console.log(req.params);
  try {
    const user = await db('users').where({ id }).update(updateInfo);
    if (user) {
      res.status(200).json({ id, ...updateInfo });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (err) {
    res.json({ message: 'Error updating user' });
    console.log(err);
  }
};
