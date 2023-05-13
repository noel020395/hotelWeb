// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const { default: UserModel } = require("./models/UserModel");
admin.initializeApp();
const db = admin.firestore();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore
  .document("/messages/{documentId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log("Uppercasing", context.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({ uppercase }, { merge: true });
  });

// 如果username 和 password 都正确的话，就是admin, 成功进入adminPage
// 在admins collection 用where 的方式寻找,where function 可以接受3个parameter, 判断输入的username 是否等于collection.username, 输入的password 是否等于collection.password，然后get() 去读取
// await等待 adminRes的结果，return 是一个number, 如果结果是大过0，意思是至少有一个username 或者password 是match的
const checkisAdmin = async (username, password) => {
  const adminRes = db
    .collection("admins")
    .where("username", "==", username)
    .where("password", "==", password)
    .get();
  // 如果这个地方没有找到对应的username/password, 就会return false , number = 0
  // 如果这个地方找到对应的username/password, 就会return true , number > 0
  return (await adminRes).size > 0;
};

exports.useCreate = functions.https.onCall(async (data, context) => {
  // 设置 CORS 头
  context.res.set("Access-Control-Allow-Origin", "*");
  context.res.set("Access-Control-Allow-Methods", "GET, POST");
  context.res.set("Access-Control-Allow-Headers", "Content-Type");
  //要加上data.email 是因为从cloud function database 拿到这个data
  const email = data.email;
  const username = data.username;
  const password = data.password;
  const displayName = data.displayName;

  //只要找过超过0， 至少有一个，就是duplicate, 就会return error
  const usersRes = await db
    .collection("users")
    .where("username", "==", data.username)
    .get();
  if (usersRes.size > 0) {
    return {
      err: "User with this username already exists!",
    };
  }

  usersRes = await db
    .collection("users")
    .where("email", "==", data.email)
    .get();
  if (usersRes.size > 0) {
    return {
      err: "User with this email already exists!",
    };
  }

  const userModel = new UserModel(email, username, password, displayName);

  await admin.firestore().collection("users").add({
    // 找到collection users , 然后加上我们userModel Class 的data
    email: userModel.email,
    username: userModel.username,
    password: userModel.password,
    displayName: userModel.displayName,
    role: 1,
  });
  return {
    err: "",
  };
});

//login step 1)这里要检查username 或者password 是否match, step 2)还要看login 的是 admin 还是user, 怎样让电脑我是admin/user
exports.userLogin = functions.https.onCall(async (data, context) => {
  const usersRes = await db
    .collection("users")
    .where("username", "==", data.username)
    .where("password", "==", data.password)
    .get();

  if (usersRes.size > 0) {
    return { role: 1 };
  }

  const adminRes = await db
    .collection("adminRes")
    .where("username", "==", data.username)
    .where("password", "==", data.password)
    .get();

  if (adminRes.size > 0) {
    return { role: 0 };
  }
  res.set("Access-Control-Allow-Origin", "*");
  return { err: "Username or password is not correct!" };
});

exports.userGetAll = functions.https.onCall(async (data, context) => {
  const isAdmin = await checkisAdmin(data.username, data.password);
  //如果不是admin, isAdmin 是 false, 就会出现unaothorized 的 error
  if (!isAdmin) {
    //question: err 没有defined, 为什么可以在这里使用
    return { err: "Unauthorized" };
  }

  // 找所有的users
  const userRes = await db.collection("users").get();
  //就会把所有的users 变成一个json object, 以array 的方式
  return userRes.docs.map((doc) => doc.data());

  // let users = []

  // for(let userDoc of userRes.docs){
  //   users.push(userDoc.data)
  // }
  // return users;
});

exports.userUpdate = functions.https.onCall(async (data, context) => {
  const isAdmin = await checkisAdmin(admin.username, data.password);
  if (!isAdmin) {
    return { err: "Unauthorized!" };
  }
  const username = data.username;
  const email = data.email;
  const displayName = data.displayName;

  const userRes = await db
    .collection("users")
    .where("username", "==", username)
    .get();
  if (userRes.empty) {
    return { err: "Username not found!" };
  }

  if (email) {
    const usersWithSameEmailRes = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (!userRes.empty) {
      return { err: "User with the same email already exists" };
    }
  }

  if (email) {
    userRes.docs[0].ref.update("displayName", "==", "displayName");
  }
  return { err: null };
});

exports.userUpdate = functions.https.onCall(async (data, context) => {
  const isAdmin = await checkisAdmin(data.admin.password, data.admin.password);
  if (isAdmin) {
    return { err: "Unauthorized!" };
  }
  const userRes = await db
    .collection("users")
    .where("username", "==", username)
    .get();

  if (userRes.empty) {
    return { err: "username not found" };
  }
  userRes.doc[0].ref.delete();
  return { err: null };
});
