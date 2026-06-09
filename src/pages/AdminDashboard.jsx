import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package,
  Users,
  Tags,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

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
import { useAuth } from "@/contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const tabs = [
  { id: "products", label: "Products", icon: Package },
  { id: "users", label: "Users", icon: Users },
  { id: "categories", label: "Categories", icon: Tags },
];

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

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
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

  function showToast(message, type = "success") {
    setToast({ message, type, key: Date.now() });
  }

  if (!user || user.role !== "admin") {
    navigate("/", { replace: true });
    return null;
  }

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
    if (activeTab === "products") fetchProducts();
    else if (activeTab === "users") fetchUsers();
    else fetchCategories();
  }, [activeTab]);

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

  function openAddForm() {
    setEditingItem(null);
    setModalOpen(true);
  }

  function openEditForm(item) {
    setEditingItem(item);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingItem(null);
  }

  const modalTitle = editingItem
    ? `Edit ${activeTab === "products" ? "Product" : activeTab === "users" ? "User" : "Category"}`
    : `Add ${activeTab === "products" ? "Product" : activeTab === "users" ? "User" : "Category"}`;

  return (
    <div className="flex gap-6">
      <aside className="hidden w-52 shrink-0 flex-col md:flex">
        <nav className="space-y-1 rounded-xl border border-slate-200 bg-white p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setModalOpen(false); setEditingItem(null); }}
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-950 capitalize">
            {activeTab} Management
          </h1>
          <Button onClick={openAddForm} className="bg-slate-900 text-white hover:bg-slate-800">
            <Plus className="mr-1.5 size-4" />
            Add {activeTab === "products" ? "Product" : activeTab === "users" ? "User" : "Category"}
          </Button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </div>
        )}

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
              ) : activeTab === "products" ? (
                products.map((product) => (
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
                users.map((u) => (
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
                categories.map((cat) => (
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
