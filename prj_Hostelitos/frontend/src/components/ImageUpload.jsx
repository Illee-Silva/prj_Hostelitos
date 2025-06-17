import { useRef, useState } from "react";

export default function ImageUpload({ onChange, preview, label = "Escolha uma imagem", required = false }) {
  const fileInput = useRef();
  const [imgPreview, setImgPreview] = useState(preview || "");
  const [fileName, setFileName] = useState("");

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImgPreview(ev.target.result);
        if (onChange) onChange(file);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleButtonClick() {
    fileInput.current.click();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start', width: '100%' }}>
      <label style={{ color: '#DF5323', fontWeight: 600, marginBottom: 4 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
        <button
          type="button"
          onClick={handleButtonClick}
          style={{
            background: '#DF5323', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', fontSize: 16
          }}
        >
          Selecionar Imagem
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleFile}
          style={{ display: 'none' }}
          required={required}
        />
        <span style={{ color: '#aaa', fontSize: 14 }}>{fileName}</span>
      </div>
      {imgPreview && (
        <img src={imgPreview} alt="Pré-visualização" style={{ marginTop: 8, maxWidth: 220, maxHeight: 120, borderRadius: 8, border: '1px solid #ccc', background: '#222' }} />
      )}
    </div>
  );
}
