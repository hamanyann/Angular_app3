require('dotenv').config();
const express = require("express");
const Pusher = require("pusher");
const app = express();
const port = 3000;

// Pusherの設定
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// カウントを管理する変数
let count = 0;

app.use(express.json());
app.use(cors());

// カウントを増やすエンドポイント
app.post("/increment", (req, res) => {
  count += 1; // カウントを1増やす
  pusher.trigger("my-channel", "my-event", { count });
  res.send({ count });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
