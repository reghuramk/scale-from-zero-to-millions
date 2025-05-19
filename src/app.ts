import express from 'express';
import userRoutes from './routes/users';
import shortenerRoutes from './routes/shortener'; 

const app = express();
app.use(express.json());

app.use('/users', userRoutes);           
app.use('/', shortenerRoutes);     

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
