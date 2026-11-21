import React from 'react';
import { X, Check } from 'lucide-react';
import { AnatomicalSystemType } from '../../types/anatomy';

interface RegionSelectorProps {
  system: AnatomicalSystemType;
  selectedRegion: string | null;
  onSelectRegion: (region: string | null) => void;
  onClose: () => void;
}

interface RegionItem {
  id: string;
  name: string;
  description: string;
}

const SKELETAL_REGIONS: RegionItem[] = [
  { id: 'skull', name: 'Skull', description: 'Cranium, facial bones, mandible' },
  { id: 'vertebral_column', name: 'Vertebral Column', description: 'Cervical, thoracic, lumbar, sacrum' },
  { id: 'thoracic_cage', name: 'Thoracic Cage', description: 'Sternum, ribs, costal cartilages' },
  { id: 'shoulder_girdle', name: 'Shoulder Girdle', description: 'Clavicle, scapula' },
  { id: 'upper_limb', name: 'Upper Limb', description: 'Humerus, radius, ulna, carpals' },
  { id: 'pelvis', name: 'Pelvis', description: 'Hip bones (ilium, ischium, pubis)' },
  { id: 'lower_limb', name: 'Lower Limb', description: 'Femur, patella, tibia, fibula, tarsals' },
];

const MUSCULAR_REGIONS: RegionItem[] = [
  { id: 'head_neck', name: 'Head and Neck', description: 'SCM, facial expression, mastication' },
  { id: 'chest', name: 'Chest', description: 'Pectoralis major & minor, intercostals' },
  { id: 'back', name: 'Back', description: 'Trapezius, latissimus dorsi, erector spinae' },
  { id: 'abdomen', name: 'Abdomen', description: 'Rectus abdominis, obliques, transversus' },
  { id: 'shoulder', name: 'Shoulder', description: 'Deltoid, rotator cuff musculature' },
  { id: 'upper_arm', name: 'Upper Arm', description: 'Biceps brachii, triceps brachii, brachialis' },
  { id: 'forearm', name: 'Forearm', description: 'Flexor & extensor muscle compartments' },
  { id: 'hip_gluteal', name: 'Hip and Gluteal', description: 'Gluteus maximus, medius, minimus' },
  { id: 'thigh', name: 'Thigh', description: 'Quadriceps, hamstrings, adductors' },
  { id: 'leg', name: 'Lower Leg', description: 'Gastrocnemius, soleus, tibialis anterior' },
];

const CONNECTIVE_REGIONS: RegionItem[] = [
  { id: 'hand_wrist', name: 'Hand and Wrist', description: 'Flexor & extensor retinacula, palmar aponeurosis, digital pulleys, carpal ligaments' },
  { id: 'knee', name: 'Knee Joint', description: 'Patellar ligament, ACL, PCL, MCL, LCL, medial & lateral menisci' },
  { id: 'shoulder_arm', name: 'Shoulder and Elbow', description: 'Glenohumeral capsule, coracoacromial, coracoclavicular, UCL, RCL, annular ligament' },
  { id: 'pelvis_hip', name: 'Pelvis and Hip', description: 'Iliofemoral (Y-ligament), sacrotuberous, sacrospinous, inguinal ligament, pubic symphysis' },
  { id: 'ankle_foot', name: 'Ankle and Foot', description: 'Achilles tendon, ATFL, CFL, PTFL, deltoid ligament, plantar fascia' },
  { id: 'spine_trunk', name: 'Spine and Trunk', description: 'Anterior longitudinal ligament, supraspinous, 23 intervertebral discs' },
  { id: 'thoracic_cage', name: 'Thoracic Cage', description: 'Costal cartilages (1–10), sternocostal joints' },
  { id: 'head_neck', name: 'Head and Neck', description: 'TMJ joint capsule, galea aponeurotica, nuchal ligament' },
];

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  system,
  selectedRegion,
  onSelectRegion,
  onClose,
}) => {
  const regions = 
    system === 'skeletal' ? SKELETAL_REGIONS :
    system === 'muscular' ? MUSCULAR_REGIONS :
    CONNECTIVE_REGIONS;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 className="font-semibold text-white text-base">Filter by Anatomical Region</h3>
            <p className="text-xs text-slate-400 capitalize">{system} system</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Region List */}
        <div className="p-3 overflow-y-auto space-y-1.5 flex-1">
          {/* Show All Option */}
          <button
            onClick={() => {
              onSelectRegion(null);
              onClose();
            }}
            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
              selectedRegion === null
                ? 'bg-cyan-950/50 border-cyan-500/50 text-white'
                : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <div>
              <p className="font-medium text-sm">Full Body (All Regions)</p>
              <p className="text-xs text-slate-400">Display all anatomical structures for this system</p>
            </div>
            {selectedRegion === null && <Check size={18} className="text-cyan-400" />}
          </button>

          {regions.map((reg) => {
            const isSelected = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => {
                  onSelectRegion(reg.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-500/50 text-white'
                    : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div>
                  <p className="font-medium text-sm">{reg.name}</p>
                  <p className="text-xs text-slate-400">{reg.description}</p>
                </div>
                {isSelected && <Check size={18} className="text-cyan-400" />}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
