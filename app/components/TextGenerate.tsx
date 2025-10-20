"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `CVGenie lets you create professional resumes in Minutes. With a real-time preview, clean layout, and easy download options, building your perfect resume has never been easier.
`;

export default function TextGenerateEffectDemo() {
  return <TextGenerateEffect duration={2} filter={false} words={words} />;
}
