// ============================================================
// DATA — Seed database with localStorage persistence
// ============================================================
const STORAGE_KEY = 'arqa_db';

function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveDB() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
  } catch (e) {}
}

const DB = loadDB() || (function() { return {
  users: [
    { id: "u1", name: "Admin ARQA", email: "admin@arqa.coffee", password: "admin123", role: "admin", phone: "081234567890", avatar: "A" },
    { id: "u2", name: "Rina Manager", email: "manager@arqa.coffee", password: "manager123", role: "manager", phone: "081234567891", avatar: "R" },
    { id: "u3", name: "Dian Kasir", email: "kasir@arqa.coffee", password: "kasir123", role: "cashier", phone: "081234567892", avatar: "D" },
    { id: "u4", name: "Budi Dapur", email: "dapur@arqa.coffee", password: "dapur123", role: "kitchen", phone: "081234567893", avatar: "B" },
    { id: "u5", name: "Andi Kurir", email: "kurir@arqa.coffee", password: "kurir123", role: "courier", phone: "081234567894", avatar: "K" },
    { id: "u6", name: "Sari Pelanggan", email: "customer@arqa.coffee", password: "customer123", role: "customer", phone: "081234567895", avatar: "S" },
  ],
  tables: [
    { id: "t1", number: "1", qr_code: "ARQA-T1", status: "available" },
    { id: "t2", number: "2", qr_code: "ARQA-T2", status: "available" },
    { id: "t3", number: "3", qr_code: "ARQA-T3", status: "occupied" },
    { id: "t4", number: "4", qr_code: "ARQA-T4", status: "available" },
    { id: "t5", number: "5", qr_code: "ARQA-T5", status: "available" },
    { id: "t6", number: "6", qr_code: "ARQA-T6", status: "occupied" },
    { id: "t7", number: "7", qr_code: "ARQA-T7", status: "available" },
    { id: "t8", number: "8", qr_code: "ARQA-T8", status: "available" },
  ],
  menuItems: [
    { id: "m1", name: "Espresso", description: "Kopi espresso murni dari biji Arabika pilihan", price: 18000, category: "coffee", image: "https://picsum.photos/seed/espresso41/400/300", is_available: true },
    { id: "m2", name: "Cappuccino", description: "Espresso dengan steamed milk dan foam lembut", price: 28000, category: "coffee", image: "https://picsum.photos/seed/cappuccino77/400/300", is_available: true },
    { id: "m3", name: "Caffe Latte", description: "Espresso dicampur susu panas dengan rasio sempurna", price: 26000, category: "coffee", image: "https://picsum.photos/seed/latte55/400/300", is_available: true },
    { id: "m4", name: "Americano", description: "Espresso dengan air panas — rasa bold dan clean", price: 22000, category: "coffee", image: "https://picsum.photos/seed/americano33/400/300", is_available: true },
    { id: "m5", name: "V60 Pour Over", description: "Kopi manual brew menggunakan metode V60", price: 32000, category: "coffee", image: "https://picsum.photos/seed/v60brew/400/300", is_available: true },
    { id: "m6", name: "Teh Tarik", description: "Teh hitam premium ditarik dengan susu kental", price: 20000, category: "non-coffee", image: "https://picsum.photos/seed/tehtarik/400/300", is_available: true },
    { id: "m7", name: "Matcha Latte", description: "Matcha Jepang grade ceremonial dengan susu oat", price: 30000, category: "non-coffee", image: "https://picsum.photos/seed/matchalatte/400/300", is_available: true },
    { id: "m8", name: "Chocolate Bliss", description: "Cokelat Belgia hangat dengan whipped cream", price: 28000, category: "non-coffee", image: "https://picsum.photos/seed/chocoblis/400/300", is_available: true },
    { id: "m9", name: "Nasi Goreng Kafe", description: "Nasi goreng spesial dengan telur dan kerupuk", price: 35000, category: "food", image: "https://picsum.photos/seed/nasgor88/400/300", is_available: true },
    { id: "m10", name: "Roti Bakar Cinnamon", description: "Roti sourdough bakar dengan butter cinnamon", price: 28000, category: "food", image: "https://picsum.photos/seed/rotibkr/400/300", is_available: true },
    { id: "m11", name: "Croissant Butter", description: "Croissant Prancis renyah dengan isian butter", price: 25000, category: "food", image: "https://picsum.photos/seed/croissant9/400/300", is_available: true },
    { id: "m12", name: "Pisang Goreng Keju", description: "Pisang goreng crispy dengan taburan keju cheddar", price: 22000, category: "food", image: "https://picsum.photos/seed/pisgoreng/400/300", is_available: true },
    { id: "m13", name: "Brownies Lava", description: "Brownies dark chocolate dengan lelehan di tengah", price: 26000, category: "snack", image: "https://picsum.photos/seed/brownies7/400/300", is_available: true },
    { id: "m14", name: "French Fries Truffle", description: "Kentang goreng dengan minyak truffle dan parmesan", price: 24000, category: "snack", image: "https://picsum.photos/seed/fries44/400/300", is_available: true },
    { id: "m15", name: "Cheesecake Slice", description: "New York style cheesecake dengan saus berry", price: 30000, category: "snack", image: "https://picsum.photos/seed/cheesecake3/400/300", is_available: true },
  ],
  orders: [
    {
      id: "o1", user_id: "u6", table_id: "t3", order_type: "dine-in", status: "cooking",
      total_amount: 54000, payment_method: "digital", payment_status: "paid",
      delivery_address: "", created_at: "2025-01-15T08:30:00",
      items: [
        { menu_item_id: "m2", quantity: 1, unit_price: 28000, notes: "", status: "cooking" },
        { menu_item_id: "m9", quantity: 1, unit_price: 35000, notes: "pedas", status: "cooking" },
      ],
    },
    {
      id: "o2", user_id: "u6", table_id: null, order_type: "delivery", status: "delivering",
      total_amount: 48000, payment_method: "cod", payment_status: "unpaid",
      delivery_address: "Jl. Mawar No. 15, RT 03/RW 05", created_at: "2025-01-15T09:15:00",
      items: [
        { menu_item_id: "m3", quantity: 1, unit_price: 26000, notes: "", status: "ready" },
        { menu_item_id: "m11", quantity: 1, unit_price: 25000, notes: "", status: "ready" },
      ],
      courier_id: "u5",
    },
    {
      id: "o3", user_id: "u6", table_id: "t6", order_type: "dine-in", status: "pending",
      total_amount: 22000, payment_method: "", payment_status: "unpaid",
      delivery_address: "", created_at: "2025-01-15T10:00:00",
      items: [
        { menu_item_id: "m1", quantity: 1, unit_price: 18000, notes: "extra shot", status: "pending" },
      ],
    },
  ],
  stockItems: [
    { id: "s1", name: "Biji Kopi Arabica", unit: "kg", current_quantity: 12, min_quantity: 5, updated_at: "2025-01-15" },
    { id: "s2", name: "Susu Segar", unit: "liter", current_quantity: 8, min_quantity: 10, updated_at: "2025-01-15" },
    { id: "s3", name: "Gula Pasir", unit: "kg", current_quantity: 15, min_quantity: 3, updated_at: "2025-01-14" },
    { id: "s4", name: "Tepung Terigu", unit: "kg", current_quantity: 6, min_quantity: 4, updated_at: "2025-01-14" },
    { id: "s5", name: "Mentega", unit: "kg", current_quantity: 3, min_quantity: 2, updated_at: "2025-01-13" },
    { id: "s6", name: "Cokelat Bubuk", unit: "kg", current_quantity: 1, min_quantity: 2, updated_at: "2025-01-15" },
    { id: "s7", name: "Matcha Powder", unit: "kg", current_quantity: 2, min_quantity: 1, updated_at: "2025-01-12" },
    { id: "s8", name: "Beras", unit: "kg", current_quantity: 20, min_quantity: 8, updated_at: "2025-01-11" },
    { id: "s9", name: "Teh Hitam", unit: "kg", current_quantity: 5, min_quantity: 2, updated_at: "2025-01-14" },
    { id: "s10", name: "Susu Kental Manis", unit: "kaleng", current_quantity: 12, min_quantity: 5, updated_at: "2025-01-14" },
    { id: "s11", name: "Susu Oat", unit: "liter", current_quantity: 2, min_quantity: 5, updated_at: "2025-01-15" },
    { id: "s12", name: "Whipped Cream", unit: "liter", current_quantity: 3, min_quantity: 2, updated_at: "2025-01-13" },
    { id: "s13", name: "Telur", unit: "butir", current_quantity: 3, min_quantity: 10, updated_at: "2025-01-15" },
    { id: "s14", name: "Minyak Goreng", unit: "liter", current_quantity: 1.5, min_quantity: 5, updated_at: "2025-01-15" },
    { id: "s15", name: "Bumbu Dapur", unit: "kg", current_quantity: 4, min_quantity: 3, updated_at: "2025-01-14" },
    { id: "s16", name: "Kayu Manis Bubuk", unit: "kg", current_quantity: 1, min_quantity: 1, updated_at: "2025-01-12" },
    { id: "s17", name: "Pisang", unit: "sisir", current_quantity: 4, min_quantity: 3, updated_at: "2025-01-15" },
    { id: "s18", name: "Keju Cheddar", unit: "kg", current_quantity: 2, min_quantity: 2, updated_at: "2025-01-13" },
    { id: "s19", name: "Kentang", unit: "kg", current_quantity: 1, min_quantity: 3, updated_at: "2025-01-15" },
    { id: "s20", name: "Minyak Truffle", unit: "liter", current_quantity: 1, min_quantity: 1, updated_at: "2025-01-14" },
    { id: "s21", name: "Keju Parmesan", unit: "kg", current_quantity: 1.5, min_quantity: 1, updated_at: "2025-01-14" },
    { id: "s22", name: "Cream Cheese", unit: "kg", current_quantity: 3, min_quantity: 2, updated_at: "2025-01-13" },
    { id: "s23", name: "Biskuit Graham", unit: "kg", current_quantity: 2, min_quantity: 2, updated_at: "2025-01-13" },
    { id: "s24", name: "Selai Berry", unit: "kg", current_quantity: 2, min_quantity: 1, updated_at: "2025-01-12" },
  ],
  menuStockMapping: {
    m1: ["s1"], m2: ["s1", "s2"], m3: ["s1", "s2"], m4: ["s1"], m5: ["s1"],
    m6: ["s9", "s10"], m7: ["s7", "s11"], m8: ["s6", "s2", "s12"],
    m9: ["s8", "s13", "s14", "s15"], m10: ["s4", "s5", "s16", "s3"],
    m11: ["s4", "s5"], m12: ["s17", "s4", "s18", "s14"],
    m13: ["s6", "s4", "s5", "s13"], m14: ["s19", "s20", "s21"],
    m15: ["s22", "s23", "s5", "s24"],
  },
  stockMovements: [
    { id: "sm1", stock_item_id: "s1", user_id: "u2", type: "out", quantity: 2, notes: "Pemakaian harian", created_at: "2025-01-15T08:00:00" },
    { id: "sm2", stock_item_id: "s2", user_id: "u2", type: "out", quantity: 6, notes: "Pemakaian harian", created_at: "2025-01-15T08:00:00" },
    { id: "sm3", stock_item_id: "s3", user_id: "u2", type: "in", quantity: 10, notes: "Restok dari supplier", created_at: "2025-01-14T10:00:00" },
    { id: "sm4", stock_item_id: "s11", user_id: "u2", type: "out", quantity: 3, notes: "Pemakaian harian", created_at: "2025-01-15T08:00:00" },
    { id: "sm5", stock_item_id: "s13", user_id: "u2", type: "out", quantity: 8, notes: "Pemakaian harian", created_at: "2025-01-15T08:00:00" },
    { id: "sm6", stock_item_id: "s14", user_id: "u2", type: "out", quantity: 4, notes: "Pemakaian harian", created_at: "2025-01-15T08:00:00" },
    { id: "sm7", stock_item_id: "s19", user_id: "u2", type: "out", quantity: 3, notes: "Pemakaian harian", created_at: "2025-01-15T08:00:00" },
    { id: "sm8", stock_item_id: "s6", user_id: "u2", type: "out", quantity: 1, notes: "Pemakaian untuk brownies dan chocolate bliss", created_at: "2025-01-15T08:00:00" },
    { id: "sm9", stock_item_id: "s17", user_id: "u2", type: "in", quantity: 2, notes: "Restok dari supplier", created_at: "2025-01-15T09:00:00" },
  ],
  attendances: [
    { id: "a1", user_id: "u3", check_in: "2025-01-15T07:55:00", check_out: null, status: "present" },
    { id: "a2", user_id: "u4", check_in: "2025-01-15T07:50:00", check_out: null, status: "present" },
    { id: "a3", user_id: "u5", check_in: "2025-01-15T08:00:00", check_out: null, status: "present" },
    { id: "a4", user_id: "u3", check_in: "2025-01-14T08:05:00", check_out: "2025-01-14T17:00:00", status: "present" },
    { id: "a5", user_id: "u4", check_in: "2025-01-14T07:58:00", check_out: "2025-01-14T17:05:00", status: "present" },
  ],
  courierTracking: [
    { id: "ct1", order_id: "o2", courier_id: "u5", latitude: -6.9175, longitude: 107.6191, recorded_at: "2025-01-15T09:30:00" },
  ],
  promos: [
    {
      id: "p1", code: "diskon20", title: "Diskon 20% Kopi", icon: "fa-percent", color: "#E07A3A",
      desc: "Nikmati diskon 20% untuk semua minuman kopi setiap hari Senin.",
      terms: ["Berlaku setiap hari Senin", "Maksimal 2 transaksi per pelanggan", "Tidak dapat digabung dengan promo lain", "Berlaku untuk Dine-In & Take Away"],
      is_active: true,
    },
    {
      id: "p2", code: "bundleHemat", title: "Beli 2 Gratis 1", icon: "fa-box-open", color: "#1abc9c",
      desc: "Beli 2 snack pilihan dan dapatkan 1 snack gratis!",
      terms: ["Berlaku untuk snack dengan harga sama/lebih rendah", "Berlaku setiap hari", "Gratis item dengan harga terendah", "Stok terbatas"],
      is_active: true,
    },
    {
      id: "p3", code: "happyHour", title: "Happy Hour 30%", icon: "fa-clock", color: "#6C5CE7",
      desc: "Diskon 30% untuk semua menu di jam 14:00–17:00 setiap hari.",
      terms: ["Berlaku pukul 14:00–17:00", "Berlaku untuk semua menu", "Maksimal 3 item per transaksi", "Berlaku Dine-In, Take Away & Delivery"],
      is_active: true,
    },
  ],
  dailySales: [
    { date: "2025-01-09", revenue: 1250000, orders: 32 },
    { date: "2025-01-10", revenue: 1480000, orders: 38 },
    { date: "2025-01-11", revenue: 980000, orders: 25 },
    { date: "2025-01-12", revenue: 1650000, orders: 42 },
    { date: "2025-01-13", revenue: 1120000, orders: 28 },
    { date: "2025-01-14", revenue: 1390000, orders: 35 },
    { date: "2025-01-15", revenue: 890000, orders: 22 },
  ],
  expenses: [
    { date: "2025-01-09", category: "Bahan Baku", amount: 450000, note: "Beli kopi dan susu" },
    { date: "2025-01-10", category: "Operasional", amount: 200000, note: "Listrik dan air" },
    { date: "2025-01-11", category: "Bahan Baku", amount: 380000, note: "Beli gula dan sirup" },
    { date: "2025-01-12", category: "Gaji", amount: 1200000, note: "Gaji karyawan" },
    { date: "2025-01-13", category: "Operasional", amount: 150000, note: "Sewa tempat" },
    { date: "2025-01-14", category: "Bahan Baku", amount: 520000, note: "Beli snack dan roti" },
    { date: "2025-01-15", category: "Lainnya", amount: 100000, note: "Biaya kebersihan" },
  ],
}; })();

if (!localStorage.getItem(STORAGE_KEY)) saveDB();
