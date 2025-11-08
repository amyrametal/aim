import { useState } from 'react';
import { readAndCompressImage } from 'browser-image-resizer';

type Props = { onCapture: (file: File) => void };

const config = { quality: 0.8, maxWidth: 1024, maxHeight: 1024 };

export default function CameraCapture({ onCapture }: Props) {
  const [preview, setPreview] = useState<string>();

  const openCamera = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const compressed = await readAndCompressImage(file, config);
      setPreview(URL.createObjectURL(compressed));
      onCapture(compressed);
    };
    input.click();
  };

  return (
    <div>
      <button type="button" onClick={openCamera}>
        📷 Take photo
      </button>
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
}
