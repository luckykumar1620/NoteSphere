const express =require('express') 
const connectToMongo=require('./db');
const cors=require('cors')
const path = require("path");
const app = express();

const port = process.env.PORT || 5000;

connectToMongo().catch(err => {
  console.error("Connection failed at top level:", err.message);
});

app.use(cors())
app.use(express.json());
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.listen(port,()=>{
    console.log(`NoteSphere is listening on port ${port}`)
})