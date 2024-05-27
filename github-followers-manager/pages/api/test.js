// pages/api/test.js
export default (req, res) => {
    if (req.method === 'GET') {
        const {username} = req.query
        console.log(username);
      console.log('Test endpoint called');
      res.status(200).json({ message: 'Test successful' });
    } else {
        console.log("Method Not allowed");
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  