import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true,
  },
  {
    name: 'Ken',
    email: 'ken@gmail.com',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Kenneth',
    email: 'kenneth@gmail.com',
    password: bcrypt.hashSync('password', 10),
  }
]

export default users