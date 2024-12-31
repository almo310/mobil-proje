const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'gizli-anahtar';

const TokenServisi = {
  olustur(kullanici) {
    return jwt.sign(
      { id: kullanici.id, kullaniciAdi: kullanici.kullaniciAdi, rol: kullanici.rol },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  },

  dogrula(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (hata) {
      return null;
    }
  },
};

const KimlikDogrulama = {
  async dogrulama(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ hata: 'Token bulunamadı' });
      }

      const decoded = TokenServisi.dogrula(token);
      if (!decoded) {
        return res.status(401).json({ hata: 'Geçersiz token' });
      }

      const sql = 'SELECT id, kullaniciAdi, rol FROM kullanicilar WHERE id = ?';
      const [kullanici] = await query(sql, [decoded.id]);

      if (!kullanici) {
        return res.status(401).json({ hata: 'Kullanıcı bulunamadı' });
      }

      req.kullanici = kullanici;
      next();
    } catch (hata) {
      res.status(401).json({ hata: hata.message });
    }
  },

  adminYetkilendirme(req, res, next) {
    if (req.kullanici?.rol !== 'admin') {
      return res.status(403).json({ hata: 'Admin yetkisi gerekli' });
    }
    next();
  },
};

module.exports = {
  TokenServisi,
  KimlikDogrulama,
};
