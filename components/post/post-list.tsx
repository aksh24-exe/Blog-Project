import { PostListProps } from "@/lib/types";
import PostCard from "./post-card";

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
