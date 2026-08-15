import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'kids_english_v5_secret_key_2026';

export const SYSTEM_USERS = {
  'baonguyen@kidsenglish.edu.vn': {
    id: 'ba_bao_nguyen',
    email: 'baonguyen@kidsenglish.edu.vn',
    name: 'Ba Bảo Nguyên',
    role: 'admin',
    avatar: '👨‍💼',
    permissions: ['*'],
    passwordHash: crypto.createHash('sha256').update('admin123').digest('hex')
  },
  'bao_nguyen': {
    id: 'ba_bao_nguyen',
    email: 'baonguyen@kidsenglish.edu.vn',
    name: 'Ba Bảo Nguyên',
    role: 'admin',
    avatar: '👨‍💼',
    permissions: ['*'],
    passwordHash: crypto.createHash('sha256').update('admin123').digest('hex')
  },
  'minhanh@kidsenglish.edu.vn': {
    id: 'minh_anh',
    email: 'minhanh@kidsenglish.edu.vn',
    name: 'Bé Nguyễn Ngọc Minh Anh',
    role: 'student',
    avatar: '👧',
    permissions: ['LEARN', 'QUIZ', 'PET'],
    passwordHash: crypto.createHash('sha256').update('minhanh123').digest('hex')
  },
  'minh_anh': {
    id: 'minh_anh',
    email: 'minhanh@kidsenglish.edu.vn',
    name: 'Bé Nguyễn Ngọc Minh Anh',
    role: 'student',
    avatar: '👧',
    permissions: ['LEARN', 'QUIZ', 'PET'],
    passwordHash: crypto.createHash('sha256').update('minhanh123').digest('hex')
  }
};

export function authenticateUser(emailOrUsername, password, requestedRole = 'student') {
  const user = SYSTEM_USERS[emailOrUsername.toLowerCase().trim()];
  if (!user) {
    if (requestedRole === 'student') {
      const learnerId = `learner_${Date.now()}`;
      const newUser = {
        id: learnerId,
        email: emailOrUsername,
        name: emailOrUsername.split('@')[0] || 'Học Viên Nhí',
        role: 'student',
        avatar: '👧',
        permissions: ['LEARN', 'QUIZ', 'PET']
      };
      return {
        success: true,
        user: newUser,
        token: generateAuthToken({ id: learnerId, role: 'student', email: emailOrUsername })
      };
    }
    return { success: false, error: 'Tài khoản không tồn tại trên hệ thống!' };
  }

  const hash = crypto.createHash('sha256').update(password || '').digest('hex');
  if (user.passwordHash && hash !== user.passwordHash) {
    return { success: false, error: 'Mật khẩu không chính xác!' };
  }

  const token = generateAuthToken({ id: user.id, role: user.role, email: user.email });
  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      permissions: user.permissions
    },
    token
  };
}

export function generateAuthToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 7 * 24 * 3600 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyAuthToken(token) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (signature !== expectedSignature) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}
