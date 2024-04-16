let express = require("express");
let cors = require("cors");
let app = express();
app.use(cors());
let mongoose = require("mongoose");
const multer = require("multer");
app.use("/uploads", express.static("uploads"));

let dotenv = require("dotenv");
dotenv.config();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let http = require("http");
let WebSocket = require("ws");
let server = http.createServer(app);
let wss = new WebSocket.Server({ server });

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.dbPath);
    console.log("successfully connected to MongoDB");
  } catch (err) {
    console.log("unable to connect to MongoDB");
  }
};

connectToMDB();

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: String,
  email: String,
  password: String,
  profilePic: String,
});

let user = new mongoose.model("member", userSchema);

//Real-time chat application schema info.

let memberSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  online: { type: Boolean, default: false },
});

let messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

let userDetails = new mongoose.model("memberList", memberSchema);

let Message = new mongoose.model("message", messageSchema);

//Websocket connection//

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    try {
      const { from, to, text } = JSON.parse(message);
      const newMessage = new Message({ from, to, text });
      await newMessage.save();
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newMessage));
        }
      });
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });
});

//Form Data//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(req.file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Login Data//

app.post("/loginData", upload.none(), async (req, res) => {
  console.log(req.body);

  let userInfo = await user.find().and({
    email: req.body.email,
  });

  if (userInfo.length == 0) {
    res.json({ status: "failure", msg: "user doesn't exists" });
  } else {
    let result = await bcrypt.compare(req.body.password, userInfo[0].password);

    if (result == true) {
      let encryptedCredentials = jwt.sign(
        {
          email: userInfo[0].email,
          password: userInfo[0].password,
        },
        "Ratnakar"
      );
      console.log(encryptedCredentials);
      res.json({
        status: "success",
        msg: "valid-credentials",
        token: encryptedCredentials,
        data: userInfo[0],
      });
    } else {
      res.json({ status: "failure", msg: "invalid-credentials or token" });
    }
  }
});

//Token Validation//

app.post("/tokenValidation", upload.none(), async (req, res) => {
  console.log(req.token);

  let userInfo = await user.find().and({ email: req.body.email });
  console.log(userInfo);

  let decrptedPassword = jwt.verify(req.body.token, "Ratnakar");

  if (userInfo.length > 0) {
    if (req.body.password == decrptedPassword.password) {
      res.json({ status: "success", msg: "valid-token", data: userInfo[0] });
    } else {
      res.json({ status: "failure", msg: "Invalid-token" });
    }
  }
});
//post Data//

app.post("/sendData", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let userInfo = await user.find().and({
    email: req.body.email,
  });

  console.log(userInfo);

  let bcryptPassword = await bcrypt.hash(req.body.password, 10);

  if (userInfo.length > 0) {
    res.json({ status: "failure", msg: "user already exists" });
  } else {
    try {
      let newUser = new user({
        firstName: req.body.fn,
        lastName: req.body.ln,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        password: bcryptPassword,
        profilePic: req.file.path,
      });

      await user.insertMany(newUser);
      res.json({ status: "success", msg: "user created successfully" });
    } catch (err) {
      res.json({ status: "failure", msg: err });
    }
  }
});

//Patch Data//

app.patch("/updateData", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  await user.updateMany(
    { email: req.body.email },
    {
      firstName: req.body.fn,
      lastName: req.body.ln,
      password: req.body.password,
    }
  );

  res.json({ status: "success", msg: "profile updated successfully" });
});

//Delete Account//

app.delete("/deleteProfile", upload.none(), async (req, res) => {
  let deleteAccount = await user.deleteMany({ email: req.body.email });
  console.log(deleteAccount);
  res.json({ status: "success", msg: "profile deleted successfully" });
});

//Get Data//

app.get("/getData", upload.none(), async (req, res) => {
  let userInfo = await user.find();
  console.log(userInfo);
  res.json({ status: "success", msg: "data successfully retrived" });
});
app.listen(process.env.port, () => {
  console.log("This port is listening to 3333");
});
