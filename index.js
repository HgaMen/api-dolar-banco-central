import express from "express";
import cors from "cors";
import coinRouter from "./routes/coin.route.js";

const app = express();

app.use(cors());

app.use("/api/v1/", coinRouter);
app.use("/", (_, res) =>
    res.json({
        msg: "API pública creada con amos, por favor utilizar con moderación.",
        version: "1.0.0",
    })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
