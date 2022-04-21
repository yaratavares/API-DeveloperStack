import app from "./app.js";
import "./setup.ts";

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});