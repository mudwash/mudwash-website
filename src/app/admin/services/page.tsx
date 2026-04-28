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
  Image as ImageIcon,
  Clock,
  Droplets, 
  Zap, 
  Snowflake, 
  Waves, 
  Wrench, 
  Settings, 
  Disc, 
  Car,
  ShieldCheck
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
    icon: "Wrench",
    active: true
  });

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    fetchServices();
    return () => { isMountedRef.current = false; };
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      if (isMountedRef.current) setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: "", price: "", duration: "", category: "Full Service", description: "", image: "", icon: "Wrench", active: true
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
      { name: "General Service", icon: "Wrench", image: "", category: "general", price: "AED 150", duration: "1 Hour", description: "Standard service", active: true },
      { name: "Oil Change", icon: "Droplets", image: "", category: "general", price: "AED 100", duration: "30 Min", description: "Oil and filter change", active: true },
      { name: "Battery Replacement", icon: "Zap", image: "", category: "general", price: "AED 350", duration: "30 Min", description: "New battery installation", active: true },
      { name: "Brake Service", icon: "Disc", image: "", category: "general", price: "AED 250", duration: "1.5 Hours", description: "Brake pad replacement", active: true },
      { name: "AC Check & Gas", icon: "Snowflake", image: "", category: "general", price: "AED 120", duration: "45 Min", description: "AC gas refill and check", active: true },
      { name: "Premium Wash", icon: "Waves", image: "", category: "general", price: "AED 80", duration: "45 Min", description: "Deep cleaning wash", active: true },
      { name: "Engine Tuning", icon: "Settings", image: "", category: "general", price: "AED 300", duration: "2 Hours", description: "Complete engine tune-up", active: true },
      { name: "Suspension", icon: "Wrench", image: "", category: "general", price: "AED 400", duration: "3 Hours", description: "Suspension check and fix", active: true },
      { name: "Alignment Checking", icon: "Wrench", image: "", category: "general", price: "AED 100", duration: "30 Min", description: "Wheel alignment", active: true },
      { name: "Paint & Body", icon: "ShieldCheck", image: "", category: "general", price: "Contact Us", duration: "Varies", description: "Bodywork and paint", active: true },
      { name: "Inspections", icon: "Wrench", image: "", category: "general", price: "AED 150", duration: "1 Hour", description: "Full car inspection", active: true },
      { name: "Ceramic Coating", icon: "ShieldCheck", image: "", category: "detailing", price: "AED 1200", duration: "1 Day", description: "Premium ceramic coating", active: true },
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
              {/* Icon/Image Preview */}
              <div className="h-40 bg-white/5 relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-brand-orange/20 to-transparent" />
                <div className="relative z-10 scale-[2.5]">
                  {(() => {
                    const iconSource = (service.icon || service.name).toLowerCase();
                    const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
                    if (emojiRegex.test(service.icon || "")) {
                      return <span className="text-xl">{service.icon}</span>;
                    }
                    
                    const IconMap: any = { Droplets, Zap, Snowflake, Waves, Wrench, Settings, Disc, Car, ShieldCheck, Clock };
                    const lucideMatch = Object.keys(IconMap).find(k => k.toLowerCase() === iconSource);
                    if (lucideMatch) {
                      const IconComponent = IconMap[lucideMatch];
                      return <IconComponent className="text-brand-orange" />;
                    }

                    if (iconSource.includes("wash") || iconSource.includes("clean")) return <Waves className="text-blue-400" />;
                    if (iconSource.includes("oil")) return <Droplets className="text-red-400" />;
                    if (iconSource.includes("battery")) return <Zap className="text-yellow-400" />;
                    
                    return <Wrench className="text-white/20" />;
                  })()}
                </div>
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

                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Icon / Keyword</label>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                      {(() => {
                        const iconSource = (formData.icon || formData.name).toLowerCase();
                        const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
                        if (emojiRegex.test(formData.icon || "")) {
                          return <span className="text-xl">{formData.icon}</span>;
                        }
                        const IconMap: any = { Droplets, Zap, Snowflake, Waves, Wrench, Settings, Disc, Car, ShieldCheck, Clock };
                        const lucideMatch = Object.keys(IconMap).find(k => k.toLowerCase() === iconSource);
                        const IconComp = lucideMatch ? IconMap[lucideMatch] : Wrench;
                        return <IconComp size={20} className={lucideMatch ? "text-brand-orange" : "text-white/20"} />;
                      })()}
                    </div>
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. wash, repair, or paste an emoji"
                    value={formData.icon}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      // Simple validation: only allow one "word" or one emoji
                      if (val.split(/\s+/).length <= 1) {
                        setFormData({...formData, icon: val});
                      }
                    }}
                    className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-all"
                  />
                  <p className="text-[9px] text-white/20 px-1 italic">
                    Type a keyword (wash, oil, engine), a Lucide name (Wrench, Disc), or paste a single Emoji.
                  </p>
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
