import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Select, InputNumber, Divider, Checkbox } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

const { Option } = Select;

const EstimatePage = () => {
  // === SIMPLE PIN - START ===
  const [user, setUser] = useState(null);
  const [pin, setPin] = useState("");
  const PIN = "ul2026";

  useEffect(() => {
    if (localStorage.getItem('ul_auth') === PIN) {
      setUser({ name: 'Employee' });
    }
  }, []);

  const doLogin = () => {
    if (pin === PIN) {
      localStorage.setItem('ul_auth', PIN);
      setUser({ name: 'Employee' });
    } else {
      alert('Galat PIN!');
    }
  };
  // === PIN END ===

  const componentRef = useRef();
  const FIXED_RATE = 120;
  const CARTAGE = 2500;
  const CLEANING = 1500;

  const DESCRIPTION_TEXT = `M/F Suspended ceiling, which includes Saint Gobain Gyproc, manufactured GYPSTEEL channels, with all Gyproc accessories and Single layer of 12.5mm tapered edge saint Gobain GYPROC Gypboard®.`;

  const getNextEstimateNo = () => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    const key = "estimateCounter";
    let counter = parseInt(localStorage.getItem(key) || "100");
    counter += 1;
    localStorage.setItem(key, counter);
    return `ULF${mm}${dd}${yy}${counter}`;
  };
  const formatDesc = (text) => {
  const w = text.split(' ');
  return w.length <= 8 ? text : <>{w.slice(0,8).join(' ')}<br/>{w.slice(8).join(' ')}</>;
};

  const [client, setClient] = useState({ name: "", address: "" });
  const [estimateNo, setEstimateNo] = useState(getNextEstimateNo());
  const [estimateDate] = useState(
    new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
  );
  const [items, setItems] = useState([
    { key: 1, product: "PVC Ceiling", area: 0, selectedDesc: [] },
  ]);

  const formatAddress = (addr) => {
    const words = addr.split(" ");
    if (words.length <= 8) return addr;
    return (
      <>
        {words.slice(0, 8).join(" ")}
        <br />
        {words.slice(8).join(" ")}
      </>
    );
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Urbane_Living_Estimate",
    onBeforeGetContent: async () => {
      setEstimateNo(getNextEstimateNo());
      await new Promise((r) => setTimeout(r, 80));
    },
    pageStyle: `
  @page { size: A4; margin: 10mm; }
  body { -webkit-print-color-adjust: exact; }
.no-print,.ant-input,.ant-select,.ant-checkbox-wrapper,.ant-select-selector { display: none!important; }
.ant-input-number { border: none!important; background: transparent!important; box-shadow: none!important; }
.ant-input-number input { border: none!important; text-align: center!important; background: transparent!important; font-size: 13px!important; }
.print-only { display: block!important; border: none!important; font-size: 12.5px!important; line-height: 1.35!important; }
.header-flex,.billto-flex { display: table!important; width: 100%!important; }
.header-flex > div,.billto-flex > div { display: table-cell!important; vertical-align: top!important; }
.header-flex > div:last-child,.billto-flex > div:last-child { text-align: right!important; width: 240px!important; }
.mobile-only { display: none!important; }
  tr.desktop-only { display: table-row!important; }
  table { width: 100%!important; table-layout: auto!important; border-collapse: collapse!important; }
  html body div table thead { display: table-header-group!important; }
  html body div table thead tr { display: table-row!important; background: #f5f5!important; }
  html body div table thead tr th:nth-child(1) { display: table-cell!important; width: 28px!important; text-align: left!important; font-size: 11px!important; padding: 6px 8px!important; border-bottom: 1.5px solid #000!important; font-weight: 700!important; }
  html body div table thead tr th:nth-child(2) { display: table-cell!important; text-align: left!important; font-size: 11px!important; padding: 6px 8px!important; border-bottom: 1.5px solid #000!important; font-weight: 700!important; }
  html body div table thead tr th:nth-child(3) { display: table-cell!important; width: 75px!important; text-align: center!important; font-size: 11px!important; padding: 6px 8px!important; border-bottom: 1.5px solid #000!important; font-weight: 700!important; }
  html body div table thead tr th:nth-child(4) { display: table-cell!important; width: 60px!important; text-align: center!important; font-size: 11px!important; padding: 6px 8px!important; border-bottom: 1.5px solid #000!important; font-weight: 700!important; }
  html body div table thead tr th:nth-child(5) { display: table-cell!important; width: 90px!important; text-align: right!important; font-size: 11px!important; padding: 6px 8px!important; border-bottom: 1.5px solid #000!important; font-weight: 700!important; }
  td:nth-child(1) { width: 28px!important; }
  td:nth-child(2) { width: 60%!important; }
  td:nth-child(3) { width: 75px!important; text-align: center!important; }
  td:nth-child(4) { width: 60px!important; text-align: center!important; }
  td:nth-child(5) { width: 90px!important; text-align: right!important; }
  h1 { font-size: 28px!important; }
`,
  });

  const updateItem = (idx, field, val) => {
    const newItems = [...items];
    newItems[idx][field] = val;
    setItems(newItems);
  };

  const toggleDesc = (idx, opt) => {
    const newItems = [...items];
    const arr = newItems[idx].selectedDesc;
    newItems[idx].selectedDesc = arr.includes(opt)
    ? arr.filter((x) => x!== opt)
      : [...arr, opt];
    setItems(newItems);
  };

  const totalA = items.reduce((s, it) => s + it.area * FIXED_RATE, 0);
  const gst = Math.round(totalA * 0.6 * 0.18);
  const totalB = gst + CARTAGE + CLEANING;
  const grandTotal = totalA + totalB;

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
        <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', width: 360 }}>
          <img src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1779706583/Urbane-Living-05-25-2026_04_25_PM_blepmc.png" style={{ height: 55, marginBottom: 15 }} alt="logo" />
          <h2 style={{ margin: '0 0 8px' }}>Urbane Living</h2>
          <p style={{ color: '#666', marginBottom: 25 }}>Employee Access Only</p>
          <Input.Password placeholder="Enter PIN" value={pin} onChange={e => setPin(e.target.value)} onPressEnter={doLogin} size="large" style={{ marginBottom: 15 }} />
          <Button type="primary" size="large" block onClick={doLogin}>Login</Button>
          <p style={{ fontSize: 11, color: '#999', marginTop: 20 }}>PIN: ul2026 | 1 baar login → hamesha yaad</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, background: "#f0f2f5" }}>
    <style>{`
.print-only { display: none; }
.editable-input { border: none!important; background: transparent!important; border-radius: 0; padding: 2px 0; font-size: 14px!important; }
.estimate-container { width: 100%; max-width: 800px; }
.mobile-only { display: none; }
.ant-select-selector,.ant-input-number,.ant-input { border: none!important; box-shadow: none!important; background: transparent!important; font-size: 14px!important; }
.ant-select-arrow { display: none!important; }
 @media (max-width: 768px) {
 .estimate-container { padding: 15px 10px!important; }
 .header-flex,.billto-flex { flex-direction: column!important; align-items: flex-start!important; gap: 12px; }
 .header-right { text-align: left!important; width: 100%!important; margin-top: 8px; }
 .billto-right { width: 100%!important; min-width: 100%!important; text-align: left!important; }
 .desktop-only { display: table-row!important; }
 .mobile-only { display: none!important; }
   table thead { display: table-header-group!important; }
   table { display: block!important; overflow-x: auto!important; -webkit-overflow-scrolling: touch!important; }
   th, td { font-size: 12px!important; padding: 6px 4px!important; white-space: nowrap!important; }
 .estimate-container { max-width: 100%!important; }
 }
`}</style>

      <div ref={componentRef} className="estimate-container" style={{ margin: "auto", background: "#fff", padding: "30px 35px", fontFamily: "Arial, Helvetica, sans-serif", boxSizing: "border-box", color: "#000" }}>
        <div className="header-flex avoid-break" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div><img src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1779706583/Urbane-Living-05-25-2026_04_25_PM_blepmc.png" alt="Urbane Living" style={{ height: 65, maxWidth: 210, objectFit: "contain" }} /></div>
          <div className="header-right" style={{ textAlign: "right" }}>
            <h1 style={{ margin: 0, fontSize: 28, color: "#333", fontWeight: 700, letterSpacing: 0.5 }}>ESTIMATE</h1>
            <div style={{ marginTop: 5 }}>
              <div style={{ color: "#c00000", fontSize: 16, fontWeight: 600 }}>urbaneliving.in</div>
              <div style={{ fontSize: 15, marginTop: 3, lineHeight: 1.3 }}>G-12, Express Green Plaza, Sector-1, Ghaziabad</div>
              <div style={{ fontSize: 15, marginTop: 2, color: "#000" }}><strong>Service Area:</strong> Gurugram, Noida, Delhi, Ghaziabad</div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 0, letterSpacing: 0.5, fontSize: 14, color: "#000000" }}><strong>GST No:</strong> 09AAJFU0647A1ZC</div>
        <div className="billto-flex avoid-break" style={{ display: "flex", justifyContent: "space-between", marginBottom: 18, gap: 20 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>Bill To</p>
            <Input className="no-print editable-input" placeholder="Client Name" value={client.name} onChange={(e) => setClient({...client, name: e.target.value })} />
            <div className="print-only" style={{ minHeight: 20, fontSize: 14 }}>{client.name || " "}</div>
            <Input className="no-print editable-input" placeholder="Address" value={client.address} onChange={(e) => setClient({...client, address: e.target.value })} style={{ marginTop: 4 }} />
            <div className="print-only" style={{ minHeight: 20, fontSize: 14 }}>{formatAddress(client.address) || " "}</div>
          </div>
          <div className="billto-right" style={{ textAlign: "right", fontSize: 14, minWidth: 230, lineHeight: 1.5 }}>
            <div><strong>Estimate No:</strong> {estimateNo}</div>
            <div><strong>Estimate Date:</strong> {estimateDate}<br /> <span style={{ fontSize: 10, color: "#c00000" }}>(Valid 14 days)</span></div>
            <div style={{ fontWeight: 700, marginTop: 3, fontSize: 14 }}>Grand Total: ₹{grandTotal.toLocaleString("en-IN")}</div>
          </div>
        </div>

        <table className="avoid-break" style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, tableLayout: "fixed" }}>
          <thead><tr style={{ background: "#f7f7" }}>
            <th style={{ padding: "8px", textAlign: "left", borderBottom: "1.5px solid #000", width: 28 }}>#</th>
            <th style={{ padding: "8px", textAlign: "left", borderBottom: "1.5px solid #000" }}>Product/Service</th>
            <th style={{ padding: "8px", textAlign: "center", borderBottom: "1.5px solid #000", width: 85 }}>Area (Sft)</th>
            <th style={{ padding: "8px", textAlign: "center", borderBottom: "1.5px solid #000", width: 65 }}>Rate</th>
            <th style={{ padding: "8px", textAlign: "right", borderBottom: "1.5px solid #000", width: 95 }}>Amount</th>
          </tr></thead>
          <tbody>
            {items.map((item, idx) => (
              <React.Fragment key={item.key}>
                <tr className="desktop-only">
                  <td style={{ padding: "6px 8px", verticalAlign: "top", fontWeight: 600 }}>1</td>
                  <td style={{ padding: "6px 8px", fontWeight: 600 }}>
                    <Select className="no-print" value={item.product} onChange={(v) => updateItem(idx, "product", v)} style={{ width: "100%" }} size="small">
                      <Option value="Gypsum False Ceiling (Gyproc Plain Board)">Gypsum False Ceiling (Gyproc Plain Board)</Option>
                      <Option value="PVC Ceiling">PVC Ceiling</Option>
                      <Option value="POP Punning">POP Punning</Option>
                    </Select>
                    <div className="print-only" style={{ fontWeight: 700 }}>{item.product}</div>
                  </td>
                  <td colSpan={3}></td>
                </tr>
                <tr className="desktop-only">
                  <td style={{ textAlign: "right", paddingRight: 8, fontStyle: "italic", fontSize: 12, verticalAlign: "top" }}>i</td>
                  <td style={{ padding: "4px 8px 8px 8px" }}>
                    <div className="no-print">
                      <Checkbox checked={item.selectedDesc.includes("opt1")} onChange={() => toggleDesc(idx, "opt1")} style={{ fontSize: 13 }}>{DESCRIPTION_TEXT}</Checkbox>
                      <div style={{ height: 4 }} />
                      <Checkbox checked={item.selectedDesc.includes("opt2")} onChange={() => toggleDesc(idx, "opt2")} style={{ fontSize: 13 }}>{DESCRIPTION_TEXT}</Checkbox>
                    </div>
                    <div className="print-only" style={{ fontSize: 11.5, lineHeight: 1.4, color: "#000", wordBreak: 'break-word' }}>
  {item.selectedDesc.map((opt, i) => {
    const w = DESCRIPTION_TEXT.split(' ');
    const line1 = w.slice(0,8).join(' ');
    const line2 = w.slice(8,16).join(' ');
    const line3 = w.slice(16).join(' ');
    return <div key={i} style={{ marginBottom: 3 }}>{line1}<br/>{line2}<br/>{line3}</div>;
  })}
  {item.selectedDesc.length === 0 && (<div style={{ color: "#888" }}>—</div>)}
</div>
                  </td>
                  <td style={{ textAlign: "center", padding: "4px 8px", verticalAlign: "top" }}>
                    <InputNumber className="no-print" min={0} value={item.area} onChange={(v) => updateItem(idx, "area", v)} style={{ width: 70 }} size="small" />
                    <div className="print-only" style={{ fontWeight: 600 }}>{item.area}</div>
                  </td>
                  <td style={{ textAlign: "center", padding: "4px 8px", verticalAlign: "top" }}>{FIXED_RATE}</td>
                  <td style={{ textAlign: "right", padding: "4px 8px", fontWeight: 500, verticalAlign: "top" }}>₹{(item.area * FIXED_RATE).toLocaleString("en-IN")}</td>
                </tr>
              </React.Fragment>
            ))}
            <tr style={{ background: "#f5f5f5", fontWeight: 600 }}><td colSpan={3}></td><td style={{ padding: "6px 8px", textAlign: "right", fontSize: 13 }}>Total (A)</td><td style={{ padding: "6px 8px", textAlign: "right", fontSize: 13 }}>₹{totalA.toLocaleString("en-IN")}</td></tr>
          </tbody>
        </table>

        <div className="avoid-break" style={{ marginTop: 12, fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, borderBottom: "1px solid #ddd", paddingBottom: 3 }}><span>2. Other Charges</span><span>As Actual</span></div>
          <div style={{ marginTop: 4, lineHeight: 1.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>i. GST @18% (on 60% of A)</span><span>₹{gst.toLocaleString("en-IN")}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>ii. Cartage and material lifting</span><span>₹{CARTAGE.toLocaleString("en-IN")}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>iii. Cleaning and Malwa disposal</span><span>₹{CLEANING.toLocaleString("en-IN")}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", background: "#f5f5f5", padding: "5px 6px", marginTop: 4, fontWeight: 600 }}><span style={{ marginLeft: "auto", marginRight: 15 }}>Total (B)</span><span>₹{totalB.toLocaleString("en-IN")}</span></div>
          </div>
        </div>

        <div className="avoid-break" style={{ textAlign: "right", marginTop: 10, borderTop: "2px solid #000", paddingTop: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Grand Total: ₹{grandTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }} className="no-print">
        <Button type="primary" icon={<DownloadOutlined />} size="large" onClick={handlePrint}>DOWNLOAD PDF</Button>
        <div style={{ marginTop: 8 }}>
          <Button size="small" onClick={() => { localStorage.removeItem('ul_auth'); window.location.reload(); }}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default EstimatePage;