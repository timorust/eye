import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import path from "path";

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200, //
  })
);
app.use(express.json());

app.post("/api", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name)
    return res.status(400).json({ message: "Invalid email and name" });

  try {
    const createdRow = await prisma.waitList.create({
      data: { email, name },
    });
    res.json(createdRow);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.use(express.static(path.join(__dirname, "/build-front")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build-front/index.html"));
});

const server = app.listen(process?.env?.PORT ?? 5000, () => {
  console.log(`Listening on ` + process?.env?.PORT ?? 5000);
});
