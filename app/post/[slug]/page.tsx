import notFound from "@/app/not-found";
import PostContent from "@/components/post/post-content";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/query";
import { headers } from "next/headers";

export default async function PostDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!post) {
    notFound();
  }

  // get authore info
  const isAuthor = session?.user?.id === post.authorId;

  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <PostContent post={post} isAuthor={isAuthor} />
      </div>
    </main>
  );
}
