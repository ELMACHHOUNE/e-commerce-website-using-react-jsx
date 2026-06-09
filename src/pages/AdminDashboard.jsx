import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart3,
  Package,
  Users,
  Tags,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  DollarSign,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import ExcelJS from "exceljs";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { saveAs } from "file-saver";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { useAuth } from "@/contexts/AuthContext";

pdfMake.vfs = pdfFonts;

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "products", label: "Products", icon: Package },
  { id: "users", label: "Users", icon: Users },
  { id: "categories", label: "Categories", icon: Tags },
];

const CHART_COLORS = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0"];
const PIE_COLORS = ["#0f172a", "#94a3b8"];

/* ---------- Export helpers ---------- */

async function exportExcel(data, headers, filename) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(filename);
  const headerRow = ws.addRow(headers.map((h) => h.label));
  headerRow.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
  headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };
  headerRow.height = 28;
  data.forEach((row) => {
    const r = ws.addRow(headers.map((h) => row[h.key] ?? ""));
    r.alignment = { horizontal: "center", vertical: "middle" };
  });
  ws.columns.forEach((col) => { col.width = 28; });
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `${filename}.xlsx`);
}

function exportPDF(data, headers, title) {
  const docDef = {
    pageSize: "A4",
    pageMargins: [20, 30, 20, 30],
    content: [
      { text: title, style: "header", margin: [0, 0, 0, 12] },
      {
        table: {
          headerRows: 1,
          widths: headers.map(() => "*"),
          body: [
            headers.map((h) => ({ text: h.label, style: "tableHeader" })),
            ...data.map((row) => headers.map((h) => ({ text: String(row[h.key] ?? ""), style: "cell" }))),
          ],
        },
        layout: "lightHorizontalLines",
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true, color: "#0f172a" },
      tableHeader: { bold: true, fontSize: 11, fillColor: "#0f172a", color: "#ffffff", margin: [5, 5], alignment: "center" },
      cell: { fontSize: 10, margin: [5, 3], alignment: "center" },
    },
    defaultStyle: { font: "Roboto" },
  };
  pdfMake.createPdf(docDef).download(`${title}.pdf`);
}

