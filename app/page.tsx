
"use client"
import { simpleBlogCard } from "./lib/interface"; // Assuming the interface file is located in the same directory as the current file//+

import { client, urlFor,  } from "./lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


async function getData() {
const query =  `*[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
}`;  
  
  const data  = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data:simpleBlogCard[] = await getData();

 console.log( data);  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-7">
      {data.map((post, idx) =>(
    <Card key={idx}>    
     <Image src={urlFor(post.titleImage).url()} alt="Image" width={500}
      height={500}
      className="rounded-t-lg h-[200px] object-cover"
      />

      <CardContent className="mt-5">
         <h3 className="text-lg line-clamp-1 font-bold">{post.title}</h3>
         <p className="line-clamp-4 text-sm mt-2 text-green-900 dark:text-green-400">{post.smallDescription}
          </p> 
         <Button asChild className="w-full mt-7">
          <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
          </Button>      
 
      </CardContent>
    </Card>
      ))}
    </div>
  )
};
