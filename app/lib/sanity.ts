import { createClient } from "next-sanity";
import  ImageUrlBuilder  from '@sanity/image-url';


export const  client = createClient({
    apiVersion: '2022-03-07',
    dataset: 'blog',
    projectId: 'qp2r5s9x',
    useCdn: false,
});

const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source);
}