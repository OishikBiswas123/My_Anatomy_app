import { QuizQuestion } from '../types/anatomy';

export const ANATOMY_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz_1',
    type: 'multiple_choice',
    question: 'A 38-year-old tennis player experiences a sudden "pop" in the back of the ankle during sprint acceleration. The Thompson squeeze test is positive. Which connective tissue structure is ruptured?',
    system: 'connective',
    targetStructureId: 'connective_achilles_tendon',
    options: [
      { id: 'opt_1', text: 'Plantaris tendon', isCorrect: false },
      { id: 'opt_2', text: 'Calcaneal Tendon (Achilles Tendon)', isCorrect: true, explanation: 'The Achilles tendon is the thickest tendon in the body; rupture results in inability to plantarflex when the calf is squeezed (positive Thompson test).' },
      { id: 'opt_3', text: 'Iliotibial tract', isCorrect: false },
      { id: 'opt_4', text: 'Flexor hallucis longus tendon', isCorrect: false }
    ],
    explanation: 'The calcaneal (Achilles) tendon rupture typically occurs 2–6 cm proximal to the calcaneal tuberosity in a hypovascular watershed zone.'
  },
  {
    id: 'quiz_2',
    type: 'multiple_choice',
    question: 'A fracture of the humeral midshaft in the radial groove most commonly endangers which nerve?',
    system: 'skeletal',
    targetStructureId: 'bone_humerus',
    options: [
      { id: 'opt_1', text: 'Median nerve', isCorrect: false },
      { id: 'opt_2', text: 'Radial nerve', isCorrect: true, explanation: 'The radial nerve courses directly in the spiral (radial) groove along the midshaft humerus.' },
      { id: 'opt_3', text: 'Ulnar nerve', isCorrect: false },
      { id: 'opt_4', text: 'Axillary nerve', isCorrect: false }
    ],
    explanation: 'Midshaft humeral fractures can cause radial nerve neuropraxia or laceration, presenting clinically with wrist drop and loss of sensation over the dorsal first web space.'
  },
  {
    id: 'quiz_3',
    type: 'multiple_choice',
    question: 'Which muscle is the prime mover of arm abduction between 15° and 90°?',
    system: 'muscular',
    targetStructureId: 'muscle_deltoid',
    options: [
      { id: 'opt_1', text: 'Supraspinatus', isCorrect: false, explanation: 'Supraspinatus initiates abduction for the first 0°–15°.' },
      { id: 'opt_2', text: 'Deltoid (middle fibers)', isCorrect: true, explanation: 'The multipennate middle fibers of the deltoid power abduction from 15° to 90°.' },
      { id: 'opt_3', text: 'Pectoralis Major', isCorrect: false },
      { id: 'opt_4', text: 'Trapezius', isCorrect: false }
    ],
    explanation: 'While the supraspinatus initiates abduction (0°–15°), the middle fibers of the deltoid are the prime mover between 15° and 90°.'
  },
  {
    id: 'quiz_4',
    type: 'multiple_choice',
    question: 'Which connective tissue structures prolong the anterior ends of the ribs and provide thoracic wall elasticity during respiration?',
    system: 'connective',
    targetStructureId: 'connective_costal_cartilage',
    options: [
      { id: 'opt_1', text: 'Costal Cartilages', isCorrect: true, explanation: 'Costal cartilages are hyaline cartilage bars connecting the true ribs (1–7) to the sternum.' },
      { id: 'opt_2', text: 'Intervertebral discs', isCorrect: false },
      { id: 'opt_3', text: 'Galea aponeurotica', isCorrect: false },
      { id: 'opt_4', text: 'Linea alba', isCorrect: false }
    ],
    explanation: 'Costal cartilages provide the elastic compliance necessary for thoracic expansion during tidal and forced ventilation. Inflammation here presents clinically as costochondritis.'
  },
  {
    id: 'quiz_5',
    type: 'multiple_choice',
    question: 'A 45-year-old patient presents with severe sciatica radiating down the posterolateral leg. An MRI reveals a herniated nucleus pulposus compressing the traversing L5 nerve root. What anatomical structure has ruptured?',
    system: 'connective',
    targetStructureId: 'connective_intervertebral_discs',
    options: [
      { id: 'opt_1', text: 'Ligamentum flavum', isCorrect: false },
      { id: 'opt_2', text: 'Anulus fibrosus of the Intervertebral Disc', isCorrect: true, explanation: 'Disc herniation occurs when the outer anulus fibrosus tears, allowing gelatinous nucleus pulposus to escape and impinge upon nerve roots.' },
      { id: 'opt_3', text: 'Supraspinous ligament', isCorrect: false },
      { id: 'opt_4', text: 'Linea alba', isCorrect: false }
    ],
    explanation: 'The intervertebral disc is a fibrocartilaginous symphysis. Weakness in the posterior anulus fibrosus permits posterolateral herniation of the central nucleus pulposus.'
  }
];
