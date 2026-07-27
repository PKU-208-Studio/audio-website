import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryDetail } from "@/components/story-detail";
import { stories, storyBySlug } from "@/lib/data";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) return {};
  return {
    title: story.title.en,
    description: story.logline.en,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) notFound();
  return <StoryDetail story={story} />;
}
