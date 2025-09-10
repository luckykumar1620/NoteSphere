const express =require('express') 
const connectToMongo=require('./db');
const cors=require('cors')

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


app.listen(port,()=>{
    console.log(`NoteSphere is listening on port ${port}`)
})