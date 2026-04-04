"use client";

import { allBlogs, Blog } from "@/.contentlayer/generated";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

const BlogPage = () => {
  return (
    <div className="w-full flex flex-col items-center mt-10 mb-36">
      <div className="md:w-[80%] w-full flex flex-col">
        <Header
          badge="blogs"
          title="Knowledge bank to hire better"
          subtitle="Read from our endless resources on how to hire the perfect candidate for your ideal job."
          className="mt-3"
        />
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="md:p-4 p-0 rounded-xl">
      <Link href={`${blog.slug}`} className="flex flex-col items-center">
        <div className="w-full rounded-xl overflow-hidden hover:shadow-xl">
          <Image
            src={blog.banner}
            alt="logo"
            width={300}
            height={300}
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h2 className="text-2xl font-semibold mt-4">{blog.label}</h2>
          <p className="text-sm text-muted-foreground">{blog.description}</p>
          <Link href={`${blog.slug}`} className="text-sm font-semibold">
            Read More
          </Link>
        </div>
      </Link>
    </div>
  );
};
