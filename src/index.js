const express = require("express");
require("./Db/connection");
const cors = require("cors");
const router=require("./routes/routes")
const app = express();
const port = process.env.PORT || 5200;
app.use(express.json());
app.use(cors());
app.use("/user",router)
app.listen(port, () => {
    console.log(`Connection successful on port ${port}`);
});
