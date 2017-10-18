const Users = exports = module.exports = {
  signup: function (context, username, password) {
    var usersCol = context.db.collection('users');
    var user = {username, password};
    // Insert some documents
    usersCol.insert(user, (err, result) => {
      console.log("Inserted user into the collection", user, err, result);
    });
  }
};
