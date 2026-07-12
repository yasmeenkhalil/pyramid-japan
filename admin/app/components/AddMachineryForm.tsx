"use client";

import { useState } from "react";

interface AddMachineryFormProps {
  onClose: () => void;
}

export default function AddMachineryForm({
  onClose,
}: AddMachineryFormProps) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/machinery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          year: Number(year),
          price: Number(price),
          featured,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create machinery");
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to save machinery");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* form fields */}
    </form>
  );
}