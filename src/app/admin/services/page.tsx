"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Sparkles, 
  MoreVertical,
  X,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import { getServices, addService, updateService, deleteService, Service } from "@/lib/services";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Service>({
    name: "",
    price: "",
    duration: "",
    category: "Full Service",
    description: "",
    image: "",
    active: true
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: "", price: "", duration: "", category: "Full Service", description: "", image: "", active: true
    });
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id!);
    setFormData(service);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await addService(formData);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleSeed = async () => {
    if (!confirm("This will import the 12 default services into the database. Proceed?")) return;
    setIsSubmitting(true);
    const defaults = [
      { name: "General Service", image: "https://i.pinimg.com/1200x/c6/cc/8a/c6cc8afcad09287f9b6356bd19e6f081.jpg", category: "general", price: "AED 150", duration: "1 Hour", description: "Standard service", active: true },
      { name: "Oil Change", image: "https://i.pinimg.com/1200x/c4/98/2c/c4982cc85c46a58e4f00bd9bf53284e2.jpg", category: "general", price: "AED 100", duration: "30 Min", description: "Oil and filter change", active: true },
      { name: "Battery Replacement", image: "https://i.pinimg.com/1200x/30/25/a4/3025a43cd85187ae9fd71dbf592cfd51.jpg", category: "general", price: "AED 350", duration: "30 Min", description: "New battery installation", active: true },
      { name: "Brake Service", image: "https://i.pinimg.com/1200x/06/2d/b3/062db3d9baaf58a130130ecd701f24ee.jpg", category: "general", price: "AED 250", duration: "1.5 Hours", description: "Brake pad replacement", active: true },
      { name: "AC Check & Gas", image: "https://i.pinimg.com/1200x/96/2c/04/962c041629bf7d3016003bb6b4c1d925.jpg", category: "general", price: "AED 120", duration: "45 Min", description: "AC gas refill and check", active: true },
      { name: "Premium Wash", image: "https://i.pinimg.com/1200x/1d/cf/8f/1dcf8f3a2fefeb9637eabe516b5574a6.jpg", category: "general", price: "AED 80", duration: "45 Min", description: "Deep cleaning wash", active: true },
      { name: "Engine Tuning", image: "https://i.pinimg.com/1200x/84/38/d5/8438d5f961cd837c4f72fa7a06a325d0.jpg", category: "general", price: "AED 300", duration: "2 Hours", description: "Complete engine tune-up", active: true },
      { name: "Suspension", image: "https://i.pinimg.com/736x/e9/a2/78/e9a278f93e8aa08785a7754326648499.jpg", category: "general", price: "AED 400", duration: "3 Hours", description: "Suspension check and fix", active: true },
      { name: "Alignment Checking", image: "https://i.pinimg.com/736x/b9/58/04/b9580485cedc42c46c86b0c90b51fe52.jpg", category: "general", price: "AED 100", duration: "30 Min", description: "Wheel alignment", active: true },
      { name: "Paint & Body", image: "https://i.pinimg.com/1200x/e4/d6/7b/e4d67b9a3b80fc6c17da4a454f637ef8.jpg", category: "general", price: "Contact Us", duration: "Varies", description: "Bodywork and paint", active: true },
      { name: "Inspections", image: "https://i.pinimg.com/1200x/35/04/9b/35049b606164092c08061836981df2e0.jpg", category: "general", price: "AED 150", duration: "1 Hour", description: "Full car inspection", active: true },
      { name: "Ceramic Coating", image: "https://i.pinimg.com/1200x/d6/4a/6a/d64a6a6fdc465a152d31359fe2a995e6.jpg", category: "detailing", price: "AED 1200", duration: "1 Day", description: "Premium ceramic coating", active: true },
    ];
    try {
      for (const service of defaults) {
        await addService(service);
      }
      fetchServices();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Services</h1>
          <p className="text-white/40 text-sm font-medium">Configure your washing plans and detailing packages.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSeed}
            disabled={isSubmitting}
            className="bg-white/10 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors"
          >
            Import Default Services
          </button>
          <button 
            onClick={handleAddNew}
            className="bg-brand-orange text-black px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <Plus size={18} />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-brand-orange" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-colors relative flex flex-col"
            >
              {/* Image Preview */}
              <div className="h-40 bg-white/5 relative">
                {service.image ? (
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <ImageIcon size={40} />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${service.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/10 text-white/30'}`}>
                    {service.active ? "Active" : "Draft"}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{service.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 mt-auto">
                  <div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Base Price</p>
                    <p className="text-lg font-bold text-brand-orange">{service.price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Duration</p>
                    <p className="text-lg font-bold text-white">{service.duration}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => handleEdit(service)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => service.id && handleDelete(service.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-500/50 hover:text-red-500 text-xs font-bold transition-all"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add New Placeholder Card */}
          <motion.button 
            onClick={handleAddNew}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#050505] border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-brand-orange/20 hover:bg-brand-orange/[0.02] transition-all group min-h-[300px]"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-white/20 group-hover:text-brand-orange" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm text-white/40 group-hover:text-white">Create New Service</p>
              <p className="text-[10px] text-white/20 group-hover:text-white/40">Add a new washing plan to your menu</p>
            </div>
          </motion.button>
        </div>
      )}

      {/* Add Service Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Add New Service</h2>
                <p className="text-white/40 text-sm">Fill in the details below to add a new detailing package.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Service Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Full Detailing"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all appearance-none text-white"
                    >
                      <option>Full Service</option>
                      <option>Exterior</option>
                      <option>Interior</option>
                      <option>Protection</option>
                      <option>Add-ons</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Price (e.g. AED 450)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="AED 0"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Duration (e.g. 2 hours)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="30 min"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Image URL</label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Description</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe the service details..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange text-black py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Add Service Package"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
