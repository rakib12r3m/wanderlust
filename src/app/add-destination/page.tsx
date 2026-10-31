"use client";

import { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural"] as const;

const INITIAL_FORM = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type FormState = typeof INITIAL_FORM;

const AddDestinationPage = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
 

  

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  };

  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  const token = await getTokenFromClient()
     

    setSubmitted(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const result = await res.json();
    console.log(result);
        
  };

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
  };




  return (
    <main className="flex-1 w-full">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
          Add New Travel Package
        </h1>

        <Card className="mt-10 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6">
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
                  onChange={(e) => update("price", e.target.value)}
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
                onChange={(e) => update("departureDate", e.target.value)}
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
                onChange={(e) => update("description", e.target.value)}
              />
            </div>

            <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:items-center sm:justify-end">
              {submitted ? (
                <p className="text-sm text-brand-strong sm:mr-auto">
                  Travel package added successfully!
                </p>
              ) : null}
              <Button
                type="button"
                variant="outline"
                className="border-destructive/40 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
                onClick={handleCancel}
              >
                <Trash2 data-icon="inline-start" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand text-white hover:bg-brand-strong"
              >
                <Send data-icon="inline-start" />
                Add Travel Package
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default AddDestinationPage;
