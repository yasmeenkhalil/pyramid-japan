"use client";

export default function DeleteCategoryButton({
  id,
}: {
  id: string;
}) {
  async function handleDelete() {
    const confirmDelete = confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-100 px-3 py-1 text-red-700"
    >
      Delete
    </button>
  );
}