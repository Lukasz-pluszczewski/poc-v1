const checkPassword = (verifier) => (req, res, next) => {
  if (verifier.verify(req.get('authentication'))) {
    return next();
  }
  res.status(401).json({ message: 'Password incorrect' });
};

export default checkPassword;
