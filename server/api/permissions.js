const Permissions = exports = module.exports = {
  change: function (context, type, id, permissions) {
    var permissionsCol = context.db.collection('permissions');
    var perm = {type, id, permissions};
    // Insert some documents
    permissionsCol.insert(perm, (err, result) => {
      console.log("Inserted permission into the collection", perm, err, result);
    });
  }
};