/* ---------- Toast ---------- */

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600";
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur-sm ${bg} ${
      type === "success" ? "border-green-200" : "border-red-200"
    }`}>
      <Icon className="size-4 shrink-0" />
      {message}
    </div>
  );
}

/* ---------- Summary card ---------- */

function SummaryCard({ icon: Icon, label, value, sub }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
        <Icon className="size-5 text-slate-700" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-semibold text-slate-950">{value}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </Card>
  );
}

/* ---------- Charts ---------- */

function ProductsBarChart({ data }) {
  if (!data.length) return null;
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-sm font-medium text-slate-700">Products per Category</h3>
      <p className="mb-4 text-xs text-slate-400">Distribution across all product categories</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
              cursor={{ fill: "#f1f5f9" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={48}>
              {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function UsersPieChart({ adminCount, userCount }) {
  const data = [
    { name: "Admin", value: adminCount },
    { name: "User", value: userCount },
  ];
  if (!adminCount && !userCount) return null;
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-sm font-medium text-slate-700">User Roles</h3>
      <p className="mb-4 text-xs text-slate-400">Admin vs regular user distribution</p>
      <div className="flex items-center justify-center h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={56} outerRadius={80} paddingAngle={4} dataKey="value">
              {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-semibold text-slate-950">{adminCount + userCount}</span>
          <span className="text-xs text-slate-400">total</span>
        </div>
      </div>
      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[0] }} />
          Admin ({adminCount})
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[1] }} />
          User ({userCount})
        </div>
      </div>
    </Card>
  );
}

function PriceRangeChart({ data }) {
  if (!data.length) return null;
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-sm font-medium text-slate-700">Price Range Overview</h3>
      <p className="mb-4 text-xs text-slate-400">Product prices sorted ascending</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Line type="monotone" dataKey="price" stroke="#0f172a" strokeWidth={2} dot={{ r: 3, fill: "#0f172a" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function CategoryAreaChart({ data }) {
  if (!data.length) return null;
  return (
    <Card className="p-5">
      <h3 className="mb-1 text-sm font-medium text-slate-700">Category Distribution</h3>
      <p className="mb-4 text-xs text-slate-400">Cumulative product count by category</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Area type="monotone" dataKey="count" stroke="#334155" fill="#94a3b8" fillOpacity={0.3} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

/* ---------- Forms ---------- */

function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial || { title: "", price: "", description: "", category: "", image: "" }
  );
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
        <input name="title" value={form.title} onChange={handleChange}
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Price</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
          <input name="category" value={form.category} onChange={handleChange}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Image URL</label>
        <input name="image" value={form.image} onChange={handleChange}
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
        <textarea name="description" rows="3" value={form.description} onChange={handleChange}
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 resize-none" />
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)} className="bg-slate-900 text-white hover:bg-slate-800">
          {initial ? "Update" : "Create"} Product
        </Button>
      </div>
    </div>
  );
}

function UserForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial || { email: "", password: "", fullName: "", phone: "", role: "user" }
  );
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange}
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Role</label>
          <select name="role" value={form.role} onChange={handleChange}
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)} className="bg-slate-900 text-white hover:bg-slate-800">
          {initial ? "Update" : "Create"} User
        </Button>
      </div>
    </div>
  );
}

function CategoryForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Category Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200" />
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave({ name })} className="bg-slate-900 text-white hover:bg-slate-800">
          {initial ? "Update" : "Create"} Category
        </Button>
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingType, setDeletingType] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  if (!user || user.role !== "admin") {
    navigate("/", { replace: true });
    return null;
  }

  /* ---------- Data fetching ---------- */

  async function fetchProducts() {
    try { setLoading(true); setError("");
      const { data } = await axios.get(`${API_URL}/products`);
      setProducts(data);
    } catch { setError("Failed to load products."); }
    finally { setLoading(false); }
  }

  async function fetchUsers() {
    try { setLoading(true); setError("");
      const { data } = await axios.get(`${API_URL}/users`);
      setUsers(data);
    } catch { setError("Failed to load users."); }
    finally { setLoading(false); }
  }

  async function fetchCategories() {
    try { setLoading(true); setError("");
      const { data } = await axios.get(`${API_URL}/products/categories`);
      setCategories(data.map((name) => ({ name })));
    } catch { setError("Failed to load categories."); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchCategories();
  }, []);

  function showToast(message, type = "success") {
    setToast({ message, type, key: Date.now() });
  }

  /* ---------- Derived data ---------- */

  const categoryCounts = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const c = p.category || "uncategorized";
      map[c] = (map[c] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [products]);

  const priceData = useMemo(() => {
    return [...products]
      .sort((a, b) => a.price - b.price)
      .slice(0, 20)
      .map((p, i) => ({ label: `#${i + 1}`, price: p.price }));
  }, [products]);

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.length - adminCount;

  /* ---------- Search & pagination ---------- */

  const filtered = (activeTab === "products" ? products : activeTab === "users" ? users : categories)
    .filter((item) => {
      if (!search) return true;
      const q = search.toLowerCase();
      if (activeTab === "products") return item.title?.toLowerCase().includes(q) || item.category?.toLowerCase().includes(q);
      if (activeTab === "users") {
        const name = item.name?.firstname ? `${item.name.firstname} ${item.name.lastname}` : item.fullName || "";
        return name.toLowerCase().includes(q) || item.email?.toLowerCase().includes(q);
      }
      return item.name?.toLowerCase().includes(q);
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  /* ---------- CRUD ---------- */

  function confirmDelete(id, type) {
    setDeletingId(id);
    setDeletingType(type);
    setConfirmOpen(true);
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted successfully.");
    } catch { showToast("Failed to delete product.", "error"); }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showToast("User deleted successfully.");
    } catch { showToast("Failed to delete user.", "error"); }
  }

  async function deleteCategory(name) {
    setCategories((prev) => prev.filter((c) => c.name !== name));
    showToast("Category deleted successfully.");
  }

  function handleConfirmDelete() {
    if (deletingType === "product") deleteProduct(deletingId);
    else if (deletingType === "user") deleteUser(deletingId);
    else if (deletingType === "category") deleteCategory(deletingId);
    setDeletingId(null);
    setDeletingType(null);
  }

  async function saveProduct(form) {
    try {
      setError("");
      if (editingItem) {
        await axios.put(`${API_URL}/products/${editingItem.id}`, { ...form, price: parseFloat(form.price) });
        setProducts((prev) => prev.map((p) => (p.id === editingItem.id ? { ...p, ...form, price: parseFloat(form.price) } : p)));
        showToast("Product updated successfully.");
      } else {
        const { data } = await axios.post(`${API_URL}/products`, { ...form, price: parseFloat(form.price) });
        setProducts((prev) => [...prev, data]);
        showToast("Product created successfully.");
      }
      setModalOpen(false);
      setEditingItem(null);
    } catch { showToast("Failed to save product.", "error"); }
  }

  async function saveUser(form) {
    try {
      setError("");
      if (editingItem) {
        await axios.put(`${API_URL}/users/${editingItem.id}`, form);
        setUsers((prev) => prev.map((u) => (u.id === editingItem.id ? { ...u, ...form } : u)));
        showToast("User updated successfully.");
      } else {
        const { data } = await axios.post(`${API_URL}/users`, form);
        setUsers((prev) => [...prev, data]);
        showToast("User created successfully.");
      }
      setModalOpen(false);
      setEditingItem(null);
    } catch { showToast("Failed to save user.", "error"); }
  }

  async function saveCategory(form) {
    if (editingItem) {
      setCategories((prev) => prev.map((c) => (c.name === editingItem.name ? form : c)));
      showToast("Category updated successfully.");
    } else {
      setCategories((prev) => [...prev, form]);
      showToast("Category created successfully.");
    }
    setModalOpen(false);
    setEditingItem(null);
  }

  function openAddForm() { setEditingItem(null); setModalOpen(true); }
  function openEditForm(item) { setEditingItem(item); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setEditingItem(null); }

  /* ---------- Export ---------- */

  const productHeaders = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
  ];
  const userHeaders = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
  ];
  const categoryHeaders = [
    { key: "name", label: "Name" },
    { key: "productCount", label: "Product Count" },
  ];

  function getProductData() {
    return products.map((p) => ({ id: p.id, title: p.title, price: `$${p.price?.toFixed(2)}`, category: p.category }));
  }
  function getUserData() {
    return users.map((u) => ({
      id: u.id,
      name: u.name?.firstname ? `${u.name.firstname} ${u.name.lastname}` : u.fullName || "—",
      email: u.email,
      phone: u.phone || "—",
      role: u.role || "user",
    }));
  }
  function getCategoryData() {
    return categories.map((c) => ({
      name: c.name,
      productCount: categoryCounts.find((cc) => cc.name === c.name)?.count || 0,
    }));
  }

  /* ---------- Render ---------- */

  const modalTitle = editingItem
    ? `Edit ${activeTab === "products" ? "Product" : activeTab === "users" ? "User" : "Category"}`
    : `Add ${activeTab === "products" ? "Product" : activeTab === "users" ? "User" : "Category"}`;

  function renderManagementHeader({ onExcel, onPdf }) {
    return (
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-950 capitalize">
          {activeTab} Management
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onExcel}>
            <FileSpreadsheet className="mr-1.5 size-3.5" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={onPdf}>
            <FileText className="mr-1.5 size-3.5" />
            PDF
          </Button>
          <Button onClick={openAddForm} className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="mr-1.5 size-4" />
            Add {activeTab === "products" ? "Product" : activeTab === "users" ? "User" : "Category"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <aside className="hidden w-52 shrink-0 flex-col md:flex">
        <nav className="space-y-1 rounded-xl border border-slate-200 bg-white p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setModalOpen(false); setEditingItem(null); setSearch(""); setPage(1); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        {activeTab === "dashboard" ? (
          <>
            <h1 className="mb-6 text-2xl font-semibold text-slate-950">Dashboard Overview</h1>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard icon={ShoppingBag} label="Total Products" value={products.length} sub="In catalog" />
              <SummaryCard icon={Users} label="Total Users" value={users.length} sub={`${adminCount} admin · ${userCount} users`} />
              <SummaryCard icon={Tags} label="Categories" value={categories.length} sub="Product categories" />
              <SummaryCard
                icon={DollarSign}
                label="Avg. Price"
                value={products.length ? `$${(products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(2)}` : "$0"}
                sub={`From $${Math.min(...products.map((p) => p.price)).toFixed(2)}`}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <ProductsBarChart data={categoryCounts} />
              <UsersPieChart adminCount={adminCount} userCount={userCount} />
              <PriceRangeChart data={priceData} />
              <CategoryAreaChart data={categoryCounts} />
            </div>
          </>
        ) : (
          <>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}

            {activeTab === "products" && renderManagementHeader({
              onExcel: () => exportExcel(getProductData(), productHeaders, "Products"),
              onPdf: () => exportPDF(getProductData(), productHeaders, "Products"),
            })}
            {activeTab === "users" && renderManagementHeader({
              onExcel: () => exportExcel(getUserData(), userHeaders, "Users"),
              onPdf: () => exportPDF(getUserData(), userHeaders, "Users"),
            })}
            {activeTab === "categories" && renderManagementHeader({
              onExcel: () => exportExcel(getCategoryData(), categoryHeaders, "Categories"),
              onPdf: () => exportPDF(getCategoryData(), categoryHeaders, "Categories"),
            })}

            <div className="mb-4">
              <SearchInput
                value={search}
                onChange={(v) => { setSearch(v); setPage(1); }}
                placeholder={`Search ${activeTab}...`}
              />
            </div>

            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {activeTab === "products" ? (
                      <>
                        <TableHead className="w-12">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="w-24 text-right">Actions</TableHead>
                      </>
                    ) : activeTab === "users" ? (
                      <>
                        <TableHead className="w-12">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="w-24 text-right">Actions</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-24 text-right">Actions</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={activeTab === "categories" ? 2 : 6} className="py-12 text-center text-sm text-slate-500">
                        Loading {activeTab}...
                      </TableCell>
                    </TableRow>
                  ) : paginated.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={activeTab === "categories" ? 2 : 6} className="py-12 text-center text-sm text-slate-500">
                        No {activeTab} found.
                      </TableCell>
                    </TableRow>
                  ) : activeTab === "products" ? (
                    paginated.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-mono text-xs text-slate-500">{product.id}</TableCell>
                        <TableCell className="max-w-56">
                          <div className="flex items-center gap-3">
                            {product.image && (
                              <img src={product.image} alt="" className="size-8 rounded object-cover bg-slate-100" />
                            )}
                            <span className="truncate font-medium">{product.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>${product.price?.toFixed(2)}</TableCell>
                        <TableCell className="text-slate-600 capitalize">{product.category}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEditForm(product)}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                              <Pencil className="size-3.5" />
                            </button>
                            <button onClick={() => confirmDelete(product.id, "product")}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : activeTab === "users" ? (
                    paginated.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-mono text-xs text-slate-500">{u.id}</TableCell>
                        <TableCell className="font-medium">
                          {u.name?.firstname ? `${u.name.firstname} ${u.name.lastname}` : u.fullName || "—"}
                        </TableCell>
                        <TableCell className="text-slate-600">{u.email}</TableCell>
                        <TableCell className="text-slate-600">{u.phone || "—"}</TableCell>
                        <TableCell>
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            u.role === "admin" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            {u.role || "user"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEditForm(u)}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                              <Pencil className="size-3.5" />
                            </button>
                            <button onClick={() => confirmDelete(u.id, "user")}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    paginated.map((cat) => (
                      <TableRow key={cat.name}>
                        <TableCell className="font-medium capitalize">{cat.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEditForm(cat)}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
                              <Pencil className="size-3.5" />
                            </button>
                            <button onClick={() => confirmDelete(cat.name, "category")}
                              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>

            {filtered.length > 0 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={filtered.length}
                pageSize={pageSize}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>

      <Modal open={modalOpen} onClose={closeModal} title={modalTitle}>
        {activeTab === "products" ? (
          <ProductForm
            initial={editingItem ? {
              title: editingItem.title,
              price: editingItem.price?.toString() || "",
              description: editingItem.description || "",
              category: editingItem.category || "",
              image: editingItem.image || "",
            } : null}
            onSave={saveProduct}
            onCancel={closeModal}
          />
        ) : activeTab === "users" ? (
          <UserForm
            initial={editingItem ? {
              email: editingItem.email || "",
              password: "",
              fullName: editingItem.name?.firstname
                ? `${editingItem.name.firstname} ${editingItem.name.lastname}`
                : editingItem.fullName || "",
              phone: editingItem.phone || "",
              role: editingItem.role || "user",
            } : null}
            onSave={saveUser}
            onCancel={closeModal}
          />
        ) : (
          <CategoryForm
            initial={editingItem ? { name: editingItem.name } : null}
            onSave={saveCategory}
            onCancel={closeModal}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setDeletingId(null); setDeletingType(null); }}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete this ${deletingType}? This action cannot be undone.`}
      />

      {toast && (
        <Toast key={toast.key} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
