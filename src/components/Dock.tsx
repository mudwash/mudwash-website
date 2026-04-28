'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'framer-motion';
import React, { useRef } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
  badge?: number | string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  isActive?: boolean;
  badge?: number | string;
};

function DockItem({
  icon,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isActive = false,
  badge
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const widthTransform = useTransform(
    mouseX,
    (val: number) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
      const dist = val - (bounds.x + bounds.width / 2);
      
      // Use a smoother falloff (cosine based) for the magnification
      if (Math.abs(dist) > distance) return baseItemSize;
      
      const angle = (dist / distance) * (Math.PI / 2);
      const magnificationFactor = Math.cos(angle); // 1 at center, 0 at edge
      
      return baseItemSize + (magnification - baseItemSize) * magnificationFactor;
    }
  );

  const width = useSpring(widthTransform, {
    ...spring,
    stiffness: 250,
    damping: 25
  });

  return (
    <motion.div
      ref={ref}
      style={{ 
        width: width,
        height: baseItemSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={`shrink-0 cursor-pointer ${className}`}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="active-pill"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              position: 'absolute',
              inset: '4px',
              background: '#f69621',
              borderRadius: '12px',
              zIndex: 0,
              boxShadow: '0 8px 20px rgba(246, 150, 33, 0.4)'
            }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ 
          scale: isActive ? 1.2 : 1,
          y: isActive ? -1 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {React.cloneElement(icon as React.ReactElement, { 
          size: 24, 
          strokeWidth: isActive ? 3 : 2,
          color: isActive ? '#000000' : '#ffffff'
        })}
        
        {badge !== undefined && badge !== 0 && (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={badge}
              initial={{ scale: 0.5, opacity: 0, y: 5 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0, y: -5 }}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: '#f69621',
                color: '#000000',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 900,
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                zIndex: 10,
                border: '1.5px solid #000'
              }}
            >
              {badge}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 220, damping: 22 },
  magnification = 60,
  distance = 140,
  panelHeight = 70,
  baseItemSize = 52,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 20, 
        delay: 0.2
      }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onTouchMove={(e) => {
        if (e.touches.length > 0) {
          mouseX.set(e.touches[0].pageX);
        }
      }}
      onTouchEnd={() => mouseX.set(Infinity)}
      style={{ 
        height: panelHeight,
        background: 'rgba(15, 15, 15, 0.75)',
        backdropFilter: 'blur(30px) saturate(150%)',
        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
        borderRadius: '26px',
        padding: '0 10px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: 'max-content',
        maxWidth: 'calc(100vw - 32px)',
        margin: '0 auto'
      }}
      className={className}
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
          className={item.className}
          isActive={item.isActive}
          badge={item.badge}
        />
      ))}
    </motion.div>
  );
}
