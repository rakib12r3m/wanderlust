
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IDestination } from "@/lib/types/destination";
import { Pencil, Send, X } from "lucide-react";
import { useState } from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
] as const;

type FormState = IDestination;

const EditDestinationDialog = ({
  destination,
}: {
  destination: IDestination;
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(destination);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) {
      setForm(destination);
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const update = (
    field: keyof FormState,
    value: string | number,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();


    if (!destination._id) {
      setErrorMessage("Destination ID is missing.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");


    
    try {
      const token = await getTokenFromClient()
      const { _id, ...updatedData } = form;


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...updatedData,
            price: Number(updatedData.price),
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        throw new Error(
          errorData?.message || "Failed to update destination.",
        );
      }

      setSuccessMessage("Destination updated successfully!");

      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm(destination);
    setSuccessMessage("");
    setErrorMessage("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline">
            <Pencil />
            Edit Destination
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] min-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the details of your travel destination.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 px-6"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              placeholder="Bali Paradise"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Indonesia"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) => {
                  if (value) update("category", value);
                }}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step="1"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(e) =>
                  update("price", Number(e.target.value))
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="departure-date">Departure Date</Label>
            <Input
              id="departure-date"
              type="date"
              value={form.departureDate}
              onChange={(e) =>
                update("departureDate", e.target.value)
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the travel experience..."
              className="min-h-32"
              value={form.description}
              onChange={(e) =>
                update("description", e.target.value)
              }
            />
          </div>

          {successMessage && (
            <p role="status" className="text-sm text-green-600">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p role="alert" className="text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <X data-icon="inline-start" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-brand text-white hover:bg-brand-strong"
              disabled={isSubmitting}
            >
              <Send data-icon="inline-start" />
              {isSubmitting ? "Updating..." : "Update Destination"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;
