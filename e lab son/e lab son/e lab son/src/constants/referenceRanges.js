export const IMMUNOGLOBULIN_BIRIMLERI = Object.freeze({
  IgG: 'mg/dL',
  IgA: 'mg/dL',
  IgM: 'mg/dL',
  IgE: 'IU/mL'
});

export const YAS_GRUPLARI = Object.freeze({
  YENIDOGAN: { anahtar: 'YENIDOGAN', etiket: '0-1 ay' },
  BEBEK_ERKEN: { anahtar: 'BEBEK_ERKEN', etiket: '1-4 ay' },
  BEBEK_GEC: { anahtar: 'BEBEK_GEC', etiket: '4-12 ay' },
  COCUK_KUCUK: { anahtar: 'COCUK_KUCUK', etiket: '1-5 yaş' },
  COCUK_BUYUK: { anahtar: 'COCUK_BUYUK', etiket: '6-10 yaş' },
  ERGENLIK: { anahtar: 'ERGENLIK', etiket: '11-16 yaş' },
  YETISKIN: { anahtar: 'YETISKIN', etiket: 'Yetişkin' }
});

const referansAraliklari = [
  {
    yasGrubu: YAS_GRUPLARI.YENIDOGAN.anahtar,
    tanim: 'Yenidoğan Dönemi',
    degerler: { IgG: [700, 1600], IgA: [0, 80], IgM: [20, 120], IgE: [null, 1.5] },
    kaynak: 'Türk Pediatri Dergisi',
    notlar: 'Anne antikorlarının etkisinde olabilir'
  },
  {
    yasGrubu: YAS_GRUPLARI.BEBEK_ERKEN.anahtar,
    tanim: 'Erken Bebeklik',
    degerler: { IgG: [200, 1200], IgA: [10, 100], IgM: [30, 120], IgE: [null, 15] },
    kaynak: 'Türk Pediatri Dergisi',
    notlar: 'Fizyolojik hipogamaglobulinemi dönemi'
  },
  {
    yasGrubu: YAS_GRUPLARI.BEBEK_GEC.anahtar,
    tanim: 'Geç Bebeklik',
    degerler: { IgG: [300, 1500], IgA: [20, 150], IgM: [50, 200], IgE: [null, 30] },
    kaynak: 'Türk Tıp Bilimleri',
    notlar: 'Kendi antikor üretiminin başlangıcı'
  },
  {
    yasGrubu: YAS_GRUPLARI.COCUK_KUCUK.anahtar,
    tanim: 'Okul Öncesi',
    degerler: { IgG: [400, 1600], IgA: [30, 200], IgM: [50, 250], IgE: [null, 60] },
    kaynak: 'Türk Tıp Bilimleri',
    notlar: 'İmmünoglobulin seviyelerinde hızlı artış'
  },
  {
    yasGrubu: YAS_GRUPLARI.COCUK_BUYUK.anahtar,
    tanim: 'Okul Çağı',
    degerler: { IgG: [600, 1800], IgA: [50, 300], IgM: [50, 300], IgE: [null, 90] },
    kaynak: 'Türk Pediatri Dergisi',
    notlar: 'Değerler yetişkin seviyelerine yaklaşır'
  },
  {
    yasGrubu: YAS_GRUPLARI.ERGENLIK.anahtar,
    tanim: 'Ergenlik',
    degerler: { IgG: [700, 1900], IgA: [70, 350], IgM: [60, 350], IgE: [null, 200] },
    kaynak: 'Türk Tıp Bilimleri',
    notlar: 'Yetişkin seviyelerine ulaşır'
  },
  {
    yasGrubu: YAS_GRUPLARI.YETISKIN.anahtar,
    tanim: 'Yetişkin',
    degerler: { IgG: [700, 1600], IgA: [70, 400], IgM: [40, 230], IgE: [null, 100] },
    kaynak: 'Türk Pediatri Dergisi',
    notlar: 'Standart yetişkin referans aralığı'
  }
];

export const uygunYasGrubu = (yas) => {
  if (yas < 1 / 12) return YAS_GRUPLARI.YENIDOGAN.anahtar;
  if (yas < 4 / 12) return YAS_GRUPLARI.BEBEK_ERKEN.anahtar;
  if (yas < 1) return YAS_GRUPLARI.BEBEK_GEC.anahtar;
  if (yas < 6) return YAS_GRUPLARI.COCUK_KUCUK.anahtar;
  if (yas < 11) return YAS_GRUPLARI.COCUK_BUYUK.anahtar;
  if (yas < 17) return YAS_GRUPLARI.ERGENLIK.anahtar;
  return YAS_GRUPLARI.YETISKIN.anahtar;
};

export const referansAraligiGetir = (yas) => {
  const yasGrubu = uygunYasGrubu(yas);
  return referansAraliklari.find(aralik => aralik.yasGrubu === yasGrubu);
};

export const degeriFormatla = (deger, birim) => `${deger} ${birim}`;
