const mongoose = require('mongoose');
const app = require('./app');



mongoose.connect('mongodb://localhost:27017/pg-monitoring', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));


