"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Package, 
  X,
  Loader2,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Star
} from "lucide-react";
import { getParts, addPart, deletePart, updatePart, Part } from "@/lib/parts";

export default function AdminPartsPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Part>({
    name: "",
    category: "Brakes",
    price: "AED 0",
    originalPrice: "AED 0",
    rating: 5,
    image: "",
    description: "",
    stock: 10
  });

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const data = await getParts();
      setParts(data);
    } catch (error) {
      console.error("Error fetching parts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditing && editId) {
        await updatePart(editId, formData);
      } else {
        await addPart(formData);
      }
      
      handleCloseModal();
      fetchParts();
    } catch (error) {
      console.error("Error saving part:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (part: Part) => {
    setFormData(part);
    setEditId(part.id || null);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      category: "Brakes",
      price: "AED 0",
      originalPrice: "AED 0",
      rating: 5,
      image: "",
      description: "",
      stock: 10
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this part?")) {
      try {
        await deletePart(id);
        fetchParts();
      } catch (error) {
        console.error("Error deleting part:", error);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Spare Parts</h1>
          <p className="text-white/40 text-sm font-medium">Manage your inventory of premium automotive components.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-orange text-black px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg shadow-brand-orange/20"
        >
          <Plus size={18} />
          <span>Add New Part</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-brand-orange" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Add New Placeholder Card */}
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.02, translateY: -5 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#050505] border-2 border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 hover:border-brand-orange/30 hover:bg-brand-orange/[0.03] transition-all group min-h-[380px] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:rotate-90 transition-all duration-500">
              <Plus size={32} className="text-white/20 group-hover:text-black" />
            </div>
            <div className="text-center relative z-10">
              <p className="font-black text-lg text-white/40 group-hover:text-white uppercase tracking-tighter">Add New Part</p>
              <p className="text-[10px] text-white/20 group-hover:text-brand-orange font-bold uppercase tracking-[0.2em] mt-1">Inventory Management</p>
            </div>
          </motion.button>

          {parts.map((part, idx) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ translateY: -10 }}
              className="bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden group hover:border-brand-orange/30 transition-all flex flex-col relative shadow-2xl"
            >
              <div className="h-52 bg-white/5 relative overflow-hidden">
                {part.image ? (
                  <img src={part.image} alt={part.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/5">
                    <Package size={64} />
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-brand-orange border border-brand-orange/20 shadow-xl">
                    {part.category}
                  </span>
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col relative">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-white mb-2 line-clamp-1 uppercase tracking-tight group-hover:text-brand-orange transition-colors">{part.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-orange font-black text-2xl tracking-tighter">{part.price}</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">{part.stock} IN STOCK</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-white/5 mt-auto">
                  <button 
                    onClick={() => handleEdit(part)}
                    className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 hover:bg-white text-white hover:text-black text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-lg"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => part.id && handleDelete(part.id)}
                    className="flex-1 flex items-center justify-center py-3.5 rounded-2xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all duration-500 border border-red-500/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              {/* Subtle Ambient Glow on Hover */}
              <div className="absolute -inset-1 bg-brand-orange/20 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Part Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-4">
                  <Package size={24} />
                </div>
                <h2 className="text-2xl font-bold mb-2">{isEditing ? "Edit Component" : "Inventory Entry"}</h2>
                <p className="text-white/40 text-sm">{isEditing ? "Modify the details of this existing spare part." : "Fill in the details to add a new spare part to your catalog."}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Part Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Brake Pads V2"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Category</label>
                    <div className="relative">
                      <select 
                        value={formData.category || "Brakes"}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all appearance-none text-white cursor-pointer"
                      >
                        <option>Brakes</option>
                        <option>Filters</option>
                        <option>Electrical</option>
                        <option>Fluids</option>
                        <option>Lighting</option>
                        <option>Wheels</option>
                        <option>Accessories</option>
                      </select>
                      <Layers className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Selling Price (e.g. AED 250)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="AED 0"
                        value={formData.price || ""}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Original Price (Before Offer)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="text" 
                        placeholder="AED 0"
                        value={formData.originalPrice || ""}
                        onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Stock Level</label>
                    <div className="relative">
                      <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="number" 
                        placeholder="0"
                        value={formData.stock || 0}
                        onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Rating (1-5)</label>
                    <div className="relative">
                      <Star className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        required
                        type="number" 
                        step="0.1"
                        min="1"
                        max="5"
                        placeholder="5.0"
                        value={formData.rating || 5}
                        onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the product technical details..."
                    value={formData.description || ""}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all resize-none placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="url" 
                      placeholder="https://..."
                      value={formData.image || ""}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-brand-orange focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>

                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-brand-orange text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl shadow-brand-orange/20"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (isEditing ? "Save Changes" : "Create Product")}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
