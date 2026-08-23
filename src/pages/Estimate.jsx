import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Space, Modal, List, message, Tag, Spin } from "antd";
import { DownloadOutlined, PlusOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, SaveOutlined, UnorderedListOutlined, EditOutlined, SearchOutlined, FileAddOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";

// ===== OFFICIAL FIREBASE CONFIG - SAME AS YOUR FILE =====
const firebaseConfig = {
  apiKey: "AIzaSyAzY9Sv9Q65ebYibN3jIN2NhPJTJEWbHR8",
  authDomain: "urbane-living-official.firebaseapp.com",
  projectId: "urbane-living-official",
  storageBucket: "urbane-living-official.firebasestorage.app",
  messagingSenderId: "777138287080",
  appId: "1:777138287080:web:8483bbed0858a809f5f45d",
  measurementId: "G-0KFM320JYM"
};

const secondaryAppName = "urbaneLivingOfficialEstimate";
const existingApp = getApps().find(a => a.name === secondaryAppName);
const app = existingApp ? existingApp : initializeApp(firebaseConfig, secondaryAppName);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const ALLOWED_EMAILS = [
  "digvijay@urbaneliving.in",
  "abhishek@urbaneliving.in",
  "vibhooti@urbaneliving.in",
  "sales1@urbaneliving.in",
  "accounts@urbaneliving.in",
  "electrical@urbaneliving.in",
  "sales2@urbaneliving.in",
  "it@urbaneliving.in",
  "design1@urbaneliving.in",
  "electrician@urbaneliving.in",
  "sales3@urbaneliving.in",
  "askabhi139@gmail.com",
  "jhas08387@gmail.com"
].map(e => e.toLowerCase());

const EstimatePage = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editLogs, setEditLogs] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [searchEditable, setSearchEditable] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && ALLOWED_EMAILS.includes(u.email.toLowerCase())) {
        setUser(u);
      } else if (u) {
        message.error(`Access Denied: ${u.email} not allowed`);
        signOut(auth);
        setUser(null);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const doLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      if (!ALLOWED_EMAILS.includes(res.user.email.toLowerCase())) {
        message.error("This Email is not authorised");
        await signOut(auth);
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  const componentRef = useRef();

  const getCounter = () => {
    return parseInt(localStorage.getItem("estimateCounter_RFIUL") || "226");
  };

  const getEstimateNo = () => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const counter = getCounter();
    return `RFIUL${mm}${dd}${counter}`;
  };

  const incrementEstimateNo = () => {
    let counter = getCounter();
    counter += 1;
    localStorage.setItem("estimateCounter_RFIUL", counter);
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `RFIUL${mm}${dd}${counter}`;
  };

  const [client, setClient] = useState({ name: "", address: "" });
  const [estimateNo, setEstimateNo] = useState(getEstimateNo());
  const [estimateDate] = useState(
    new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
  );

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "KITCHEN RENNOVATION",
      items: [
        { id: 1, name: "Kitchen:- Counter Top - Supply and installation of kitchen counter top with Natural Granite slab or alternative as specified, including required adhesive, cutting, edge finishing, transportation and installation labour. Base specification as per the agreed kitchen scope and approved design.", area: "60", unit: "Sft", amount: "" },
        { id: 2, name: "Kitchen:- Hardware & Basic Fitment - Supply and installation of all required kitchen hardware and basic fitments, including soft-close hinges/channels, drawer channels, bottle pull-out, handles and other necessary hardware/accessories required for proper functioning of the modular kitchen units. Hardware to be selected and finalised as per the approved kitchen layout and design.", area: "LM", unit: "LM", amount: "" },
        { id: 3, name: "Kitchen:- Cabinet's(lower cabinet, upper head cabinet, loft area and tall unit + Utility + Washing area cabinet in balcony area)", area: "122", unit: "Sft", amount: "" },
        { id: 4, name: "Kitchen Dado Area:- Counter back splash area tile", area: "50", unit: "Sft", amount: "" },
        { id: 5, name: "Breakfast Counter - Design, fabrication and installation of a customised breakfast counter as per the approved kitchen layout, including counter slab, supporting structure/carcass, required storage (if applicable), edge finishing, hardware, and complete installation labour. Final size, material, finish and detailing to be as per approved design and site measurements.", area: "LM", unit: "LM", amount: "" },
        { id: 6, name: "Balcony Covering with Powder-Coated Aluminium & 6mm Glass - Supply and installation of balcony covering using powder-coated aluminium framing with 6mm glass, including required aluminium sections, glass panels, channels, fittings, fasteners, sealant and complete installation labour. The structure shall be properly aligned, levelled and", area: "LM", unit: "LM", amount: "" }
      ]
    },
    {
      id: 2,
      title: "LIVING ROOM + BALCONY AREA",
      items: [
        { id: 1, name: "Puja Unit - Design, fabrication and installation of a customised wooden Puja unit as per the approved design, including required storage, back panel, decorative elements, lighting provisions, hardware and final finishing. The unit shall be executed as per the approved layout and site measurements, with the final material and finish mutually agreed during design finalisation.", area: "LM", unit: "LM", amount: "" },
        { id: 2, name: "TV Unit for Living Area - Design, fabrication and installation of a customised TV unit for the living area, including TV back panel, lower storage cabinets/drawers, required open or closed storage, hardware, channels, handles, edge finishing and complete installation labour. The unit shall be designed as per the approved living room layout, site measurements and overall interior design theme.", area: "81", unit: "Sft", amount: "" },
        { id: 3, name: "Crockery Unit for Living Area - Design, fabrication and installation of a customised crockery/display unit for the living and dining area, including suitable storage cabinets, drawers, open display niches/shelves, shutters, required hardware and complete finishing. The size, internal storage configuration, material, laminate/finish and detailing shall be finalised as per the approved design and site measurements.", area: "81", unit: "Sft", amount: "" },
        { id: 4, name: "Balcony covering with UPVC - Design, supply and installation of UPVC sliding/fixed frame system with toughened glass panels (5mm–6mm) for living balcony. Scope includes UPVC profiles (colour as per Owner's approval), multi point locking hardware, smooth rollers, silicone weather-sealing, mosquito mesh track, removal of existing glazing, and complete labour. System to be weather-tight and operationally smooth. Manufacturer's warranty + 12-month workmanship liability included.", area: "218", unit: "Sft", amount: "" }
      ]
    },
    {
      id: 3,
      title: "MASTER BEDROOM + BATHROOM + BALCONY",
      items: [
        { id: 1, name: "Bed back wall design + T.V. Panel - Design, fabrication and installation of customised bed back wall with integrated T.V. panel, including MDF/ply base, wallpaper/louver/panel finishes as per approved design, concealed wiring provisions for TV and accessories, decorative trim/mouldings, backlighting/cove light provisions, edge finishing, necessary hardware and complete installation labour. The unit shall be designed to create a cohesive feature wall behind the bed with a dedicated recessed/flush-mounted TV panel, as per site measurements and Owner's finalised design. 12-month workmanship warranty included.", area: "LM", unit: "LM", amount: "" },
        { id: 2, name: "Walking closet - Design, fabrication and installation of a walk-in wardrobe configuration, including full-height wardrobes with internal partitions, shelves, hanging rods, loft storage, drawer units, soft-close hardware, internal lighting provisions, back panels, edge finishing, complete installation labour, and camouflage/concealed door finish where applicable. The layout and internal storage configuration shall be detailed and approved by the Owner before fabrication, with provisions for both hanging and folded storage as per site measurements. 12-month workmanship warranty + 10-year wooden & hardware service included.", area: "LM", unit: "LM", amount: "" },
        { id: 3, name: "Full bathroom renovation (Master bedroom bathroom only) - Complete demolition, removal and disposal of existing tiles, sanitaryware, CP fittings, plumbing lines and old fixtures. Scope includes full wall and floor waterproofing (Dr. Fixit/Sika system with 48-hr ponding test), new vitrified tile flooring (2'x2') and wall tiling (2'x4'), 10mm toughened glass shower partition, Jaquar mid range sanitaryware and CP fittings (wall-mounted WC, cistern, overhead shower, diverter with handle+tap, basin, basin tap, health faucet, bottle trap - 3 sets), storage unit above WC, exhaust fan installation, geyser shifting into shaft, and complete plumbing. All materials and labour are included in this line item. Final tile, CP and sanitaryware selections to be approved in writing by the Owner before ordering 12-month workmanship + manufacturer warranties passed through at handover.", area: "LM", unit: "LM", amount: "" },
        { id: 4, name: "Balcony vertical garden - Design, supply and installation of a vertical garden system on the designated master balcony wall, including modular planter panels/pockets or trellis framework, drip irrigation/drainage layer, growing medium, and selected live/artificial plantation as per Owner's final choice. Final layout, planter type and plantation selection to be approved in writing by the Owner before execution. 12-month workmanship warranty included.", area: "LM", unit: "LM", amount: "" }
      ]
    },
    {
      id: 4,
      title: "KIDS BEDROOM",
      items: [
        { id: 1, name: "Customised Bed with Study Table & Bed Back Wall Design - Kids Room - Design, fabrication and installation of a customised kids-room bed integrated with a study table and required storage, along with a customised bed back wall design. The scope includes bed structure, study table, overhead/side storage as required, back panel, decorative elements, required hardware and complete finishing. The design, dimensions, material, laminate/finish and storage configuration shall be finalised as per the approved layout and site measurements", area: "114", unit: "Sft", amount: "" },
        { id: 2, name: "Wardrobe - Design, fabrication and installation of a customised wardrobe unit as per the approved layout, including HDHMR/Ply carcass, laminate finish (outer) and inner mica finish, soft-close hinges and channels, hanging rods, shelves, drawers, loft storage, concealed handles or pull profiles, edge banding, back panels, complete installation labour, and internal lighting provisions where required. The unit shall be designed to maximise storage as per site measurements and the Owner's storage requirements. Final design, internal configuration, material and finish to be approved in writing by the Owner before fabrication. 12 month workmanship + 10 year wooden & hardware service included", area: "42", unit: "Sft", amount: "" },
        { id: 3, name: "Complete Bathroom Renovation - Kids Room Complete renovation of bathroom, including demolition/removal of existing finishes, new floor and wall tiles, waterproofing, sanitaryware, CP fittings, shower, basin, WC, required plumbing and installation labour, with all necessary bathroom fitments. jaguar (medium range)", area: "1", unit: "No", amount: "" }
      ]
    },
    {
      id: 5,
      title: "GUEST BEDROOM",
      items: [
        { id: 1, name: "Bay Window with Storage & Sitting + Bed Back Wall Design - Guest Room - Design, fabrication and installation of a customised bay window sealing unit with integrated sitting, comfortable sitting provision, storage cabinets/drawers below, required hardware and complete finishing. The scope also includes a customised bed back wall design with decorative panels/wall treatment as per the approved interior theme. Final dimensions, material, storage arrangement, upholstery and finishes shall be as per the approved design and site measurements.", area: "90", unit: "Sft", amount: "" },
        { id: 2, name: "Wardrobe - Design, fabrication and installation of a customised wardrobe unit as per the approved layout, including HDHMR/Ply carcass, laminate finish (outer) and inner mica finish, soft-close hinges and channels, hanging rods, shelves, drawers, loft storage, with specified handles, edge banding, back panels, complete installation labour, and internal lighting provisions where required. The unit shall be designed to maximise storage as per site measurements and the Owner's storage requirements. Final design, internal configuration, material and finish to be approved in writing by the Owner before fabrication. 12 month workmanship + 10 year wooden & hardware service included.", area: "40", unit: "Sft", amount: "" },
        { id: 3, name: "Common Bathroom - Complete renovation bathroom, including demolition/removal of existing finishes, new floor and wall tiles, waterproofing, sanitaryware, CP fittings, shower, basin, WC, required plumbing and installation labour, with all necessary bathroom fitments.", area: "LM", unit: "LM", amount: "" }
      ]
    },
    {
      id: 6,
      title: "ENTRY WAY",
      items: [
        { id: 1, name: "Entry way shoe rack - Design, fabrication and installation of a covered shoe rack unit outside the flat entrance door, including ply/HDHMR carcass with laminate finish, ventilated shutters, soft-close hardware, shelves angled for easy access, back panel, edge finishing, and complete installation labour. The unit will be designed to maximise shoe storage while complementing the entrance aesthetics, as per site measurements and the Owner's approved design. Final size, design, material and finish to be approved in writing by the Owner before fabrication. 12-month workmanship + 10 year wooden & hardware service included.", area: "LM", unit: "LM", amount: "" },
        { id: 2, name: "Key Hanging Unit for Entry Area - Design, fabrication and installation of a customised key hanging unit at the entry area, including a decorative back panel, key hooks/holders, small storage compartment/shelf and required hardware. The unit shall be designed to provide convenient key storage while complementing the overall entrance décor, with material, finish, size and detailing as per the approved design and site measurements", area: "LM", unit: "LM", amount: "" }
      ]
    },
    {
      id: 7,
      title: "ELECTRICAL",
      items: [
        { id: 1, name: "Whole house electrical will be done, which include's wall and ceiling electrical wiring of all 3 bedrooms, 1 bathroom's, 3 balcony's, living room, kitchen and utility area & entry way area and wherever it is required.", area: "1500", unit: "Sft", amount: "" },
        { id: 2, name: "Whole house switch boards will be done, which include's wall and ceiling electrical of all 3 bedrooms, 1 bathroom's, 3 balcony's, living room, kitchen and utility area & entry way area and wherever it is required.", area: "1500", unit: "Sft", amount: "" },
        { id: 3, name: "Whole house lighting with will have ceiling lights, wall lights and pannel lights if needed will be done, which include's wall and ceiling electrical of all 3 bedroom's, 1 bathroom's, 3 balcony's, living room, kitchen and utility area & entry way area and wherever it is required. Excluding decorative lights and cendialiars", area: "1500", unit: "Sft", amount: "" }
      ]
    },
    {
      id: 8,
      title: "PAINT AND WALLPAPER",
      items: [
        { id: 1, name: "Royal paint's - Surface preparation and application of Asian Royale / Royale Luxury Emulsion or equivalent premium paint system on all internal walls and ceilings (house-wide), including primer coat (1 coat) and two top coats of Royal paint, with putty/filler application, sanding, surface smoothing, edge culling, masking, and complete labour. Scope includes all internal walls and ceiling areas as per site measurements (measured at actuals, capped at ±5% of BOQ quantity). Final shade selection to be approved in writing by the Owner before application, with sample patch approved on site. 12-month workmanship included.", area: "LM", unit: "LM", amount: "" }
      ]
    },
    {
      id: 9,
      title: "DOOR'S",
      items: [
        { id: 1, name: "Main S.S door - main stainless steel door with rust-proof for entrance made from premium SS steel finishes, with specified modern style, robust security with heavy-duty locks.", area: "LM", unit: "LM", amount: "" }
      ]
    },
    {
      id: 10,
      title: "GYPROC FALSE CEILING",
      items: [
        { id: 1, name: "GYPROC FALSE CEILING - Design, fabrication and installation of Cyproc false ceiling throughout the entire house, covering 3 bedrooms, 3 balconies, living room, dining area, kitchen and utility area. Scope includes Gypsum boards with side coves, recessed/profile light provisions, GI channel framework, edge detailing, and complete installation labour Final ceiling design, layout and lighting recess positions to be approved in writing by the Owner before execution. 12-month workmanship warranty included.", area: "LM", unit: "LM", amount: "" }
      ]
    },
    {
      id: 11,
      title: "OTHER WORK",
      items: [
        { id: 1, name: "All Door Laminate Change with Locks & Hardware - Replacement of laminate/finish on all existing doors, including necessary preparation, new laminate application, replacement/provision of required locks, handles and associated door hardware. 6 Nos. doors @ 12,500 per door", area: "6", unit: "Nos", amount: "" },
        { id: 2, name: "Floor Tile Change - Living Room, Kitchen & Kitchen Balcony - Removal of existing flooring and supply & installation of new floor tiles in the living room, kitchen and kitchen balcony areas, including necessary laying labour and associated work", area: "600", unit: "Sft", amount: "" },
        { id: 3, name: "AC Pipe Installation - Complete AC piping work including required refrigerant/copper piping, drainage arrangement, necessary material, accessories and labour for installation.", area: "52", unit: "Rmt", amount: "" }
      ]
    }
  ]);

  const [specs, setSpecs] = useState([
    { id: 1, cat: "Electrical", detail: "Wires and cables: Polycab, Havells, Finolex, KEI\nLights and Panel lights and Cove lights: Polycab and Havells\nSwitch and socket: Havells, Crabtree, Cona" },
    { id: 2, cat: "Wooden Work", detail: "HDHMR board / ply brand: Century, Actiontesa" },
    { id: 3, cat: "Hardware", detail: "Kitchen hardware and fitmate: Hettich, Ozone, Samsung Irex" },
    { id: 4, cat: "UPVC Window", detail: "Cora, simta, prominance" },
    { id: 5, cat: "Door Lock and Hardware", detail: "Jolly or Dorset" },
    { id: 6, cat: "Paint", detail: "Asian, ICI Dulux" },
    { id: 7, cat: "Tiles for Floor and Bathroom", detail: "Kajaria, Nitco, Somany" },
    { id: 8, cat: "False Ceiling", detail: "Saint-Gobain Gyproc" },
    { id: 9, cat: "AC Copper Piping", detail: "TATA, Malaysia Copper Pipes" }
  ]);

  const [terms, setTerms] = useState([
    { id: 1, label: "A", text: 'Ref to Project contract file name "Mohit_Seelam_Contract_30_69_Lakh_Complete_Final"' },
    { id: 2, label: "B", text: "GST 18% as per government norms Extra. (Inclusive as per contract)" },
    { id: 3, label: "C", text: "The final cost could vary depending on your location, specific material choice and complexity of the installation." },
    { id: 4, label: "D", text: "Design Authority – Designer proposes; Owner holds FINAL design and finalisation authority on all items. No fabrication/ordering before Owner's written approval." },
    { id: 5, label: "E", text: "Warranty – 12-month workmanship/defect liability + 10-year wooden & hardware service + manufacturer warranties passed through at handover." },
    { id: 6, label: "F", text: "Timeline – Total 120 days from DAY 1 of Execution, Work delivery by Day 120 (Subject to normal condition); snag closure and key handover by Day 120. Delay deduction (tolerance 10%): 0.5% per week, capped at 5%." },
    { id: 7, label: "G", text: "Refund Policy – No Refund shall be entertained while stoppage of work by Client or any authority." },
    { id: 8, label: "H", text: "Location & Execution – Service area: Gurugram, Noida, Delhi, Ghaziabad. Subject to builder/maintenance fit-out approval wherever required (Designer to obtain)." },
    { id: 9, label: "I", text: "Any design changes after work starts may incur additional charges." },
    { id: 10, label: "J", text: "Customer must provide electricity and confirm all electrical/lighting points before installation." },
    { id: 11, label: "K", text: "Malwa disposal, and other miscellaneous charges are extra unless specifically mentioned." },
    { id: 12, label: "L", text: "The company is not liable for delays or issues arising from site conditions or customer-side requirements." }
  ]);

  const [savedEstimates, setSavedEstimates] = useState([]);
  const [updatedEstimates, setUpdatedEstimates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const formatAddress = (addr) => {
    if (!addr) return "";
    const words = addr.split(" ");
    if (words.length <= 8) return addr;
    return (<>{words.slice(0, 8).join(" ")}<br />{words.slice(8).join(" ")}</>);
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Urbane_Living_Estimate",
    onBeforeGetContent: async () => { await new Promise((r) => setTimeout(r, 80)); },
    pageStyle: `@page { size: A4; margin: 10mm; } body { -webkit-print-color-adjust: exact; } .no-print { display: none!important; } .print-only { display: block!important; border: none!important; font-size: 12.5px!important; }`,
  });

  const addLog = (action) => {
    const logEntry = {
      time: new Date().toLocaleString("en-IN"),
      date: new Date().toISOString(),
      user_id: user?.email || "unknown",
      user_name: user?.displayName || user?.email,
      action: action,
      estimateNo: estimateNo
    };
    const updatedLogs = [logEntry, ...editLogs];
    setEditLogs(updatedLogs);
    return updatedLogs;
  };

  const updateSectionTitle = (sectionIdx, newTitle) => {
    if (!isEditing) return;
    const updated = [...sections];
    updated[sectionIdx].title = newTitle;
    setSections(updated);
    addLog(`Edited Section Title: ${newTitle}`);
  };

  const updateItemField = (sectionIdx, itemIdx, field, val) => {
    if (!isEditing) return;
    const updated = [...sections];
    updated[sectionIdx].items[itemIdx][field] = val;
    setSections(updated);
  };

  const addSection = () => {
    if (!isEditing) { message.warning("Click Edit button first"); return; }
    setSections([...sections, { id: Date.now(), title: "NEW SECTION TITLE", items: [{ id: Date.now(), name: "New Item Description", area: "0", unit: "Sft", amount: "" }] }]);
    addLog("Added New Section");
  };

  const removeSection = (sectionIdx) => {
    if (!isEditing) return;
    const updated = sections.filter((_, idx) => idx !== sectionIdx);
    setSections(updated);
    addLog(`Deleted Section: ${sections[sectionIdx].title}`);
  };

  const moveSection = (index, direction) => {
    if (!isEditing) return;
    const newSections = [...sections];
    const target = index + direction;
    if (target < 0 || target >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[target];
    newSections[target] = temp;
    setSections(newSections);
  };

  const addItemToSection = (sectionIdx) => {
    if (!isEditing) return;
    const updated = [...sections];
    updated[sectionIdx].items.push({ id: Date.now(), name: "New Item Description", area: "0", unit: "Sft", amount: "" });
    setSections(updated);
    addLog(`Added Item in ${sections[sectionIdx].title}`);
  };

  const removeItemFromSection = (sectionIdx, itemIdx) => {
    if (!isEditing) return;
    const updated = [...sections];
    updated[sectionIdx].items = updated[sectionIdx].items.filter((_, idx) => idx !== itemIdx);
    setSections(updated);
    addLog(`Removed Item from ${sections[sectionIdx].title}`);
  };

  const updateSpecField = (specIdx, field, val) => {
    if (!isEditing) return;
    const updated = [...specs];
    updated[specIdx][field] = val;
    setSpecs(updated);
    addLog(`Edited Spec: ${updated[specIdx].cat}`);
  };

  const addSpecItem = () => {
    if (!isEditing) { message.warning("Click Edit first"); return; }
    setSpecs([...specs, { id: Date.now(), cat: "New Category", detail: "Specification details here" }]);
    addLog("Added New Spec");
  };

  const removeSpecItem = (specIdx) => {
    if (!isEditing) return;
    const cat = specs[specIdx].cat;
    setSpecs(specs.filter((_, idx) => idx !== specIdx));
    addLog(`Deleted Spec: ${cat}`);
  };

  const updateTermField = (termIdx, val) => {
    if (!isEditing) return;
    const updated = [...terms];
    updated[termIdx].text = val;
    setTerms(updated);
  };
  const addTermItem = () => {
    if (!isEditing) return;
    const nextLetter = String.fromCharCode(65 + terms.length);
    setTerms([...terms, { id: Date.now(), label: nextLetter, text: "New term details here" }]);
  };
  const removeTermItem = (termIdx) => {
    if (!isEditing) return;
    setTerms(terms.filter((_, idx) => idx !== termIdx));
  };

  const fetchAllEstimates = async () => {
    setLoadingData(true);
    try {
      const q1 = query(collection(db, "ul_estimates_original"), orderBy("createdAt", "desc"));
      const q2 = query(collection(db, "ul_estimates_updated"), orderBy("createdAt", "desc"));
      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      const originals = snap1.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
      const updated = snap2.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
      setSavedEstimates(originals);
      setUpdatedEstimates(updated);
    } catch (e) {
      console.error(e);
      message.error("Firestore read failed - Check Firestore Rules: " + e.message);
    }
    setLoadingData(false);
  };

  const saveEstimateToStorage = async () => {
    try {
      const newEstimateNo = incrementEstimateNo();
      const finalLogs = addLog(`Saved Original Estimate ${newEstimateNo}`);
      const record = {
        id: Date.now(),
        estimateNo: newEstimateNo,
        originalEstimateNo: newEstimateNo,
        estimateDate,
        client,
        sections,
        specs,
        terms,
        editLogs: finalLogs,
        createdBy: user?.email,
        grandTotal: grandTotal > 0 ? `₹${grandTotal.toLocaleString("en-IN")}` : "As Actual",
        isOriginal: true,
        createdAt: serverTimestamp()
      };
      await addDoc(collection(db, "ul_estimates_original"), record);
      setEstimateNo(newEstimateNo);
      setEditLogs(finalLogs);
      setIsEditing(false);
      message.success(`Original ${newEstimateNo} saved! All users can see now.`);
      fetchAllEstimates();
    } catch (e) {
      message.error("Save failed: " + e.message);
    }
  };

  const saveEditedEstimate = async () => {
    try {
      const finalLogs = addLog(`Updated ${estimateNo} by ${user?.email}`);
      const prevForThis = updatedEstimates.filter(e => e.originalEstimateNo === estimateNo || e.estimateNo === estimateNo).flatMap(e => e.editLogs || []);
      const originalRec = savedEstimates.find(e => e.estimateNo === estimateNo);
      const originalLogs = originalRec?.editLogs || [];
      const fullHistoryLogs = [...finalLogs, ...prevForThis, ...originalLogs];

      const record = {
        id: Date.now(),
        estimateNo: estimateNo,
        originalEstimateNo: estimateNo,
        estimateDate,
        client,
        sections,
        specs,
        terms,
        editLogs: fullHistoryLogs,
        createdBy: user?.email,
        updatedBy: user?.email,
        updatedAt: new Date().toISOString(),
        grandTotal: grandTotal > 0 ? `₹${grandTotal.toLocaleString("en-IN")}` : "As Actual",
        isEdited: true,
        version: updatedEstimates.filter(e => e.originalEstimateNo === estimateNo).length + 1,
        createdAt: serverTimestamp()
      };
      await addDoc(collection(db, "ul_estimates_updated"), record);
      setEditLogs(fullHistoryLogs);
      setIsEditing(false);
      message.success(`Updated V${record.version} saved! All users can see history.`);
      fetchAllEstimates();
    } catch (e) {
      message.error("Update failed: " + e.message);
    }
  };

  const handleNewBlankEstimate = () => {
    Modal.confirm({
      title: "Create New Blank Estimate?",
      content: "Current data will be cleared and new Estimate No generated. Unsaved changes will be lost.",
      okText: "Yes, Create New",
      onOk: () => {
        setClient({ name: "", address: "" });
        const freshSections = JSON.parse(JSON.stringify([
          { id: 1, title: "KITCHEN RENNOVATION", items: [{ id: 1, name: "Kitchen:- Counter Top - Supply and installation of kitchen counter top with Natural Granite slab or alternative as specified, including required adhesive, cutting, edge finishing, transportation and installation labour. Base specification as per the agreed kitchen scope and approved design.", area: "60", unit: "Sft", amount: "" }, { id: 2, name: "Kitchen:- Hardware & Basic Fitment - Supply and installation of all required kitchen hardware and basic fitments, including soft-close hinges/channels, drawer channels, bottle pull-out, handles and other necessary hardware/accessories required for proper functioning of the modular kitchen units. Hardware to be selected and finalised as per the approved kitchen layout and design.", area: "LM", unit: "LM", amount: "" }, { id: 3, name: "Kitchen:- Cabinet's(lower cabinet, upper head cabinet, loft area and tall unit + Utility + Washing area cabinet in balcony area)", area: "122", unit: "Sft", amount: "" }, { id: 4, name: "Kitchen Dado Area:- Counter back splash area tile", area: "50", unit: "Sft", amount: "" }, { id: 5, name: "Breakfast Counter - Design, fabrication and installation of a customised breakfast counter as per the approved kitchen layout, including counter slab, supporting structure/carcass, required storage (if applicable), edge finishing, hardware, and complete installation labour. Final size, material, finish and detailing to be as per approved design and site measurements.", area: "LM", unit: "LM", amount: "" }, { id: 6, name: "Balcony Covering with Powder-Coated Aluminium & 6mm Glass - Supply and installation of balcony covering using powder-coated aluminium framing with 6mm glass, including required aluminium sections, glass panels, channels, fittings, fasteners, sealant and complete installation labour. The structure shall be properly aligned, levelled and", area: "LM", unit: "LM", amount: "" }] },
          { id: 2, title: "LIVING ROOM + BALCONY AREA", items: [{ id: 1, name: "Puja Unit - Design, fabrication and installation of a customised wooden Puja unit as per the approved design, including required storage, back panel, decorative elements, lighting provisions, hardware and final finishing. The unit shall be executed as per the approved layout and site measurements, with the final material and finish mutually agreed during design finalisation.", area: "LM", unit: "LM", amount: "" }, { id: 2, name: "TV Unit for Living Area - Design, fabrication and installation of a customised TV unit for the living area, including TV back panel, lower storage cabinets/drawers, required open or closed storage, hardware, channels, handles, edge finishing and complete installation labour. The unit shall be designed as per the approved living room layout, site measurements and overall interior design theme.", area: "81", unit: "Sft", amount: "" }, { id: 3, name: "Crockery Unit for Living Area - Design, fabrication and installation of a customised crockery/display unit for the living and dining area, including suitable storage cabinets, drawers, open display niches/shelves, shutters, required hardware and complete finishing. The size, internal storage configuration, material, laminate/finish and detailing shall be finalised as per the approved design and site measurements.", area: "81", unit: "Sft", amount: "" }, { id: 4, name: "Balcony covering with UPVC - Design, supply and installation of UPVC sliding/fixed frame system with toughened glass panels (5mm–6mm) for living balcony. Scope includes UPVC profiles (colour as per Owner's approval), multi point locking hardware, smooth rollers, silicone weather-sealing, mosquito mesh track, removal of existing glazing, and complete labour. System to be weather-tight and operationally smooth. Manufacturer's warranty + 12-month workmanship liability included.", area: "218", unit: "Sft", amount: "" }] },
          { id: 3, title: "MASTER BEDROOM + BATHROOM + BALCONY", items: [{ id: 1, name: "Bed back wall design + T.V. Panel - Design, fabrication and installation of customised bed back wall with integrated T.V. panel, including MDF/ply base, wallpaper/louver/panel finishes as per approved design, concealed wiring provisions for TV and accessories, decorative trim/mouldings, backlighting/cove light provisions, edge finishing, necessary hardware and complete installation labour. The unit shall be designed to create a cohesive feature wall behind the bed with a dedicated recessed/flush-mounted TV panel, as per site measurements and Owner's finalised design. 12-month workmanship warranty included.", area: "LM", unit: "LM", amount: "" }, { id: 2, name: "Walking closet - Design, fabrication and installation of a walk-in wardrobe configuration, including full-height wardrobes with internal partitions, shelves, hanging rods, loft storage, drawer units, soft-close hardware, internal lighting provisions, back panels, edge finishing, complete installation labour, and camouflage/concealed door finish where applicable. The layout and internal storage configuration shall be detailed and approved by the Owner before fabrication, with provisions for both hanging and folded storage as per site measurements. 12-month workmanship warranty + 10-year wooden & hardware service included.", area: "LM", unit: "LM", amount: "" }, { id: 3, name: "Full bathroom renovation (Master bedroom bathroom only) - Complete demolition, removal and disposal of existing tiles, sanitaryware, CP fittings, plumbing lines and old fixtures. Scope includes full wall and floor waterproofing (Dr. Fixit/Sika system with 48-hr ponding test), new vitrified tile flooring (2'x2') and wall tiling (2'x4'), 10mm toughened glass shower partition, Jaquar mid range sanitaryware and CP fittings (wall-mounted WC, cistern, overhead shower, diverter with handle+tap, basin, basin tap, health faucet, bottle trap - 3 sets), storage unit above WC, exhaust fan installation, geyser shifting into shaft, and complete plumbing. All materials and labour are included in this line item. Final tile, CP and sanitaryware selections to be approved in writing by the Owner before ordering 12-month workmanship + manufacturer warranties passed through at handover.", area: "LM", unit: "LM", amount: "" }, { id: 4, name: "Balcony vertical garden - Design, supply and installation of a vertical garden system on the designated master balcony wall, including modular planter panels/pockets or trellis framework, drip irrigation/drainage layer, growing medium, and selected live/artificial plantation as per Owner's final choice. Final layout, planter type and plantation selection to be approved in writing by the Owner before execution. 12-month workmanship warranty included.", area: "LM", unit: "LM", amount: "" }] },
          { id: 4, title: "KIDS BEDROOM", items: [{ id: 1, name: "Customised Bed with Study Table & Bed Back Wall Design - Kids Room - Design, fabrication and installation of a customised kids-room bed integrated with a study table and required storage, along with a customised bed back wall design. The scope includes bed structure, study table, overhead/side storage as required, back panel, decorative elements, required hardware and complete finishing. The design, dimensions, material, laminate/finish and storage configuration shall be finalised as per the approved layout and site measurements", area: "114", unit: "Sft", amount: "" }, { id: 2, name: "Wardrobe - Design, fabrication and installation of a customised wardrobe unit as per the approved layout, including HDHMR/Ply carcass, laminate finish (outer) and inner mica finish, soft-close hinges and channels, hanging rods, shelves, drawers, loft storage, concealed handles or pull profiles, edge banding, back panels, complete installation labour, and internal lighting provisions where required. The unit shall be designed to maximise storage as per site measurements and the Owner's storage requirements. Final design, internal configuration, material and finish to be approved in writing by the Owner before fabrication. 12 month workmanship + 10 year wooden & hardware service included", area: "42", unit: "Sft", amount: "" }, { id: 3, name: "Complete Bathroom Renovation - Kids Room Complete renovation of bathroom, including demolition/removal of existing finishes, new floor and wall tiles, waterproofing, sanitaryware, CP fittings, shower, basin, WC, required plumbing and installation labour, with all necessary bathroom fitments. jaguar (medium range)", area: "1", unit: "No", amount: "" }] },
          { id: 5, title: "GUEST BEDROOM", items: [{ id: 1, name: "Bay Window with Storage & Sitting + Bed Back Wall Design - Guest Room - Design, fabrication and installation of a customised bay window sealing unit with integrated sitting, comfortable sitting provision, storage cabinets/drawers below, required hardware and complete finishing. The scope also includes a customised bed back wall design with decorative panels/wall treatment as per the approved interior theme. Final dimensions, material, storage arrangement, upholstery and finishes shall be as per the approved design and site measurements.", area: "90", unit: "Sft", amount: "" }, { id: 2, name: "Wardrobe - Design, fabrication and installation of a customised wardrobe unit as per the approved layout, including HDHMR/Ply carcass, laminate finish (outer) and inner mica finish, soft-close hinges and channels, hanging rods, shelves, drawers, loft storage, with specified handles, edge banding, back panels, complete installation labour, and internal lighting provisions where required. The unit shall be designed to maximise storage as per site measurements and the Owner's storage requirements. Final design, internal configuration, material and finish to be approved in writing by the Owner before fabrication. 12 month workmanship + 10 year wooden & hardware service included.", area: "40", unit: "Sft", amount: "" }, { id: 3, name: "Common Bathroom - Complete renovation bathroom, including demolition/removal of existing finishes, new floor and wall tiles, waterproofing, sanitaryware, CP fittings, shower, basin, WC, required plumbing and installation labour, with all necessary bathroom fitments.", area: "LM", unit: "LM", amount: "" }] },
          { id: 6, title: "ENTRY WAY", items: [{ id: 1, name: "Entry way shoe rack - Design, fabrication and installation of a covered shoe rack unit outside the flat entrance door, including ply/HDHMR carcass with laminate finish, ventilated shutters, soft-close hardware, shelves angled for easy access, back panel, edge finishing, and complete installation labour. The unit will be designed to maximise shoe storage while complementing the entrance aesthetics, as per site measurements and the Owner's approved design. Final size, design, material and finish to be approved in writing by the Owner before fabrication. 12-month workmanship + 10 year wooden & hardware service included.", area: "LM", unit: "LM", amount: "" }, { id: 2, name: "Key Hanging Unit for Entry Area - Design, fabrication and installation of a customised key hanging unit at the entry area, including a decorative back panel, key hooks/holders, small storage compartment/shelf and required hardware. The unit shall be designed to provide convenient key storage while complementing the overall entrance décor, with material, finish, size and detailing as per the approved design and site measurements", area: "LM", unit: "LM", amount: "" }] },
          { id: 7, title: "ELECTRICAL", items: [{ id: 1, name: "Whole house electrical will be done, which include's wall and ceiling electrical wiring of all 3 bedrooms, 1 bathroom's, 3 balcony's, living room, kitchen and utility area & entry way area and wherever it is required.", area: "1500", unit: "Sft", amount: "" }, { id: 2, name: "Whole house switch boards will be done, which include's wall and ceiling electrical of all 3 bedrooms, 1 bathroom's, 3 balcony's, living room, kitchen and utility area & entry way area and wherever it is required.", area: "1500", unit: "Sft", amount: "" }, { id: 3, name: "Whole house lighting with will have ceiling lights, wall lights and pannel lights if needed will be done, which include's wall and ceiling electrical of all 3 bedroom's, 1 bathroom's, 3 balcony's, living room, kitchen and utility area & entry way area and wherever it is required. Excluding decorative lights and cendialiars", area: "1500", unit: "Sft", amount: "" }] },
          { id: 8, title: "PAINT AND WALLPAPER", items: [{ id: 1, name: "Royal paint's - Surface preparation and application of Asian Royale / Royale Luxury Emulsion or equivalent premium paint system on all internal walls and ceilings (house-wide), including primer coat (1 coat) and two top coats of Royal paint, with putty/filler application, sanding, surface smoothing, edge culling, masking, and complete labour. Scope includes all internal walls and ceiling areas as per site measurements (measured at actuals, capped at ±5% of BOQ quantity). Final shade selection to be approved in writing by the Owner before application, with sample patch approved on site. 12-month workmanship included.", area: "LM", unit: "LM", amount: "" }] },
          { id: 9, title: "DOOR'S", items: [{ id: 1, name: "Main S.S door - main stainless steel door with rust-proof for entrance made from premium SS steel finishes, with specified modern style, robust security with heavy-duty locks.", area: "LM", unit: "LM", amount: "" }] },
          { id: 10, title: "GYPROC FALSE CEILING", items: [{ id: 1, name: "GYPROC FALSE CEILING - Design, fabrication and installation of Cyproc false ceiling throughout the entire house, covering 3 bedrooms, 3 balconies, living room, dining area, kitchen and utility area. Scope includes Gypsum boards with side coves, recessed/profile light provisions, GI channel framework, edge detailing, and complete installation labour Final ceiling design, layout and lighting recess positions to be approved in writing by the Owner before execution. 12-month workmanship warranty included.", area: "LM", unit: "LM", amount: "" }] },
          { id: 11, title: "OTHER WORK", items: [{ id: 1, name: "All Door Laminate Change with Locks & Hardware - Replacement of laminate/finish on all existing doors, including necessary preparation, new laminate application, replacement/provision of required locks, handles and associated door hardware. 6 Nos. doors @ 12,500 per door", area: "6", unit: "Nos", amount: "" }, { id: 2, name: "Floor Tile Change - Living Room, Kitchen & Kitchen Balcony - Removal of existing flooring and supply & installation of new floor tiles in the living room, kitchen and kitchen balcony areas, including necessary laying labour and associated work", area: "600", unit: "Sft", amount: "" }, { id: 3, name: "AC Pipe Installation - Complete AC piping work including required refrigerant/copper piping, drainage arrangement, necessary material, accessories and labour for installation.", area: "52", unit: "Rmt", amount: "" }] }
        ]));
        setSections(freshSections);
        setEditLogs([]);
        const newNo = getEstimateNo();
        setEstimateNo(newNo);
        setIsEditing(false);
        message.success(`New blank estimate ready: ${newNo} - Now enter new client details`);
      }
    });
  };

  const loadEstimateFromStorage = (record) => {
    setClient(record.client);
    setSections(record.sections);
    if (record.specs) setSpecs(record.specs);
    if (record.terms) setTerms(record.terms);
    if (record.editLogs) setEditLogs(record.editLogs);
    else setEditLogs([]);
    setEstimateNo(record.originalEstimateNo || record.estimateNo);
    setIsEditing(false);
    setIsModalVisible(false);
    message.success(`Loaded: ${record.estimateNo} | Click Edit to modify`);
  };

  const deleteOriginal = async (record) => {
    try {
      await deleteDoc(doc(db, "ul_estimates_original", record.firestoreId));
      message.success("Deleted Original");
      fetchAllEstimates();
    } catch (e) { message.error(e.message); }
  };

  const deleteUpdated = async (record) => {
    try {
      await deleteDoc(doc(db, "ul_estimates_updated", record.firestoreId));
      message.success("Deleted Updated version");
      fetchAllEstimates();
    } catch (e) { message.error(e.message); }
  };

  const getSectionTotal = (items) => items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const grandTotal = sections.reduce((sum, section) => sum + getSectionTotal(section.items), 0);

  const filteredAll = savedEstimates.filter(e => (e.client?.name || "").toLowerCase().includes(searchClient.toLowerCase()));
  const filteredEditable = updatedEstimates.filter(e => (e.client?.name || "").toLowerCase().includes(searchEditable.toLowerCase()));

  if (authLoading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin size="large" /></div>;

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
        <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', width: 380 }}>
          <img src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1779706583/Urbane-Living-05-25-2026_04_25_PM_blepmc.png" style={{ height: 55, marginBottom: 15 }} alt="logo" />
          <h2 style={{ margin: '0 0 8px' }}>Urbane Living - Admin</h2>
          <p style={{ color: '#666', marginBottom: 25 }}>Only authorised emails can access</p>
          <Button type="primary" size="large" block onClick={doLogin}>Continue with Google</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, background: "#f0f2f5" }}>
      <style>{`.print-only { display: none; } .estimate-container { width: 100%; max-width: 850px; margin: auto; background: #fff; padding: 30px 35px; font-family: Arial, Helvetica, sans-serif; box-sizing: border-box; color: #000; } @media only screen and (max-width: 768px) { .estimate-container { padding: 12px 8px!important; max-width: 100%!important; } .mobile-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; } .mobile-scroll table { min-width: 650px; } }`}</style>

      <div style={{ maxWidth: 850, margin: "0 auto 15px auto", display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }} className="no-print">
        <Space wrap>
          {!isEditing ? (
            <Button type="primary" icon={<EditOutlined />} onClick={() => { setIsEditing(true); addLog("Started Editing"); message.info("Edit Mode ON"); }}>Edit Estimate</Button>
          ) : (
            <>
              <Button type="primary" icon={<SaveOutlined />} onClick={saveEditedEstimate} style={{ background: '#fa8c16', borderColor: '#fa8c16' }}>Update Estimate</Button>
              <Button onClick={() => setIsEditing(false)}>Cancel Edit</Button>
            </>
          )}
          <Button type="primary" icon={<SaveOutlined />} onClick={saveEstimateToStorage}>Save New Estimate</Button>
          <Button icon={<FileAddOutlined />} onClick={handleNewBlankEstimate}>New Blank Estimate</Button>
          <Button icon={<UnorderedListOutlined />} onClick={() => { fetchAllEstimates(); setIsModalVisible(true); }}>View Saved</Button>
        </Space>
        <Space wrap>
          <Tag color="blue">{user.email}</Tag>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handlePrint}>Download PDF</Button>
          <Button onClick={() => signOut(auth)}>Logout</Button>
        </Space>
      </div>

      {!isEditing && <div style={{ maxWidth: 850, margin: '0 auto 10px auto', background: '#fff3cd', border: '1px solid #ffe69c', padding: '8px 12px', borderRadius: 6, fontSize: 12 }} className="no-print">🔒 View Mode locked. Click <b>Edit</b> to edit. To create estimate for new client: Click <b>New Blank Estimate</b>. Original stays in All Saved, Updates go to Updated History.</div>}

      <div ref={componentRef} className="estimate-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div><img src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1779706583/Urbane-Living-05-25-2026_04_25_PM_blepmc.png" alt="Urbane Living" style={{ height: 65, maxWidth: 210, objectFit: "contain" }} /></div>
          <div style={{ textAlign: "right" }}>
            <h1 style={{ margin: 0, fontSize: 28, color: "#333", fontWeight: 700 }}>ESTIMATE</h1>
            <div style={{ marginTop: 5 }}>
              <div style={{ color: "#c00000", fontSize: 16, fontWeight: 600 }}>urbaneliving.in</div>
              <div style={{ fontSize: 15, marginTop: 3 }}>G-12, Express Green Plaza, Sector-1, Ghaziabad</div>
              <div style={{ fontSize: 15, marginTop: 2 }}><strong>Service Area:</strong> Gurugram, Noida, Delhi, Ghaziabad</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 0, fontSize: 14 }}><strong>GST No:</strong> 09AAJFU0647A1ZC</div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, gap: 20, marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>Bill To</p>
            {isEditing ? <Input placeholder="Client Name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} /> : <div style={{ fontWeight: 600 }}>{client.name || " "}</div>}
            {isEditing ? <Input placeholder="Address" value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} style={{ marginTop: 4 }} /> : <div>{client.address || " "}</div>}
          </div>
          <div style={{ textAlign: "right", fontSize: 14, minWidth: 230, lineHeight: 1.5 }}>
            <div><strong>Estimate No:</strong> {estimateNo}</div>
            <div><strong>Estimate Date:</strong> {estimateDate}<br /> <span style={{ fontSize: 10, color: "#c00000" }}>(Valid for 14 days)</span></div>
            <div style={{ fontWeight: 700, marginTop: 3 }}>Grand Total (INR):- {grandTotal > 0 ? `₹${grandTotal.toLocaleString("en-IN")}` : "As Actual"}</div>
          </div>
        </div>

        <div className="mobile-scroll">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginTop: 10 }}>
            <thead><tr style={{ background: "#f2f2f2" }}><th style={{ padding: "8px", border: "1px solid #000", width: 35 }}>Sn</th><th style={{ padding: "8px", border: "1px solid #000" }}>Product/Service</th><th style={{ padding: "8px", border: "1px solid #000", width: 85 }}>Area</th><th style={{ padding: "8px", border: "1px solid #000", width: 75 }}>Qnt/unit</th><th style={{ padding: "8px", border: "1px solid #000", width: 120 }}>Total</th></tr></thead>
            <tbody>
              {sections.map((section, sIdx) => {
                const sectionTotal = getSectionTotal(section.items);
                return (
                  <React.Fragment key={section.id}>
                    <tr style={{ background: "#e9e9e9", fontWeight: "bold" }}>
                      <td style={{ padding: "6px 8px", border: "1px solid #000", textAlign: "center" }}>{sIdx + 1}</td>
                      <td colSpan={4} style={{ padding: "6px 8px", border: "1px solid #000" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          {isEditing ? <Input value={section.title} onChange={(e) => updateSectionTitle(sIdx, e.target.value)} style={{ fontWeight: 'bold', width: '55%' }} /> : <span>{section.title}</span>}
                          {isEditing && <Space size={4}><Button size="small" icon={<ArrowUpOutlined />} disabled={sIdx === 0} onClick={() => moveSection(sIdx, -1)} /><Button size="small" icon={<ArrowDownOutlined />} disabled={sIdx === sections.length - 1} onClick={() => moveSection(sIdx, 1)} /><Button size="small" type="dashed" icon={<PlusOutlined />} onClick={() => addItemToSection(sIdx)}>Add Item</Button><Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeSection(sIdx)}>Del Sec</Button></Space>}
                        </div>
                      </td>
                    </tr>
                    {section.items.map((item, iIdx) => {
                      const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
                      return (
                        <tr key={item.id}>
                          <td style={{ padding: "6px 8px", border: "1px solid #000", textAlign: "right", fontStyle: "italic" }}>{roman[iIdx] || (iIdx + 1)}</td>
                          <td style={{ padding: "6px 8px", border: "1px solid #000" }}>{isEditing ? <Input.TextArea autoSize value={item.name} onChange={(e) => updateItemField(sIdx, iIdx, "name", e.target.value)} /> : <span style={{ whiteSpace: 'pre-wrap' }}>{item.name}</span>}</td>
                          <td style={{ padding: "6px 8px", border: "1px solid #000", textAlign: "center" }}>{isEditing ? <Input value={item.area} onChange={(e) => updateItemField(sIdx, iIdx, "area", e.target.value)} /> : item.area}</td>
                          <td style={{ padding: "6px 8px", border: "1px solid #000", textAlign: "center" }}>{isEditing ? <Input value={item.unit} onChange={(e) => updateItemField(sIdx, iIdx, "unit", e.target.value)} /> : item.unit}</td>
                          <td style={{ padding: "6px 8px", border: "1px solid #000", textAlign: "right" }}>
                            {isEditing ? (
                              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                <Input value={item.amount} onChange={(e) => updateItemField(sIdx, iIdx, "amount", e.target.value)} style={{ flex: 1 }} placeholder="Amt" />
                                <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeItemFromSection(sIdx, iIdx)} title="Remove this item" />
                              </div>
                            ) : (item.amount ? `₹${Number(item.amount).toLocaleString("en-IN")}` : "")}
                          </td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: "#f9f9f9", fontWeight: "bold" }}><td colSpan={4} style={{ padding: "6px 8px", border: "1px solid #000", textAlign: "right" }}>Total</td><td style={{ padding: "6px 8px", border: "1px solid #000", textAlign: "right" }}>{sectionTotal > 0 ? `₹${sectionTotal.toLocaleString("en-IN")}` : ""}</td></tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ===== SPECS TABLE - NOW FULLY EDITABLE LIKE OTHER SECTIONS ===== */}
        <div style={{ marginTop: 20 }}>
          <div style={{ background: "#e9e9e9", border: "1px solid #000", padding: "6px 8px", fontWeight: "bold", fontSize: 13, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Material Specifications / Makes</span>
            {isEditing && <Button size="small" icon={<PlusOutlined />} onClick={addSpecItem}>Add Spec</Button>}
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th style={{ padding: "6px 8px", border: "1px solid #000", width: 30 }}>#</th>
                <th style={{ padding: "6px 8px", border: "1px solid #000", width: 160 }}>Category</th>
                <th style={{ padding: "6px 8px", border: "1px solid #000" }}>Details / Brand</th>
                {isEditing && <th style={{ padding: "6px 8px", border: "1px solid #000", width: 60 }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {specs.map((s, sIdx) => (
                <tr key={s.id}>
                  <td style={{ padding: "5px 8px", border: "1px solid #000", textAlign: "center" }}>{sIdx + 1}</td>
                  <td style={{ padding: "5px 8px", border: "1px solid #000", fontWeight: 600 }}>
                    {isEditing ? <Input value={s.cat} onChange={(e) => updateSpecField(sIdx, "cat", e.target.value)} placeholder="Category" /> : s.cat}
                  </td>
                  <td style={{ padding: "5px 8px", border: "1px solid #000", whiteSpace: "pre-wrap" }}>
                    {isEditing ? <Input.TextArea autoSize value={s.detail} onChange={(e) => updateSpecField(sIdx, "detail", e.target.value)} placeholder="Brand / Details" /> : s.detail}
                  </td>
                  {isEditing && (
                    <td style={{ padding: "5px 8px", border: "1px solid #000", textAlign: "center" }}>
                      <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeSpecItem(sIdx)} title="Delete Spec" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== BASIC TERMS & CONDITIONS - EDITABLE SECTION ===== */}
        <div style={{ marginTop: 20 }}>
          <div style={{ background: "#e9e9e9", border: "1px solid #000", padding: "6px 8px", fontWeight: "bold", fontSize: 13, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Basic Terms & Conditions</span>
            {isEditing && <Button size="small" icon={<PlusOutlined />} onClick={addTermItem}>Add Term</Button>}
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <tbody>
              {terms.map((t, tIdx) => (
                <tr key={t.id}>
                  <td style={{ padding: "5px 8px", border: "1px solid #000", width: 30, textAlign: "center", fontWeight: 700 }}>{t.label}</td>
                  <td style={{ padding: "5px 8px", border: "1px solid #000" }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <Input.TextArea autoSize value={t.text} onChange={(e) => updateTermField(tIdx, e.target.value)} style={{ flex: 1 }} />
                        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeTermItem(tIdx)} />
                      </div>
                    ) : (
                      <span style={{ whiteSpace: "pre-wrap" }}>{t.text}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== BANK DETAILS - FIXED NON-EDITABLE ===== */}
        <div style={{ marginTop: 20 }}>
          <div style={{ background: "#f9c78c", border: "1px solid #000", padding: "6px 8px", fontWeight: "bold", fontSize: 13 }}>Bank Details:-</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <tbody>
              <tr><td style={{ padding: "5px 8px", border: "1px solid #000" }}>Name: <strong>Urbane Living</strong></td></tr>
              <tr><td style={{ padding: "5px 8px", border: "1px solid #000" }}>Account no.: <strong>21500200007494</strong></td></tr>
              <tr><td style={{ padding: "5px 8px", border: "1px solid #000" }}>IFSC Code: <strong>FDRL0002150</strong></td></tr>
              <tr><td style={{ padding: "5px 8px", border: "1px solid #000" }}>Bank Name: <strong>Federal Bank</strong></td></tr>
            </tbody>
          </table>
        </div>

      </div>

      <Modal title="Saved Estimates - Shared Firestore" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} width={850}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <Button type={activeTab === 'all' ? 'primary' : 'default'} onClick={() => setActiveTab('all')}>All Saved - Original ({savedEstimates.length})</Button>
          <Button type={activeTab === 'editable' ? 'primary' : 'default'} onClick={() => setActiveTab('editable')}>Updated History ({updatedEstimates.length})</Button>
          <Button onClick={fetchAllEstimates} loading={loadingData}>Refresh</Button>
          <Button icon={<FileAddOutlined />} onClick={() => { setIsModalVisible(false); handleNewBlankEstimate(); }}>New Blank for New Client</Button>
        </div>

        {loadingData ? <div style={{ textAlign: 'center', padding: 30 }}><Spin /> Loading from Firebase...</div> : (
          <>
            {activeTab === 'all' && (
              <>
                <Input prefix={<SearchOutlined />} placeholder="Search by Client Name" value={searchClient} onChange={e => setSearchClient(e.target.value)} style={{ marginBottom: 10 }} allowClear />
                <List dataSource={filteredAll} locale={{ emptyText: "No original estimates - Save one!" }} renderItem={(item) => (
                  <List.Item actions={[<Button type="primary" size="small" onClick={() => loadEstimateFromStorage(item)}>Open & Edit</Button>, <Button danger size="small" onClick={() => deleteOriginal(item)}>Delete</Button>]}>
                    <List.Item.Meta title={`${item.estimateNo} - ${item.client?.name || "Unnamed"} (${item.estimateDate})`} description={<><div>Client: {item.client?.name} | Total: {item.grandTotal} | By: {item.createdBy} | ORIGINAL</div><div style={{ fontSize: 11, color: '#888' }}>Firestore ID: {item.firestoreId?.slice(0,6)}...</div></>} />
                  </List.Item>
                )} />
              </>
            )}
            {activeTab === 'editable' && (
              <>
                <Input prefix={<SearchOutlined />} placeholder="Search Updated by Client Name" value={searchEditable} onChange={e => setSearchEditable(e.target.value)} style={{ marginBottom: 10 }} allowClear />
                <List dataSource={filteredEditable} locale={{ emptyText: "No updated estimates yet" }} renderItem={(item) => (
                  <List.Item actions={[<Button type="primary" size="small" onClick={() => loadEstimateFromStorage(item)}>Open</Button>, <Button danger size="small" onClick={() => deleteUpdated(item)}>Delete</Button>]}>
                    <List.Item.Meta title={`${item.originalEstimateNo} - V${item.version} - ${item.client?.name}`} description={<div><div>Updated: {item.updatedAt} by {item.updatedBy} | Total: {item.grandTotal}</div><div style={{ maxHeight: 60, overflowY: 'auto' }}>{item.editLogs?.slice(0,3).map((l, i) => <div key={i} style={{ fontSize: 10 }}>{l.time} - {l.user_id} - {l.action}</div>)} {item.editLogs?.length > 3 && <div style={{ fontSize: 10 }}>+ {item.editLogs.length - 3} more...</div>}</div></div>} />
                  </List.Item>
                )} />
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default EstimatePage;
