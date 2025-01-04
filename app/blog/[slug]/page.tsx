import { client, urlFor } from "@/app/lib/sanity";
import { fullBlog } from "@/lib/interface";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string): Promise<fullBlog | null> {
  const query = `*[_type == "blog" && slug.current == $slug] {
    "currentSlug": slug.current,
    title,
    content,
    titleImage
  }[0]`;

  const data = await client.fetch(query, { slug });
  return data || null; // Return null if no data is found
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);

  if (!data) {
    return (
      <div className="mt-8">
        <h1 className="text-center text-red-600">Blog post not found.</h1>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-blue-800 font-semibold tracking-wide uppercase">
          {"ASHHAD's - BLOG"}
        </span>
        <span className="mt-2 block text-3xl text-center leading-7 font-bold tracking-tight sm:text-6xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt={data.title || "Title Image"}
        priority
        className="rounded-lg mt-6 border"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-blue prose-headings:underline prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);

  return {
    title: data?.title || "Blog Post",
  };
}
