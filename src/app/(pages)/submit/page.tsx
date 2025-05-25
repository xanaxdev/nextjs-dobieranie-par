"use client";

import SubmitFormView from "@/components/forms/SubmitFormView";
import { useSubmitForm } from "@/view/SubmitFormModel";

export default function SubmitPage() {
  const form = useSubmitForm();
  return <SubmitFormView {...form} />;
}
