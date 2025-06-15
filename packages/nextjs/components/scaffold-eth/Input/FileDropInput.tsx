import React, { useRef, useState } from "react";
import { UltraHonkBackend } from "@aztec/bb.js";
import { Noir } from "@noir-lang/noir_js";
import { parseGeneticData } from "~~/utils/file-process";
import { notification } from "~~/utils/scaffold-eth/notification";
import zkjson from "~~/zk/zk.json";

interface FileDropInputProps {
  onProcess?: (file: File) => Promise<void>;
}

export const FileDropInput: React.FC<FileDropInputProps> = ({ onProcess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleButtonClick = async () => {
    if (file) {
      setIsProcessing(true);
      const toastId = notification.loading("Generating verifiable proof...");

      try {
        const noir = new Noir(zkjson as any);
        const backend = new UltraHonkBackend(zkjson.bytecode);
        const fileContent = await file.text();
        const markers = await parseGeneticData(fileContent);
        const { witness } = await noir.execute(markers);
        const proof = await backend.generateProof(witness);
        console.log(proof);
        // Mock processing function
        // await new Promise(res => setTimeout(res, 1000));
        if (onProcess) await onProcess(file);
        notification.remove(toastId);
        notification.success("Data encrypted successfully!");
        setFile(null);
      } catch (error) {
        console.error(error);
        notification.remove(toastId);
        notification.error("Failed to encrypt data.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <div
        className={`w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            dragActive
              ? "border-accent bg-base-300 shadow-[0_0_16px_2px_var(--color-accent)]"
              : "border-base-300 bg-base-200"
          }
        `}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input type="file" ref={inputRef} className="hidden" onChange={handleChange} />
        {file ? (
          <span className="text-accent font-bold">{file.name}</span>
        ) : (
          <span className="text-base-content/80">Drag & drop a file here, or click to select</span>
        )}
      </div>
      <button
        className="btn btn-primary w-full flex items-center justify-center"
        disabled={!file || isProcessing}
        onClick={handleButtonClick}
      >
        {isProcessing && <span className="loading loading-spinner loading-xs mr-2"></span>}
        {isProcessing ? "Processing..." : "Process File"}
      </button>
    </div>
  );
};

export default FileDropInput;
