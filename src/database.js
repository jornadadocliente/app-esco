import Dexie from 'dexie';

const db = new Dexie('escoapp');
db.version(1).stores({
  categories: 'id, image, slug, title'
});

db.version(2).stores({
  products: 'id, category, detailed, full_video, image, image_tree, intern, name, reasons, reasons_title, staffs, success_case_description, success_cases, thumb, title_tree'
});

db.version(3).stores({
  user: 'id, api_token, birth_date, cpf, email, email_verified_at, name, phone, profile_image, status, type'
})

export default db;