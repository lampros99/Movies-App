const { z } = require('zod');

const RegisterDTO = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email'),
  password: z.string().min(6, 'password min length 6'),
});

const LoginDTO = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(6, 'password min length 6'),
});

function toUserDTO(user) {
  const plain = typeof user.toJSON === 'function' ? user.toJSON() : user;
  return {
    id: plain.id,
    name: plain.name,
    email: plain.email,
  };
}

module.exports = { RegisterDTO, LoginDTO, toUserDTO };
