import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';

const SECRET_KEY = 'lnmcrw2SFK9Wil6tLngnxxYRvq6GYADodj+dCijAE2E6uZl0szlAjvzvgPz6h64jfVKoIVOKL77UNvgteoMW5Q=='; // replace with your own secret key
const SALT_ROUNDS = 10;

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user?.password || '');

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token with user ID and role
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

    // Return the token to the client
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next';


// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     try {
//       // Retrieve the username and password from the request body
//       const { username, password } = req.body;

//       // Find the user with the specified username
//       const user = await User.findOne({ username }).select('+password');
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }

//       // Check if the password is correct
//       const hashedPassword=await bcrypt.hash(password,10);
//       const isMatch = await bcrypt.compare(password,hashedPassword);
//       // const isMatch2= await bcrypt.compare(new String(password),hashedPassword);
//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//       }

//       // Generate a JWT token for the user
//       const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
//         expiresIn: '1h',
//       });

//       // Return the JWT token as a response
//       res.status(200).json({ token });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Login failed' });
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }
