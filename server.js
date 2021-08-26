const express = require("express");//import express
const bodyParser = require("body-parser");//import body-parser
const cors = require("cors");//import cors
const dbConfig = require("./app/config/db.config.js");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081" //khai báo đường dẫn máy chủ
};
app.use(cors(corsOptions));//cho app sử dụng cors với function trên
//// phân tích cú pháp các yêu cầu của content-type - application / json 
//// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
// phân tích cú pháp các yêu cầu thuộc loại nội dung - application / x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
//simple route
//Đường dẫn thường
app.get("/",(req,res)=>{
    res.json({ message: "Welcome to bezkoder application."});
})
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
// set port, listen for requests
//đặt cổng , lắng nghe yêu cầu
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
//initial() function helps us to create 3 important rows in roles collection.
//Hàm initial () giúp chúng ta tạo 3 hàng quan trọng trong bộ sưu tập vai trò. 