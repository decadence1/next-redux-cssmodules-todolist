import path from "path";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const dbPath = path.join(process.cwd(), "db.json");
  let data;

  try {
    const fileContents = await fs.readFile(dbPath, "utf-8");
    data = JSON.parse(fileContents);
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
    return;
  }

  if (req.method === "GET") {
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
