import { config } from 'dotenv';
import app from './app';


config();
const port = process.env.PORT;

app.listen(port || 6969, () => console.log(`Server is running on port ${port}`));

